import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

// POST /api/orders/[id]/payment - Submit payment proof
export async function POST(request, { params }) {
    try {
        await connectDB();

        const body = await request.json();
        const { transactionId, paymentScreenshot, paymentMethod } = body;

        if (!transactionId || !paymentScreenshot) {
            return NextResponse.json(
                { success: false, error: 'Transaction ID and screenshot are required' },
                { status: 400 }
            );
        }

        let uploadedImageUrl = paymentScreenshot; // Default to base64

        // Try to upload to Cloudinary if configured
        if (process.env.CLOUDINARY_CLOUD_NAME && 
            process.env.CLOUDINARY_API_KEY && 
            process.env.CLOUDINARY_API_SECRET) {
            try {
                const cloudinary = (await import('cloudinary')).v2;
                
                cloudinary.config({
                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                    api_key: process.env.CLOUDINARY_API_KEY,
                    api_secret: process.env.CLOUDINARY_API_SECRET,
                });

                const result = await cloudinary.uploader.upload(paymentScreenshot, {
                    folder: 'payment-proofs',
                    resource_type: 'auto',
                    public_id: `payment-${params.id}-${Date.now()}`,
                });

                uploadedImageUrl = result.secure_url;
                console.log('✅ Payment proof uploaded to Cloudinary:', uploadedImageUrl);
            } catch (cloudinaryError) {
                console.error('⚠️ Cloudinary upload failed, using base64:', cloudinaryError.message);
                // Continue with base64 if Cloudinary fails
            }
        }

        // Update order with payment proof
        const order = await Order.findByIdAndUpdate(
            params.id,
            {
                'paymentResult.transactionId': transactionId,
                'paymentResult.paymentScreenshot': uploadedImageUrl, // Use Cloudinary URL or base64
                'paymentResult.status': 'pending_verification',
                'paymentResult.updateTime': new Date().toISOString(),
                paymentMethod: paymentMethod || 'upi',
                status: 'payment_received',
                paymentProof: uploadedImageUrl, // Also store in top-level field
            },
            { new: true }
        );

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        // Send notification to admin/owner
        try {
            const { sendNewOrderNotification } = await import('@/lib/notifications');
            sendNewOrderNotification(order).catch(err => 
                console.error('Notification error:', err)
            );
        } catch (notifError) {
            console.error('Failed to send notification:', notifError);
        }

        return NextResponse.json({
            success: true,
            message: 'Payment proof submitted successfully',
            order,
        });
    } catch (error) {
        console.error('Error submitting payment proof:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit payment proof' },
            { status: 500 }
        );
    }
}

