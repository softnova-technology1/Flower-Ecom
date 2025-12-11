import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/adminAuth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

// PUT /api/admin/orders/[id] - Update order status
export async function PUT(request, { params }) {
    try {
        const authCheck = await checkAdminAuth();
        if (!authCheck.authorized) {
            return NextResponse.json(
                { success: false, error: authCheck.error },
                { status: 401 }
            );
        }

        await connectDB();
        const { id } = await params;
        const { status } = await request.json();

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
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
            { success: false, error: 'Failed to update order' },
            { status: 500 }
        );
    }
}
