import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/adminAuth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

// GET /api/admin/orders - Get all orders (admin only)
export async function GET(request) {
    try {
        const authCheck = await checkAdminAuth();
        if (!authCheck.authorized) {
            return NextResponse.json(
                { success: false, error: authCheck.error },
                { status: 401 }
            );
        }

        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const search = searchParams.get('search');

        let query = {};

        if (status && status !== 'all') {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { guestEmail: { $regex: search, $options: 'i' } },
                { _id: search }
            ];
        }

        const orders = await Order.find(query)
            .populate('user', 'name email')
            .sort('-createdAt')
            .lean();

        return NextResponse.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching admin orders:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
