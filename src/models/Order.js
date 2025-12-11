import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false, // Optional for ghost checkout
        },
        guestEmail: {
            type: String, // Store email for guest orders
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: false, // Optional for guest checkout
                },
                name: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity must be at least 1'],
                },
                price: {
                    type: Number,
                    required: true,
                },
                image: String,
            },
        ],
        shippingAddress: {
            name: {
                type: String,
                required: true,
            },
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            zipCode: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
        },
        billingAddress: {
            name: String,
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String,
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['card', 'paypal', 'cash'],
            default: 'cash',
        },
        paymentResult: {
            id: String,
            status: String,
            updateTime: String,
            emailAddress: String,
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
