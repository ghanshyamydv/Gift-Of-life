const confirmDonation = ({email, donorName, organName, recipientName, otp}) => ({
    from: "yghanu9819@gmail.com",
    to: email,
    subject: `🔒 Please Confirm Your Donation of ${organName}`,

    text: `Dear ${donorName}, we are reaching out to confirm your donation of ${organName} to ${recipientName}. 

Your OTP is: ${otp}

Please forward this OTP to this email address to complete verification. 

If you have any questions, feel free to contact us at +91-9876543210 or email support@giftoflife.org.`,

    html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align: center;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="background-color: #004a63; padding: 20px; border-radius: 10px 10px 0 0;">
                    <h2 style="color: #ffffff; margin: 0;">🔒 Confirm Your Donation</h2>
                </div>

                <!-- Body -->
                <div style="padding: 20px;">
                    <p style="color: #333333; font-size: 16px; line-height: 1.6;">
                        Dear <strong>${donorName}</strong>,
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        We are reaching out to confirm that you have donated your <strong>${organName}</strong> to <strong>${recipientName}</strong>.
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        To confirm this action, please use the following OTP:
                    </p>
                    <div style="background-color: #e0f7fa; display: inline-block; padding: 15px 30px; border-radius: 8px; margin: 10px 0; font-size: 24px; font-weight: bold; color: #004a63;">
                        ${otp}
                    </div>
                    <p style="color: #555555; line-height: 1.6;">
                        Kindly forward this OTP to this email to complete the verification process.
                    </p>
                    <p style="color: #555555; line-height: 1.6;">
                        If you have any questions or if this message was sent in error, please contact us.
                    </p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f1f1f1; padding: 15px; border-radius: 0 0 10px 10px;">
                    <p style="color: #777777; font-size: 14px; margin: 0;">
                        📧 Email: <a href="mailto:support@giftoflife.org" style="color: #004a63; text-decoration: none;">support@giftoflife.org</a><br>
                        📞 Phone: +91-9876543210<br>
                        &copy; 2023 Gift of Life. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    `,
});

export default confirmDonation;