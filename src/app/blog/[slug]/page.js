import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";
import FinalNav from "@/components/FinalNav";
import Footer from "@/components/Footer";
import styles from "@/styles/BlogSingle.module.css";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";

export async function generateMetadata({ params }) {
    await connectDB();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug });

    if (!blog) {
        return {
            title: 'Blog Post Not Found | Flower Shop',
        };
    }

    return {
        title: blog.metaTitle || `${blog.title} | Flower Shop Blog`,
        description: blog.metaDescription || blog.excerpt || "Read our latest blog post about flowers and care tips.",
        keywords: blog.keywords,
        openGraph: {
            title: blog.metaTitle || blog.title,
            description: blog.metaDescription || blog.excerpt,
            images: [blog.image],
        },
    };
}

async function getBlog(slug) {
    await connectDB();
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) return null;

    // Convert _id and dates to string if needed, mostly for client components, 
    // but here we use it in server component so it's fine.
    return { ...blog, _id: blog._id.toString() };
}

async function getRecentBlogs(currentSlug) {
    await connectDB();
    const blogs = await Blog.find({ slug: { $ne: currentSlug } })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title slug image createdAt')
        .lean();

    return blogs.map(b => ({ ...b, _id: b._id.toString() }));
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    const recentBlogs = await getRecentBlogs(slug);

    const dateFormatted = new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <>
            <ScrollToTop />
            <FinalNav />

            <div className={styles.Mainblogsingle}>
                <div className={styles.blogDetailsWrapper}>
                    {/* LEFT COLUMN: Main Content */}
                    <div className={styles.blogleft}>
                        <h1 className={styles.blogtitle}>{blog.title}</h1>

                        <div className={styles.bloginfo}>
                            <span>📅 {dateFormatted}</span>
                            <span>📂 {blog.category}</span>
                            <span>👤 {blog.author}</span>
                        </div>

                        <img
                            src={blog.image}
                            alt={blog.title}
                            className={styles.blogmainimg}
                        />

                        {/* Content */}
                        <div
                            className={styles.blogpara}
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div style={{ marginTop: '30px', color: '#ccc' }}>
                                <strong>Tags: </strong>
                                {blog.tags.join(', ')}
                            </div>
                        )}

                        <hr style={{ borderColor: '#333', margin: '40px 0' }} />

                        <div className={styles.originPara}>
                            <p>Thank you for reading! Visit our shop for the best flowers.</p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <div className={styles.blogright}>
                        <h3 className={styles.recenttitle}>Recent Posts</h3>

                        {recentBlogs.length === 0 && <p className={styles.error}>No other posts yet.</p>}

                        <div className={styles.scrollContainer}>
                            <div className={styles.scrollContent}>
                                {recentBlogs.map(b => (
                                    <Link href={`/blog/${b.slug}`} key={b._id} style={{ textDecoration: 'none' }}>
                                        <div className={styles.recentpost}>
                                            <img src={b.image} alt={b.title} />
                                            <div>
                                                <h4 style={{ fontSize: '14px', color: '#fff', margin: 0 }}>{b.title}</h4>
                                                <span style={{ fontSize: '12px', color: '#888' }}>
                                                    {new Date(b.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                {/* Duplicate for infinite scroll effect if needed or sufficient items */}
                                {recentBlogs.length > 3 && recentBlogs.map(b => (
                                    <Link href={`/blog/${b.slug}`} key={`dup-${b._id}`} style={{ textDecoration: 'none' }}>
                                        <div className={styles.recentpost}>
                                            <img src={b.image} alt={b.title} />
                                            <div>
                                                <h4 style={{ fontSize: '14px', color: '#fff', margin: 0 }}>{b.title}</h4>
                                                <span style={{ fontSize: '12px', color: '#888' }}>
                                                    {new Date(b.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
