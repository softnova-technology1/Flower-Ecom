import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        subject: {
            type: String,
            trim: true,
            maxlength: [100, 'Subject cannot exceed 100 characters'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            maxlength: [1000, 'Message cannot exceed 1000 characters'],
        },
        status: {
            type: String,
            enum: ['new', 'read', 'replied'],
            default: 'new',
        },
        reply: {
            type: String,
            maxlength: [2000, 'Reply cannot exceed 2000 characters'],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
