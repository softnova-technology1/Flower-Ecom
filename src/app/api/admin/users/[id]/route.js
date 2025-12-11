import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/adminAuth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// PUT /api/admin/users/[id] - Update user role
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
        const { role } = await request.json();

        if (!['user', 'admin'].includes(role)) {
            return NextResponse.json(
                { success: false, error: 'Invalid role' },
                { status: 400 }
            );
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update user' },
            { status: 500 }
        );
    }
}
