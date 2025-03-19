const recipientApproved = (email, fullName) => ({
    from: "yghanu9819@gmail.com",
    to: email,
    subject: "🎉 Congratulations! You Are Approved as a Recipient 🎉",
    text: `Dear ${fullName}, we are pleased to inform you that your registration as a recipient with Gift of Life has been approved. You can now log in and view all available donors. Thank you for trusting us to help you on your journey.`,
    html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align: center;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="background-color: rgba(0, 74, 99, 0.842); padding: 20px; border-radius: 10px 10px 0 0;">
                    <h1 style="color: #ffffff; margin: 0;">🎉 Congratulations! 🎉</h1>
                </div>

                <!-- Body -->
                <div style="padding: 20px;">
                    <h2 style="color: #333333;">You Are Approved as a Recipient</h2>
                    <p style="color: #555555; line-height: 1.6;">
                        Dear ${fullName}, we are thrilled to inform you that your registration as a recipient with <strong>Gift of Life</strong> has been approved. 🎊
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        You are now part of our community, and we are here to support you on your journey. 🌟
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        <strong>What's Next?</strong><br>
                        - You can now log in and view all available donors. 👥<br>
                        - Explore opportunities to connect with donors who can help. 💖<br>
                        - Reach out to us if you have any questions or need assistance. 📧
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        Your trust in us means the world, and we are committed to helping you every step of the way. 🌍
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        Thank you for choosing Gift of Life. Let's take this journey together! 🙌
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        If you have any questions, feel free to contact us at <a href="mailto:support@giftoflife.org" style="color: rgba(0, 74, 99, 0.842); text-decoration: none;">support@giftoflife.org</a>.
                    </p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f1f1f1; padding: 15px; border-radius: 0 0 10px 10px;">
                    <p style="color: #777777; font-size: 14px; margin: 0;">
                        &copy; 2023 Gift of Life. All rights reserved.<br>
                        Contact us at <a href="mailto:support@giftoflife.org" style="color: rgba(0, 74, 99, 0.842); text-decoration: none;">support@giftoflife.org</a>
                    </p>
                </div>
            </div>
        </div>
    `,
});

export default recipientApproved;