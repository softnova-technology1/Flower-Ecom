import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, error: 'All fields are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { success: false, error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'User already exists with this email' },
                { status: 400 }
            );
        }


        // Create user (password will be hashed by User model pre-save hook)
        const user = await User.create({
            name,
            email,
            password, // Don't hash here - User model will do it
        });

        // Send welcome email (don't wait for it)
        try {
            const { sendEmail } = await import('@/lib/email');
            const { welcomeEmailTemplate } = await import('@/lib/emailTemplates');

            await sendEmail({
                to: user.email,
                subject: 'Welcome to Dazzling Sky! 🌸',
                html: welcomeEmailTemplate(user.name),
            });
        } catch (emailError) {
            console.error('Error sending welcome email:', emailError);
            // Don't fail registration if email fails
        }

        return NextResponse.json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to register user' },
            { status: 500 }
        );
    }
}
