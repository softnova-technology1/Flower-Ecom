# 🌸 UPI Payment & Order Tracking Implementation Guide

## ✅ COMPLETED FEATURES

### 1. **UPI Payment System** 💳
- Customer redirects to GPay/PhonePe for payment
- Manual UPI ID display for payment
- Payment screenshot upload
- Transaction ID capture
- Payment verification workflow

### 2. **Order Management** 📦
- Orders saved to database immediately
- Payment status tracking
- Order confirmation workflow
- Owner can call customer to confirm

### 3. **Tracking System** 🚚
- Auto-generate tracking numbers (TRK + unique ID)
- Customer tracking page (`/track-order`)
- Real-time order status updates
- 7 status stages (pending_payment → delivered)

### 4. **Admin Dashboard** 👨‍💼
- View all orders with filters
- Click phone number to call customer
- Generate tracking numbers
- Update order status
- View payment screenshots
- Add notes after customer call
- Confirm orders

### 5. **Notifications** 🔔
- Console logging (ready for WhatsApp/SMS integration)
- Owner notification on new order
- Customer notification system ready

---

## 🚀 HOW IT WORKS (USER JOURNEY)

### **Step 1: Customer Places Order**
```
/checkout → Fill contact → Fill delivery details → Click "PROCEED TO PAYMENT"
```
- Order is created in database with status: `pending_payment`
- Customer is redirected to `/payment?orderId=xxx`

### **Step 2: Customer Pays via UPI**
```
/payment → Click "Pay with GPay/PhonePe" → Pay → Upload screenshot + Transaction ID
```
- Opens GPay/PhonePe app automatically (on mobile)
- Customer completes payment
- Customer uploads payment proof
- Order status changes to: `payment_received`

### **Step 3: Owner Receives Notification**
```
Console log (or WhatsApp/SMS/Email) with order details
```
- Owner sees new order in admin dashboard
- Owner calls customer using phone number
- Owner marks order as confirmed
- Status changes to: `confirmed`

### **Step 4: Owner Generates Tracking Number**
```
Admin Dashboard → Click "Generate" button
```
- Tracking number created (e.g., `TRK174523ABC`)
- Customer can now track order

### **Step 5: Customer Tracks Order**
```
/track-order → Enter tracking number → See real-time status
```
- Shows visual timeline of order progress
- Displays delivery partner info (when added)
- Shows expected delivery date/time

### **Step 6: Order Status Updates**
```
confirmed → preparing → out_for_delivery → delivered
```
- Owner updates status from admin dashboard
- Customer sees updates on tracking page

---

## 📂 NEW FILES CREATED

| File | Purpose |
|------|---------|
| `/src/app/payment/page.js` | UPI payment page with screenshot upload |
| `/src/styles/Payment.module.css` | Payment page styles |
| `/src/app/track-order/page.js` | Customer order tracking page |
| `/src/styles/TrackOrder.module.css` | Tracking page styles |
| `/src/app/api/orders/[id]/route.js` | Get single order API |
| `/src/app/api/orders/[id]/payment/route.js` | Submit payment proof API |
| `/src/app/api/orders/track/route.js` | Track order by tracking number API |
| `/src/lib/notifications.js` | Notification system (ready for WhatsApp/SMS) |
| `UPI_PAYMENT_IMPLEMENTATION.md` | This guide |

---

## 🔧 CONFIGURATION NEEDED

### **1. Set Your UPI ID**

Edit `/src/app/payment/page.js`:

```javascript
const UPI_ID = "yourshop@upi"; // ⚠️ CHANGE THIS
const SHOP_NAME = "Dazzling Sky Flowers"; // Your shop name
```

**How to get your UPI ID:**
- Open GPay/PhonePe
- Go to Profile
- Your UPI ID looks like: `yourname@oksbi` or `9876543210@paytm`

### **2. Enable Notifications (Optional)**

Edit `/src/lib/notifications.js` to integrate:

#### **Option A: WhatsApp Business API**
```javascript
// Uncomment and configure
await sendWhatsApp({
    to: "6591234567", // Your Singapore number
    message: `New Order! #${order._id.slice(-8)}...`
});
```

#### **Option B: Twilio SMS**
```javascript
// Add Twilio credentials to .env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number

// Use in notifications.js
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
await twilio.messages.create({
    body: 'New order received!',
    from: process.env.TWILIO_PHONE_NUMBER,
    to: '+6591234567'
});
```

#### **Option C: Email (Already configured)**
- Update email settings in `/src/lib/email.js`
- Uses Nodemailer (already installed)

---

## 🎯 TESTING GUIDE

### **Test 1: Place Order**
1. Go to `/products`
2. Add products to cart
3. Go to `/checkout`
4. Fill form and proceed to payment
5. **Check:** Order created in MongoDB with `pending_payment` status

### **Test 2: Submit Payment**
1. On payment page, enter fake transaction ID
2. Upload any image as screenshot
3. Click "Submit Payment Proof"
4. **Check:** Order status changes to `payment_received`

### **Test 3: Admin View Order**
1. Login to admin: `/admin/login`
2. Go to `/admin/orders`
3. Click phone number to "call" customer
4. Click "View" button to see order details
5. Click "Generate" tracking number
6. **Check:** Tracking number appears

### **Test 4: Track Order**
1. Copy tracking number from admin
2. Go to `/track-order`
3. Enter tracking number
4. **Check:** Order status timeline displays

### **Test 5: Update Status**
1. In admin orders page
2. Change status dropdown
3. **Check:** Status updates immediately

---

## 📱 MOBILE UPI PAYMENT

The UPI deep link format used:

```
upi://pay?pa=YOUR_UPI_ID&pn=SHOP_NAME&am=AMOUNT&cu=SGD&tn=ORDER_REF
```

**What happens:**
- On mobile: Opens GPay/PhonePe/Paytm automatically
- On desktop: Shows manual UPI ID to copy

---

## 🛠️ DATABASE CHANGES

### **Order Model Updates:**

```javascript
{
    // ... existing fields ...
    
    // NEW FIELDS:
    trackingNumber: "TRK174523ABC",
    ownerNotes: "Customer confirmed delivery time",
    customerConfirmed: true,
    deliveryPartner: {
        name: "John",
        phone: "91234567"
    },
    deliveryDate: "2025-01-15",
    deliveryTime: "14:00",
    customerPhone: "91234567",
    
    // UPDATED STATUS ENUM:
    status: "confirmed", // pending_payment | payment_received | confirmed | preparing | out_for_delivery | delivered | cancelled
    
    // PAYMENT PROOF:
    paymentResult: {
        transactionId: "UPI123456789",
        paymentScreenshot: "base64_or_url",
        status: "pending_verification"
    }
}
```

---

## 🚨 IMPORTANT SECURITY NOTES

1. **Payment Screenshot Storage:**
   - Currently stores as base64 in database
   - **For production:** Upload to cloud storage (AWS S3, Cloudinary)
   - Don't store large images in MongoDB

2. **Payment Verification:**
   - Manual verification required
   - Check screenshot + transaction ID
   - Mark as `isPaid: true` after verification

3. **Admin Auth:**
   - Already protected with NextAuth
   - Only admin role can access `/admin/*`

---

## 📊 ORDER STATUS FLOW

```
1. pending_payment
   ↓ (Customer uploads payment proof)
2. payment_received
   ↓ (Owner calls & confirms)
3. confirmed
   ↓ (Owner starts preparing)
4. preparing
   ↓ (Ready for delivery)
5. out_for_delivery
   ↓ (Customer receives)
6. delivered ✓
```

---

## 💡 RECOMMENDED NEXT STEPS

### **Immediate (Before Launch):**
1. ✅ Set your UPI ID in `/src/app/payment/page.js`
2. ✅ Test full order flow
3. ✅ Add your phone number for notifications

### **Week 1:**
1. Integrate WhatsApp Business API for auto-notifications
2. Upload payment screenshots to cloud storage
3. Add QR code generation for UPI payments

### **Week 2:**
1. Add SMS notifications via Twilio
2. Create delivery partner management
3. Add bulk status updates

### **Future:**
1. Automatic payment verification (if using payment gateway)
2. Customer WhatsApp notifications
3. Delivery partner app integration
4. Analytics dashboard

---

## 🎓 HOW TO USE

### **As Shop Owner:**
1. Check `/admin/orders` multiple times per day
2. When new order arrives (notification), call customer
3. Generate tracking number after confirming
4. Update status as you prepare and deliver
5. Mark as delivered when done

### **As Customer:**
1. Place order on website
2. Pay via GPay/PhonePe
3. Upload payment screenshot
4. Wait for owner's call
5. Track order with tracking number

---

## 📞 SUPPORT

For any issues:
1. Check console logs in browser/terminal
2. Check MongoDB orders collection
3. Verify environment variables in `.env.local`

---

## ✅ SUCCESS CRITERIA

Your implementation is successful when:
- [x] Customers can place orders
- [x] Orders save to database
- [x] Payment page shows UPI details
- [x] Payment screenshots upload
- [x] Admin can view orders
- [x] Admin can call customers (click phone)
- [x] Tracking numbers generate
- [x] Customers can track orders
- [x] Status updates work
- [x] Notifications log to console

---

**Status:** ✅ **READY FOR TESTING**

**Next:** Set your UPI ID and start testing!

---

Made with ❤️ for your Flower E-commerce Business

