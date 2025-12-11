// Script to create admin user
// Run: node scripts/createAdmin.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env.local file
const envPath = join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const MONGODB_URI = envContent.match(/MONGODB_URI=(.*)/)?.[1]?.trim();

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
}

// User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdminUser() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const adminEmail = 'admin@dazzlingsky.com';
        const adminPassword = 'admin123';

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('📧 Email:', adminEmail);
            console.log('🔐 Password: admin123\n');

            // Update to admin role if not already
            if (existingAdmin.role !== 'admin') {
                existingAdmin.role = 'admin';
                await existingAdmin.save();
                console.log('✅ Updated existing user to admin role\n');
            }
        } else {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            // Create admin user
            await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
            });

            console.log('✅ Admin user created successfully!');
            console.log('📧 Email:', adminEmail);
            console.log('🔐 Password:', adminPassword);
            console.log('');
        }

        console.log('🎉 You can now login at: http://localhost:3000/login');
        console.log('🔐 Admin Panel: http://localhost:3000/admin\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('👋 Disconnected from MongoDB');
        process.exit(0);
    }
}

createAdminUser();
