import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// GET /api/products - Get all products with pagination and filtering
export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 12;
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const sort = searchParams.get('sort') || '-createdAt';
        const featured = searchParams.get('featured');
        const bestSelling = searchParams.get('bestSelling');

        const skip = (page - 1) * limit;

        // Build query
        let query = {};

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        if (featured === 'true') {
            query.featured = true;
        }

        if (bestSelling === 'true') {
            query.bestSelling = true;
        }

        // Get total count for pagination
        const total = await Product.countDocuments(query);

        // Get products
        const products = await Product.find(query)
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .lean();

        return NextResponse.json({
            success: true,
            products,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST /api/products - Create new product (Admin only)
export async function POST(request) {
    try {
        const { checkAdminAuth } = await import('@/lib/adminAuth');
        const authCheck = await checkAdminAuth();

        if (!authCheck.authorized) {
            return NextResponse.json(
                { success: false, error: authCheck.error },
                { status: 401 }
            );
        }

        await connectDB();

        const body = await request.json();

        const product = await Product.create(body);

        return NextResponse.json(
            { success: true, product },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create product' },
            { status: 400 }
        );
    }
}
