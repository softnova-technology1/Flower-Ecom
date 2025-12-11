import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import Product from '@/models/Product';

// POST /api/reviews - Create product review (requires authentication)
export async function POST(request) {
    try {
        const { auth } = await import('@/lib/auth');
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        await connectDB();

        const body = await request.json();
        const { productId, rating, title, comment } = body;

        if (!productId || !rating || !title || !comment) {
            return NextResponse.json(
                { success: false, error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }

        // Create review
        const review = await Review.create({
            product: productId,
            user: session.user.id,
            name: session.user.name,
            rating,
            title,
            comment,
        });

        // Update product rating
        const reviews = await Review.find({ product: productId, approved: true });
        const avgRating =
            reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        product.rating = avgRating;
        product.numReviews = reviews.length;
        await product.save();

        return NextResponse.json(
            { success: true, review, message: 'Review added successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating review:', error);

        // Handle duplicate review error
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, error: 'You have already reviewed this product' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create review' },
            { status: 400 }
        );
    }
}
