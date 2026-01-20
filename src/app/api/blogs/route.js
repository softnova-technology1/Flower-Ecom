import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET /api/blogs
export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        let query = {};
        if (category) {
            query.category = category;
        }

        const blogs = await Blog.find(query).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, blogs });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
}

// POST /api/blogs
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

        // Simple slug generator
        const slug = body.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        // Check if slug exists
        const existing = await Blog.findOne({ slug });
        if (existing) {
            return NextResponse.json(
                { success: false, error: 'Blog with this title already exists' },
                { status: 400 }
            );
        }

        const blog = await Blog.create({ ...body, slug });

        return NextResponse.json({ success: true, blog }, { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create blog' },
            { status: 400 }
        );
    }
}
