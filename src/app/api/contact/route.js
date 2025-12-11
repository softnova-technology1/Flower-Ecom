import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

// POST /api/contact - Submit contact form
export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        const contact = await Contact.create({
            name,
            email,
            subject: subject || 'No subject',
            message,
        });

        // TODO: Send email notification to admin

        return NextResponse.json(
            {
                success: true,
                message: 'Message sent successfully. We will get back to you soon!',
                contactId: contact._id,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to send message' },
            { status: 400 }
        );
    }
}

// GET /api/contact - Get all contact submissions (Admin only)
export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        let query = {};
        if (status) {
            query.status = status;
        }

        const contacts = await Contact.find(query)
            .sort('-createdAt')
            .lean();

        return NextResponse.json({ success: true, contacts });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}
