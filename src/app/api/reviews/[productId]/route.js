import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';

// GET /api/reviews/[productId] - Get reviews for a product
export async function GET(request, { params }) {
    try {
        await connectDB();

        const reviews = await Review.find({ product: params.productId })
            .populate('user', 'name avatar')
            .sort('-createdAt')
            .lean();

        return NextResponse.json({ success: true, reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}
