# 🚀 Backend Setup Guide

## Prerequisites

1. **MongoDB Atlas Account** (Free tier available)
2. **Node.js** installed (already done)
3. **Dependencies** installed (already done)

---

## Step 1: Setup MongoDB Atlas

### Create Account & Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (Free M0 tier)
4. Wait for cluster to be created (2-3 minutes)

### Configure Database Access

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Create username and password (save these!)
4. Set privileges to "Read and write to any database"
5. Click "Add User"

### Configure Network Access

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `flower-ecom`

---

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flower-ecom?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this
```

3. Generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## Step 3: Test Database Connection

Create a test API route to verify connection:

```bash
curl http://localhost:3000/api/products
```

You should see:
```json
{
  "success": true,
  "products": [],
  "pagination": { ... }
}
```

---

## Step 4: Seed Initial Data (Optional)

Create some test products in MongoDB:

1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Click "Add My Own Data"
4. Database: `flower-ecom`
5. Collection: `products`
6. Insert sample product:

```json
{
  "name": "Rose Red",
  "description": "Beautiful red roses",
  "price": 150,
  "oldPrice": 200,
  "category": "Focal Flowers",
  "image": "/images/f1.png",
  "stock": 50,
  "featured": true,
  "bestSelling": true,
  "rating": 4.5,
  "numReviews": 10
}
```

---

## API Endpoints Available

### Products
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/[productId]` - Get product reviews

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)

---

## Testing APIs

### Using curl:

```bash
# Get products
curl http://localhost:3000/api/products

# Create order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"product": "...", "name": "Rose", "quantity": 2, "price": 150}],
    "shippingAddress": {...}
  }'

# Subscribe to newsletter
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Using Thunder Client (VS Code Extension):

1. Install Thunder Client extension
2. Create new request
3. Set method (GET/POST)
4. Enter URL: `http://localhost:3000/api/products`
5. For POST, add JSON body
6. Click Send

---

## Next Steps

1. ✅ Database models created
2. ✅ API routes implemented
3. ⏳ Add authentication (NextAuth.js)
4. ⏳ Integrate frontend with API
5. ⏳ Add admin dashboard

---

## Troubleshooting

### "MONGODB_URI not defined"
- Make sure `.env.local` exists
- Restart dev server: `npm run dev`

### "Connection timeout"
- Check Network Access in MongoDB Atlas
- Make sure IP is whitelisted

### "Authentication failed"
- Check username/password in connection string
- Make sure user has correct permissions

---

## Files Created

- `/src/lib/mongodb.js` - Database connection
- `/src/models/` - 6 Mongoose models
- `/src/app/api/` - 7 API routes
- `.env.example` - Environment template

**Status**: ✅ Backend Phase 1 Complete!
