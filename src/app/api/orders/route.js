import { NextResponse } from 'next/server';
import { auth } from '@/lib/authHelper';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

// GET /api/orders - Get user's orders (requires authentication)
export async function GET(request) {
    try {
        await connectDB();

        const session = await auth();

        // If user is authenticated, return only their orders
        if (session?.user?.id) {
            const orders = await Order.find({ user: session.user.id })
                .populate('items.product', 'name image')
                .sort('-createdAt')
                .lean();

            return NextResponse.json({ success: true, orders });
        }

        // If not authenticated, return empty array
        return NextResponse.json({ success: true, orders: [] });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}

// POST /api/orders - Create new order
export async function POST(request) {
    try {
        await connectDB();

        const session = await auth();
        const body = await request.json();

        // Calculate prices
        const itemsPrice = body.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        const taxPrice = itemsPrice * 0.1; // 10% tax
        const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
        const totalPrice = itemsPrice + taxPrice + shippingPrice;

        // Create order data
        const orderData = {
            ...body,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        };

        // Add user ID if logged in (supports ghost checkout)
        if (session?.user?.id) {
            orderData.user = session.user.id;
        }

        const order = await Order.create(orderData);

        // Reduce stock for ordered items
        try {
            const Product = (await import('@/models/Product')).default;
            for (const item of body.items) {
                if (item.product) {
                    await Product.findByIdAndUpdate(
                        item.product,
                        { $inc: { stock: -item.quantity } },
                        { runValidators: false }
                    );
                }
            }
        } catch (stockError) {
            console.error('Error updating stock:', stockError);
            // Don't fail the order if stock update fails
        }

        // Send notifications (don't wait for them - fire and forget)
        try {
            // Notify owner about new order
            const { notifyOwnerNewOrder } = await import('@/lib/notifications');
            notifyOwnerNewOrder(order).catch(err => console.error('Notification error:', err));

            // Send order confirmation email to customer
            const { sendEmail } = await import('@/lib/email');
            const { orderConfirmationTemplate } = await import('@/lib/emailTemplates');

            const customerEmail = order.guestEmail || order.user?.email;
            if (customerEmail) {
                sendEmail({
                    to: customerEmail,
                    subject: `Order Received #${order._id.toString().slice(-8).toUpperCase()}`,
                    html: orderConfirmationTemplate(order),
                }).catch(err => console.error('Email error:', err));
            }
        } catch (error) {
            console.error('Error sending notifications:', error);
            // Don't fail the order if notifications fail
        }

        return NextResponse.json(
            { success: true, order, orderId: order._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create order' },
            { status: 400 }
        );
    }
}
