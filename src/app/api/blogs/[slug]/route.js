import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { slug } = await params; // Await params in newer Next.js

        const blog = await Blog.findOne({ slug });

        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch blog' },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
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
        const { slug } = await params;

        const deletedBlog = await Blog.findOneAndDelete({ slug });

        if (!deletedBlog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete blog' },
            { status: 500 }
        );
    }
}
