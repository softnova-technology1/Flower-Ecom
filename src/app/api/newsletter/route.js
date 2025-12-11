import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request) {
    try {
        await connectDB();

        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            );
        }

        // Check if already subscribed
        const existing = await Newsletter.findOne({ email });

        if (existing) {
            if (existing.isActive) {
                return NextResponse.json(
                    { success: false, error: 'Email already subscribed' },
                    { status: 400 }
                );
            } else {
                // Reactivate subscription
                existing.isActive = true;
                await existing.save();
                return NextResponse.json({
                    success: true,
                    message: 'Subscription reactivated successfully',
                });
            }
        }

        // Create new subscription
        await Newsletter.create({ email });

        return NextResponse.json(
            {
                success: true,
                message: 'Successfully subscribed to newsletter',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to subscribe' },
            { status: 400 }
        );
    }
}
