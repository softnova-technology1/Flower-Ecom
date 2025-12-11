import nodemailer from 'nodemailer';

// Check if email is configured
const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;

// Create transporter only if configured
let transporter = null;

if (isEmailConfigured) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Verify connection
    transporter.verify((error) => {
        if (error) {
            console.warn('⚠️  Email not configured properly. Emails will be skipped.');
            console.warn('   To enable emails, update EMAIL_USER and EMAIL_PASSWORD in .env.local');
        } else {
            console.log('✅ Email server ready');
        }
    });
} else {
    console.warn('⚠️  Email credentials not configured. Emails will be skipped.');
    console.warn('   Add EMAIL_USER and EMAIL_PASSWORD to .env.local to enable emails.');
}

// Send email function
export async function sendEmail({ to, subject, html }) {
    // Skip if email not configured
    if (!transporter) {
        console.log('📧 Email skipped (not configured):', subject);
        return { success: false, error: 'Email not configured' };
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'Dazzling Sky <noreply@dazzlingsky.com>',
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        return { success: false, error: error.message };
    }
}
