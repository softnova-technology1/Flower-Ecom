import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot be more than 5'],
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        comment: {
            type: String,
            required: [true, 'Review comment is required'],
            maxlength: [500, 'Comment cannot exceed 500 characters'],
        },
        helpful: {
            type: Number,
            default: 0,
        },
        notHelpful: {
            type: Number,
            default: 0,
        },
        helpfulVotes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        notHelpfulVotes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        approved: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate reviews from same user for same product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
