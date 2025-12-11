import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            maxlength: [100, 'Product name cannot exceed 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            maxlength: [2000, 'Description cannot exceed 2000 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price cannot be negative'],
        },
        oldPrice: {
            type: Number,
            min: [0, 'Old price cannot be negative'],
        },
        category: {
            type: String,
            required: [true, 'Product category is required'],
            enum: ['Focal Flowers', 'Filler Flowers', 'Line Flowers', 'Greenery', 'Other'],
        },
        image: {
            type: String,
            required: [true, 'Product image is required'],
        },
        images: [{
            type: String,
        }],
        stock: {
            type: Number,
            required: [true, 'Stock quantity is required'],
            min: [0, 'Stock cannot be negative'],
            default: 0,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        bestSelling: {
            type: Boolean,
            default: false,
        },
        newArrival: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            default: 0,
            min: [0, 'Rating cannot be less than 0'],
            max: [5, 'Rating cannot be more than 5'],
        },
        numReviews: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index for search functionality
ProductSchema.index({ name: 'text', description: 'text' });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
