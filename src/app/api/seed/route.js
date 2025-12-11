import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// Seed initial products
export async function POST() {
    try {
        await connectDB();

        // Check if products already exist
        const count = await Product.countDocuments();
        if (count > 0) {
            return NextResponse.json({
                success: false,
                message: 'Products already exist. Delete them first if you want to reseed.',
                count,
            });
        }

        // Sample products data
        const products = [
            {
                name: 'Rose Red',
                description: 'Beautiful red roses perfect for any occasion. Fresh and vibrant.',
                price: 150,
                oldPrice: 200,
                category: 'Focal Flowers',
                image: '/images/f1.png',
                images: ['/images/f1.png'],
                stock: 50,
                featured: true,
                bestSelling: true,
                newArrival: false,
                rating: 4.5,
                numReviews: 12,
            },
            {
                name: 'Flowers Gerbera',
                description: 'Colorful gerbera daisies that brighten any space.',
                price: 200,
                oldPrice: 250,
                category: 'Focal Flowers',
                image: '/images/f2.png',
                images: ['/images/f2.png'],
                stock: 40,
                featured: true,
                bestSelling: true,
                newArrival: false,
                rating: 4.7,
                numReviews: 8,
            },
            {
                name: 'Olive Branches',
                description: 'Elegant olive branches for sophisticated arrangements.',
                price: 100,
                oldPrice: 150,
                category: 'Greenery',
                image: '/images/f3.png',
                images: ['/images/f3.png'],
                stock: 60,
                featured: true,
                bestSelling: false,
                newArrival: false,
                rating: 4.3,
                numReviews: 5,
            },
            {
                name: 'Areca Palm',
                description: 'Tropical areca palm leaves for exotic arrangements.',
                price: 33,
                oldPrice: 33,
                category: 'Greenery',
                image: '/images/lp1.png',
                images: ['/images/lp1.png'],
                stock: 30,
                featured: false,
                bestSelling: true,
                newArrival: true,
                rating: 4.2,
                numReviews: 6,
            },
            {
                name: 'Sunflowers',
                description: 'Bright and cheerful sunflowers that bring joy.',
                price: 33,
                oldPrice: 33,
                category: 'Focal Flowers',
                image: '/images/lp2.png',
                images: ['/images/lp2.png'],
                stock: 45,
                featured: false,
                bestSelling: false,
                newArrival: true,
                rating: 4.8,
                numReviews: 15,
            },
            {
                name: 'White Camellia',
                description: 'Elegant white camellia flowers for classic beauty.',
                price: 33,
                oldPrice: 33,
                category: 'Focal Flowers',
                image: '/images/lp3.png',
                images: ['/images/lp3.png'],
                stock: 35,
                featured: false,
                bestSelling: true,
                newArrival: true,
                rating: 4.6,
                numReviews: 10,
            },
            {
                name: 'Blossom Noir',
                description: 'Unique dark blossoms for dramatic arrangements.',
                price: 31,
                oldPrice: 31,
                category: 'Focal Flowers',
                image: '/images/lp5.png',
                images: ['/images/lp5.png'],
                stock: 25,
                featured: false,
                bestSelling: true,
                newArrival: false,
                rating: 4.4,
                numReviews: 7,
            },
            {
                name: 'Staghorn Fern',
                description: 'Exotic staghorn fern for unique greenery.',
                price: 27,
                oldPrice: 27,
                category: 'Greenery',
                image: '/images/lp6.png',
                images: ['/images/lp6.png'],
                stock: 20,
                featured: false,
                bestSelling: true,
                newArrival: false,
                rating: 4.1,
                numReviews: 4,
            },
        ];

        // Insert products
        const created = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Successfully created ${created.length} products`,
            count: created.length,
            products: created,
        });
    } catch (error) {
        console.error('Error seeding products:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to seed products',
            },
            { status: 500 }
        );
    }
}

// Delete all products (for reseeding)
export async function DELETE() {
    try {
        await connectDB();

        const result = await Product.deleteMany({});

        return NextResponse.json({
            success: true,
            message: `Deleted ${result.deletedCount} products`,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error('Error deleting products:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to delete products',
            },
            { status: 500 }
        );
    }
}
