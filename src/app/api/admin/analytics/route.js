import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/adminAuth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';

export async function GET() {
    try {
        const authCheck = await checkAdminAuth();
        if (!authCheck.authorized) {
            return NextResponse.json(
                { success: false, error: authCheck.error },
                { status: 401 }
            );
        }

        await connectDB();

        // Get total counts
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();

        // Calculate total revenue
        const revenueData = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);
        const totalRevenue = revenueData[0]?.total || 0;

        // Get recent orders
        const recentOrders = await Order.find()
            .sort('-createdAt')
            .limit(5)
            .populate('user', 'name email')
            .lean();

        // Get revenue by day (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const revenueByDay = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    revenue: { $sum: "$totalPrice" },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        return NextResponse.json({
            success: true,
            analytics: {
                totalOrders,
                totalRevenue,
                totalProducts,
                totalUsers,
                recentOrders,
                revenueByDay,
            }
        });
    } catch (error) {
        console.error('Analytics error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
