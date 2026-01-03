// Simple notification system for order updates
// You can integrate WhatsApp, SMS, or email here

export async function notifyOwnerNewOrder(order) {
    try {
        console.log("🔔 NEW ORDER NOTIFICATION");
        console.log("===========================");
        console.log(`Order ID: ${order._id}`);
        console.log(`Customer: ${order.shippingAddress?.name}`);
        console.log(`Phone: ${order.shippingAddress?.phone}`);
        console.log(`Total: ${order.totalPrice} SGD`);
        console.log(`Items:`, order.items.map(i => `${i.name} (x${i.quantity})`).join(", "));
        console.log("===========================");

        // TODO: Integrate real notification service
        // Examples:
        
        // 1. WhatsApp Business API
        // await sendWhatsApp({
        //     to: "YOUR_PHONE_NUMBER",
        //     message: `🌸 New Order! #${order._id.slice(-8)}\nCustomer: ${order.shippingAddress?.name}\nPhone: ${order.shippingAddress?.phone}\nTotal: ${order.totalPrice} SGD`
        // });

        // 2. Twilio SMS
        // await sendSMS({
        //     to: "YOUR_PHONE_NUMBER",
        //     body: `New order received! ${order.shippingAddress?.name} - ${order.totalPrice} SGD`
        // });

        // 3. Email
        // await sendEmail({
        //     to: "owner@yourshop.com",
        //     subject: `New Order #${order._id.slice(-8)}`,
        //     html: generateOrderNotificationEmail(order)
        // });

        // 4. Telegram Bot
        // await sendTelegramMessage({
        //     chatId: "YOUR_TELEGRAM_CHAT_ID",
        //     text: `🌸 New Order!\n\nOrder: #${order._id.slice(-8)}\nCustomer: ${order.shippingAddress?.name}\nPhone: ${order.shippingAddress?.phone}\nTotal: ${order.totalPrice} SGD`
        // });

        return { success: true };
    } catch (error) {
        console.error("Error sending notification:", error);
        return { success: false, error: error.message };
    }
}

export async function notifyCustomerOrderConfirmed(order) {
    try {
        console.log("✅ ORDER CONFIRMED NOTIFICATION TO CUSTOMER");
        console.log(`Customer: ${order.guestEmail}`);
        console.log(`Order: #${order._id.slice(-8)}`);
        console.log(`Tracking: ${order.trackingNumber}`);

        // TODO: Send confirmation to customer via email/SMS
        
        return { success: true };
    } catch (error) {
        console.error("Error sending customer notification:", error);
        return { success: false, error: error.message };
    }
}

export async function notifyCustomerOutForDelivery(order) {
    try {
        console.log("🚚 OUT FOR DELIVERY NOTIFICATION");
        console.log(`Customer: ${order.guestEmail}`);
        console.log(`Tracking: ${order.trackingNumber}`);
        console.log(`Delivery Partner: ${order.deliveryPartner?.name} - ${order.deliveryPartner?.phone}`);

        // TODO: Send delivery notification
        
        return { success: true };
    } catch (error) {
        console.error("Error sending delivery notification:", error);
        return { success: false, error: error.message };
    }
}

// Helper to generate order notification email template
function generateOrderNotificationEmail(order) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #c78a3a;">🌸 New Order Received!</h2>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Order #${order._id.toString().slice(-8).toUpperCase()}</h3>
                <p><strong>Customer:</strong> ${order.shippingAddress?.name}</p>
                <p><strong>Phone:</strong> ${order.shippingAddress?.phone}</p>
                <p><strong>Email:</strong> ${order.guestEmail}</p>
                <p><strong>Address:</strong> ${order.shippingAddress?.street}</p>
                ${order.deliveryDate ? `<p><strong>Delivery:</strong> ${order.deliveryDate} at ${order.deliveryTime}</p>` : ""}
            </div>
            
            <h4>Order Items:</h4>
            <ul>
                ${order.items.map(item => `
                    <li>${item.name} x ${item.quantity} - ${item.price * item.quantity} SGD</li>
                `).join("")}
            </ul>
            
            <div style="background: #c78a3a; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
                <h3 style="margin: 0;">Total: ${order.totalPrice} SGD</h3>
            </div>
            
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
                Please call the customer at ${order.shippingAddress?.phone} to confirm the order.
            </p>
        </div>
    `;
}

