const donorRejection = (email, fullName) => ({
    from: "yghanu9819@gmail.com",
    to: email,
    subject: "Update on Your Donor Registration with Gift of Life",
    text: `Dear ${fullName}, we regret to inform you that your donor registration with Gift of Life has been rejected. If you have any questions or would like further clarification, please contact us at support@giftoflife.org. Thank you for your interest in making a difference.`,
    html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align: center;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="background-color: rgba(0, 74, 99, 0.842); padding: 20px; border-radius: 10px 10px 0 0;">
                    <h1 style="color: #ffffff; margin: 0;">Update on Your Donor Registration</h1>
                </div>

                <!-- Body -->
                <div style="padding: 20px;">
                    <h2 style="color: #333333;">Your Registration Has Been Rejected</h2>
                    <p style="color: #555555; line-height: 1.6;">
                        Dear ${fullName}, we regret to inform you that your donor registration with <strong>Gift of Life</strong> has been rejected after careful review. 😔
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        We understand that this news may be disappointing, and we sincerely appreciate your willingness to make a difference and save lives. ❤️
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        <strong>Why Was My Registration Rejected?</strong><br>
                        - Your application did not meet our eligibility criteria. 📋<br>
                        - There may have been incomplete or inaccurate information provided. 🖊️<br>
                        - Our team may have identified concerns during the review process. 🔍
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        If you have any questions or would like further clarification, please feel free to contact us at <a href="mailto:support@giftoflife.org" style="color: rgba(0, 74, 99, 0.842); text-decoration: none;">support@giftoflife.org</a>. We are here to assist you. 🤝
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        Thank you again for your interest in <strong>Gift of Life</strong>. We encourage you to explore other ways to support our mission and make a positive impact. 🌍
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

export default donorRejection;