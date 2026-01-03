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
                    required: false, // Optional - not required for static JSON products
                },
                productId: {
                    type: String, // For static JSON product IDs
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
            enum: ['card', 'paypal', 'cash', 'upi'],
            default: 'upi',
        },
        paymentResult: {
            id: String,
            status: String,
            updateTime: String,
            emailAddress: String,
            upiId: String,
            transactionId: String,
            paymentScreenshot: String, // URL to uploaded screenshot
        },
        trackingNumber: {
            type: String,
            unique: true,
            sparse: true, // Allows null values
        },
        ownerNotes: {
            type: String, // For internal notes after calling customer
        },
        customerConfirmed: {
            type: Boolean,
            default: false, // True after owner calls and confirms
        },
        deliveryPartner: {
            name: String,
            phone: String,
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
            enum: ['pending_payment', 'payment_received', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
            default: 'pending_payment',
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
        deliveryDate: {
            type: String, // Store as YYYY-MM-DD
        },
        deliveryTime: {
            type: String, // Store as HH:MM
        },
        customerPhone: {
            type: String, // Direct customer phone for owner to call
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
