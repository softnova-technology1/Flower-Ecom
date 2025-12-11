import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

// Test database connection
export async function GET() {
    try {
        await connectDB();

        return NextResponse.json({
            success: true,
            message: 'Database connected successfully!',
            database: 'flower-ecom',
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to connect to database',
            },
            { status: 500 }
        );
    }
}
