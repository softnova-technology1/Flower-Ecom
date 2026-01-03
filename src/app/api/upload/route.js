import { NextResponse } from 'next/server';

// Cloudinary upload API route
// NOTE: Install cloudinary package: pnpm add cloudinary

export async function POST(request) {
    try {
        // Check if cloudinary is configured
        if (!process.env.CLOUDINARY_CLOUD_NAME || 
            !process.env.CLOUDINARY_API_KEY || 
            !process.env.CLOUDINARY_API_SECRET) {
            
            // Fallback: Store as base64 in database (temporary solution)
            const { image } = await request.json();
            
            return NextResponse.json({
                success: true,
                url: image, // Return base64 directly
                publicId: null,
                warning: 'Cloudinary not configured. Using base64 storage (not recommended for production)',
            });
        }

        // Import cloudinary (lazy load)
        const cloudinary = (await import('cloudinary')).v2;
        
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const { image } = await request.json();

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: 'flower-ecom', // Organize uploads in folder
            resource_type: 'auto',
        });

        return NextResponse.json({
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error.message || 'Failed to upload image' 
            },
            { status: 500 }
        );
    }
}

// DELETE - Remove image from Cloudinary
export async function DELETE(request) {
    try {
        if (!process.env.CLOUDINARY_CLOUD_NAME) {
            return NextResponse.json({
                success: true,
                message: 'Cloudinary not configured',
            });
        }

        const cloudinary = (await import('cloudinary')).v2;
        
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const { publicId } = await request.json();

        if (!publicId) {
            return NextResponse.json(
                { success: false, error: 'Public ID is required' },
                { status: 400 }
            );
        }

        await cloudinary.uploader.destroy(publicId);

        return NextResponse.json({
            success: true,
            message: 'Image deleted successfully',
        });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

