// Order Confirmation Email Template
export function orderConfirmationTemplate(orderDetails) {
    const { _id, items, totalPrice, shippingAddress, createdAt, user, guestEmail } = orderDetails;
    const customerName = user?.name || shippingAddress?.name || 'Customer';
    const customerEmail = user?.email || guestEmail;

    const itemsHtml = items.map(item => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
                ${item.name}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
                ${item.quantity}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
                $${(item.price * item.quantity).toFixed(2)}
            </td>
        </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #c78a3a 0%, #d6a35a 100%); padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Dazzling Sky</h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">Order Confirmation</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #333; font-size: 24px;">Thank you, ${customerName}!</h2>
                            <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.5;">
                                Your order has been confirmed and will be shipped soon.
                            </p>
                            
                            <!-- Order Info -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; background-color: #f9f9f9; border-radius: 6px; padding: 15px;">
                                <tr>
                                    <td style="padding: 5px 0;">
                                        <strong style="color: #333;">Order ID:</strong>
                                        <span style="color: #666;">#${_id.toString().slice(-8).toUpperCase()}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0;">
                                        <strong style="color: #333;">Order Date:</strong>
                                        <span style="color: #666;">${new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Items -->
                            <h3 style="margin: 30px 0 15px 0; color: #333; font-size: 18px;">Order Items</h3>
                            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #eee; border-radius: 6px; overflow: hidden;">
                                <thead>
                                    <tr style="background-color: #f5f5f5;">
                                        <th style="padding: 12px; text-align: left; color: #333; font-weight: 600;">Item</th>
                                        <th style="padding: 12px; text-align: center; color: #333; font-weight: 600;">Qty</th>
                                        <th style="padding: 12px; text-align: right; color: #333; font-weight: 600;">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${itemsHtml}
                                </tbody>
                            </table>
                            
                            <!-- Total -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                                <tr>
                                    <td style="text-align: right; padding: 10px 0;">
                                        <strong style="color: #333; font-size: 18px;">Total:</strong>
                                        <span style="color: #c78a3a; font-size: 24px; font-weight: bold; margin-left: 10px;">$${totalPrice.toFixed(2)}</span>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Shipping Address -->
                            <h3 style="margin: 30px 0 15px 0; color: #333; font-size: 18px;">Delivery Address</h3>
                            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; color: #666; line-height: 1.6;">
                                ${shippingAddress.address}<br>
                                ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}<br>
                                ${shippingAddress.country}
                            </div>
                            
                            <!-- Support -->
                            <p style="margin: 30px 0 0 0; color: #666; font-size: 14px; line-height: 1.5;">
                                Questions? Contact us at <a href="mailto:support@dazzlingsky.com" style="color: #c78a3a; text-decoration: none;">support@dazzlingsky.com</a>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f5f5f5; padding: 20px; text-align: center;">
                            <p style="margin: 0; color: #999; font-size: 12px;">
                                © 2025 Dazzling Sky. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}

// Welcome Email Template
export function welcomeEmailTemplate(userName) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Dazzling Sky</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #c78a3a 0%, #d6a35a 100%); padding: 40px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px;">Welcome to Dazzling Sky! 🌸</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #333; font-size: 24px;">Hi ${userName}!</h2>
                            <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.6;">
                                Thank you for joining Dazzling Sky! We're thrilled to have you as part of our community.
                            </p>
                            <p style="margin: 0 0 30px 0; color: #666; font-size: 16px; line-height: 1.6;">
                                Your account has been created successfully. You can now:
                            </p>
                            
                            <!-- Benefits -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                                <tr>
                                    <td style="padding: 15px; background-color: #f9f9f9; border-radius: 6px; margin-bottom: 10px;">
                                        <strong style="color: #c78a3a; font-size: 18px;">🛍️</strong>
                                        <span style="color: #333; margin-left: 10px; font-size: 16px;">Browse our premium flower collection</span>
                                    </td>
                                </tr>
                                <tr><td style="height: 10px;"></td></tr>
                                <tr>
                                    <td style="padding: 15px; background-color: #f9f9f9; border-radius: 6px;">
                                        <strong style="color: #c78a3a; font-size: 18px;">📦</strong>
                                        <span style="color: #333; margin-left: 10px; font-size: 16px;">Track your orders easily</span>
                                    </td>
                                </tr>
                                <tr><td style="height: 10px;"></td></tr>
                                <tr>
                                    <td style="padding: 15px; background-color: #f9f9f9; border-radius: 6px;">
                                        <strong style="color: #c78a3a; font-size: 18px;">💝</strong>
                                        <span style="color: #333; margin-left: 10px; font-size: 16px;">Save your favorite items</span>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="http://localhost:3000/products" style="display: inline-block; padding: 15px 40px; background-color: #c78a3a; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600;">
                                            Start Shopping
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Support -->
                            <p style="margin: 30px 0 0 0; color: #666; font-size: 14px; line-height: 1.5; text-align: center;">
                                Need help? We're here for you!<br>
                                <a href="mailto:support@dazzlingsky.com" style="color: #c78a3a; text-decoration: none;">support@dazzlingsky.com</a>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f5f5f5; padding: 20px; text-align: center;">
                            <p style="margin: 0; color: #999; font-size: 12px;">
                                © 2025 Dazzling Sky. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}
