import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

// GET /api/orders/[id] - Get single order
export async function GET(request, { params }) {
    try {
        await connectDB();

        const order = await Order.findById(params.id)
            .populate('items.product', 'name image')
            .populate('user', 'name email')
            .lean();

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch order' },
            { status: 500 }
        );
    }
}

// PATCH /api/orders/[id] - Update order (admin only)
export async function PATCH(request, { params }) {
    try {
        const { checkAdminAuth } = await import('@/lib/adminAuth');
        const authCheck = await checkAdminAuth();

        if (!authCheck.authorized) {
            return NextResponse.json(
                { success: false, error: authCheck.error },
                { status: 401 }
            );
        }

        await connectDB();

        const body = await request.json();
        
        const order = await Order.findByIdAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        );

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update order' },
            { status: 400 }
        );
    }
}

