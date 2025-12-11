# 🌸 Dazzling Sky - Flower E-Commerce (Next.js 14)

## ✅ Successfully Migrated from React to Next.js 14!

This is a modern, fully-featured e-commerce application for selling flowers and plants, now powered by **Next.js 14 App Router** for better performance, SEO, and developer experience.

---

## 🚀 What's New in Next.js Version?

### **Performance Improvements**
- ⚡ **Server-Side Rendering (SSR)** for faster initial page loads
- 🖼️ **Automatic Image Optimization** with Next.js Image component
- 📦 **Code Splitting** - Only load what you need
- 🔄 **Turbopack** - Ultra-fast bundler for development

### **SEO Enhancements**
- 🎯 **Metadata API** for better search engine visibility
- 📱 **Open Graph** tags for social media sharing
- 🗺️ **Automatic Sitemap** generation (can be added)
- 🤖 **robots.txt** support

### **Developer Experience**
- 📁 **File-based Routing** - No more route configuration
- 🎨 **CSS Modules** - Scoped styling out of the box
- 🔥 **Hot Module Replacement** - Instant updates
- 📝 **TypeScript Ready** - Easy to migrate to TypeScript

---

## 📋 Features

- 🛒 **Shopping Cart** with localStorage persistence
- 💳 **Checkout Flow** with order confirmation
- 🎨 **Parallax Scrolling** effects
- ⏰ **Flash Sale** with countdown timer
- 📱 **Fully Responsive** design
- 🎭 **Smooth Animations** with Framer Motion
- 📧 **Newsletter Subscription**
- 📝 **Blog Section**
- 📞 **Contact Form** with Google Maps
- ❓ **FAQ Section**

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **React**: 19.2.1
- **Styling**: CSS Modules + Bootstrap 5.3.8
- **Animations**: Framer Motion 12.23.26
- **Icons**: React Icons 5.5.0
- **Notifications**: React Toastify 11.0.5
- **State Management**: React Context API

---

## 📂 Project Structure

```
flower-ecom-next/
├── public/
│   └── images/          # All product and UI images
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── layout.js   # Root layout with providers
│   │   ├── page.js     # Home page
│   │   ├── about/
│   │   ├── blog/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── contact/
│   │   ├── order-success/
│   │   └── products/
│   ├── components/     # Reusable React components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── Category.js
│   │   ├── FlashSale.js
│   │   ├── BestSelling.js
│   │   ├── PageWrapper.js
│   │   └── ScrollToTop.js
│   ├── context/        # React Context
│   │   └── CartContext.js
│   ├── data/           # Static data
│   │   └── BlogData.js
│   └── styles/         # CSS Modules
│       ├── Navbar.module.css
│       ├── Footer.module.css
│       └── ...
├── package.json
└── next.config.mjs
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 🎯 Available Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, categories, flash sale |
| `/about` | About us with company info |
| `/products` | Product listing page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout form |
| `/order-success` | Order confirmation |
| `/blog` | Blog listing |
| `/contact` | Contact form with map |
| `/faq` | Frequently asked questions |

---

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Next.js Config
Edit `next.config.mjs` for custom configuration:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-domain.com'],
  },
};

export default nextConfig;
```

---

## 📱 Responsive Design

- ✅ Mobile (320px - 767px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (1025px+)

---

## 🎨 Customization

### Colors
Main brand colors are defined in CSS modules:
- Primary: `#b3773b` (Golden)
- Background: `#0f1112` (Dark)
- Accent: `#c78a3a` (Light Golden)

### Fonts
- **Brand**: Kaushan Script (cursive)
- **Body**: Syne (sans-serif)

---

## 🐛 Known Issues & Solutions

### Issue: Images not loading
**Solution**: Make sure all images are in `/public/images/` directory

### Issue: Cart not persisting
**Solution**: Check browser localStorage is enabled

### Issue: Animations not working
**Solution**: AOS library requires client-side rendering - already handled with "use client"

---

## 📈 Future Enhancements

- [ ] Add product search functionality
- [ ] Implement user authentication
- [ ] Add product reviews and ratings
- [ ] Integrate payment gateway
- [ ] Add wishlist feature
- [ ] Implement admin dashboard
- [ ] Add multi-language support
- [ ] Optimize images with Next.js Image component

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Softnova Technology**

---

## 🙏 Acknowledgments

- Original React version migrated to Next.js 14
- Bootstrap for responsive grid system
- Framer Motion for smooth animations
- React Icons for beautiful icons
- AOS for scroll animations

---

## 📞 Support

For support, email: support@dazzlingsky.com

---

**Made with ❤️ using Next.js 14**
