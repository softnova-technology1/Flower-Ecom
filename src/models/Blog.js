import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    content: {
        type: String,
        required: [true, 'Please provide content'],
    },
    excerpt: {
        type: String,
        maxLength: 3000,
    },
    image: {
        type: String,
        required: [true, 'Please provide a featured image'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
    },
    tags: {
        type: [String],
        default: [],
    },
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    keywords: {
        type: [String],
        default: [],
    },
    author: {
        type: String,
        default: 'Admin',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
