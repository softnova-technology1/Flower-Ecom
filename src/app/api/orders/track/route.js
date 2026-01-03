import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

// GET /api/orders/track?trackingNumber=TRK123456
export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const trackingNumber = searchParams.get('trackingNumber');

        if (!trackingNumber) {
            return NextResponse.json(
                { success: false, error: 'Tracking number is required' },
                { status: 400 }
            );
        }

        const order = await Order.findOne({ trackingNumber })
            .populate('items.product', 'name image')
            .populate('user', 'name email')
            .lean();

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found with this tracking number' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error('Error tracking order:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to track order' },
            { status: 500 }
        );
    }
}

