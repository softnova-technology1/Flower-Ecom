import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// GET /api/products/[id] - Get single product
export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const product = await Product.findById(id).lean();

        if (!product) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, product });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch product' },
            { status: 500 }
        );
    }
}

// PUT /api/products/[id] - Update product (Admin only)
export async function PUT(request, { params }) {
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
        const { id } = await params;

        const body = await request.json();

        const product = await Product.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, product });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update product' },
            { status: 400 }
        );
    }
}

// DELETE /api/products/[id] - Delete product (Admin only)
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
        const { id } = await params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}
