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

        // Send order confirmation email (don't wait for it)
        try {
            const { sendEmail } = await import('@/lib/email');
            const { orderConfirmationTemplate } = await import('@/lib/emailTemplates');

            const customerEmail = order.user?.email || order.guestEmail;
            if (customerEmail) {
                await sendEmail({
                    to: customerEmail,
                    subject: `Order Confirmation #${order._id.toString().slice(-8).toUpperCase()}`,
                    html: orderConfirmationTemplate(order),
                });
            }
        } catch (emailError) {
            console.error('Error sending order confirmation email:', emailError);
            // Don't fail the order if email fails
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
