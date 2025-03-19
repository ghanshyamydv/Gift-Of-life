const recipientApproval= (email, fullName) => ({
    from: "yghanu9819@gmail.com",
    to: email,
    subject: "Thank You for Registering as a Recipient with Gift of Life 🎉",
    text: `Dear ${fullName}, thank you for registering as a recipient with Gift of Life. Your application is currently pending approval. We will notify you once it has been reviewed. Thank you for trusting us to support you on your journey.`,
    html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align: center;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="background-color: rgba(0, 74, 99, 0.842); padding: 20px; border-radius: 10px 10px 0 0;">
                    <h1 style="color: #ffffff; margin: 0;">Thank You for Registering! 🎉</h1>
                </div>

                <!-- Body -->
                <div style="padding: 20px;">
                    <h2 style="color: #333333;">Your Registration is Pending Approval</h2>
                    <p style="color: #555555; line-height: 1.6;">
                        Dear ${fullName}, thank you for registering as a recipient with <strong>Gift of Life</strong>. We are honored to be part of your journey. 🌟
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        Your application is currently being reviewed by our team. This process typically takes <strong>1-2 business days</strong>. We will notify you as soon as your registration is approved. ⏳
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        <strong>What Happens Next?</strong><br>
                        - Once approved, you will be able to log in and view all available donors. 👥<br>
                        - You can connect with donors who are ready to help. 💖<br>
                        - Our team will guide you every step of the way. 🤝
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        Thank you for trusting us to support you. We are committed to helping you on this journey. 🌍
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@giftoflife.org" style="color: rgba(0, 74, 99, 0.842); text-decoration: none;">support@giftoflife.org</a>.
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

export default recipientApproval;