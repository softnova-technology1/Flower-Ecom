import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    console.log("🔐 Login attempt for:", credentials?.email);

                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Please enter email and password");
                    }

                    await connectDB();

                    const user = await User.findOne({ email: credentials.email }).select('+password');
                    console.log("👤 User found:", user ? "Yes" : "No");

                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    if (!user.password) {
                        console.error("❌ User password is undefined!");
                        throw new Error("Invalid user data");
                    }

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    console.log("🔑 Password valid:", isPasswordValid);

                    if (!isPasswordValid) {
                        throw new Error("Invalid password");
                    }

                    console.log("✅ Login successful for:", user.email);
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("❌ Auth error:", error.message);
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
