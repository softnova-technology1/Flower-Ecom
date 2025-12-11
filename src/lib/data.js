import Product from '@/models/Product';
import connectDB from '@/lib/mongodb';

// Get all products from database
export async function getAllProducts(params = {}) {
    try {
        await connectDB();

        const {
            page = 1,
            limit = 12,
            category,
            featured,
            bestSelling,
            newArrival,
            sort = '-createdAt',
        } = params;

        const skip = (page - 1) * limit;
        let query = {};

        if (category && category !== 'all') {
            query.category = category;
        }
        if (featured === 'true') {
            query.featured = true;
        }
        if (bestSelling === 'true') {
            query.bestSelling = true;
        }
        if (newArrival === 'true') {
            query.newArrival = true;
        }

        const total = await Product.countDocuments(query);
        const products = await Product.find(query)
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .lean();

        // Convert MongoDB _id to string
        const productsData = products.map((p) => ({
            ...p,
            _id: p._id.toString(),
        }));

        return {
            products: productsData,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { products: [], pagination: { page: 1, limit, total: 0, pages: 0 } };
    }
}

// Get single product by ID
export async function getProductById(id) {
    try {
        await connectDB();
        const product = await Product.findById(id).lean();

        if (!product) return null;

        return {
            ...product,
            _id: product._id.toString(),
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}
