import { NextResponse } from 'next/server';
import { auth } from '@/lib/authHelper';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// GET /api/users/profile - Get user profile
export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const user = await User.findById(session.user.id).select('-password').lean();

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error('Get profile error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to get profile' },
            { status: 500 }
        );
    }
}

// PUT /api/users/profile - Update user profile
export async function PUT(request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { name } = await request.json();

        if (!name) {
            return NextResponse.json(
                { success: false, error: 'Name is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.findByIdAndUpdate(
            session.user.id,
            { name },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}
