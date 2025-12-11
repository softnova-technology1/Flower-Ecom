import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/adminAuth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// GET /api/admin/users - Get all users
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

        const users = await User.find()
            .select('-password')
            .sort('-createdAt')
            .lean();

        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}
