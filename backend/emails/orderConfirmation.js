const orderConfirmationEmail = (email, name, orderId, product, orderDate, totalPrice, address, quantity) => ({
    from: "yghanu9819@gmail.com",
    to: email,
    subject: "Your Gift of Life Store Order Confirmation",
    text: `Thank you for your purchase! Your order has been confirmed. Every purchase supports the Gift of Life Organ Donation Platform. Order Details: ${name}`,
    html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px;">
            <!-- Header -->
            <div style="text-align: center; padding: 20px 0; background: rgba(0, 74, 99, 0.842); color: white; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0; font-size: 28px;">Gift of Life Store</h1>
                <p style="margin: 5px 0 0; font-size: 16px;">Thank You for Supporting Organ Donation Awareness</p>
            </div>

            <!-- Content -->
            <div style="padding: 20px;">
                <p style="font-size: 16px; color: #333;">Hello ${name},</p>
                <p style="font-size: 16px; color: #333;">Thank you for your purchase! Your order has been confirmed, and every rupee spent helps support the Gift of Life Organ Donation Platform. Together, we are spreading awareness and saving lives.</p>
                
                <!-- Product Image -->
                <div style="text-align: center; margin: 20px 0;">
                     <img src="${product.image.url}" alt="Product Image" style="max-width: 50%; height: auto; border-radius: 10px; border: 1px solid #e0e0e0;">
                </div>

                <!-- Order Summary -->
                <div style="margin: 20px 0; padding: 15px; background: #f8f8f8; border-radius: 5px;">
                    <h3 style="margin: 0 0 10px; font-size: 20px; color: rgba(0, 74, 99, 0.842);">Order Summary</h3>
                    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Order ID:</strong> ${orderId}</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Date:</strong> ${orderDate}</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Product Name:</strong> ${product.name}</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Total Amount:</strong> ₹${product.price} X ${quantity} = ₹${totalPrice}</p>
                    <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Shipping and Billing Address:</strong> ${address}</p>
                </div>

                <!-- Call to Action -->
                <div style="text-align: center; margin: 20px 0;">
                    <a href="http://localhost:5173/donate-life-store" style="display: inline-block; padding: 10px 20px; background: rgba(0, 74, 99, 0.842); color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Continue Shopping</a>
                </div>

                <p style="font-size: 16px; color: #333;">If you have any questions about your order, please contact us at <a href="mailto:support@giftoflife.org" style="color: rgba(0, 74, 99, 0.842); text-decoration: none;">support@giftoflife.org</a>.</p>
                <p style="font-size: 16px; color: #333;">Thank you for being a part of our mission to save lives through organ donation awareness.</p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 15px; background: #f8f8f8; border-radius: 0 0 10px 10px; font-size: 14px; color: #777;">
                <p style="margin: 0;">&copy; 2023 Gift of Life. All rights reserved.</p>
                <p style="margin: 5px 0 0;">This is an automated message, please do not reply.</p>
            </div>
        </div>
    `,
});

export default orderConfirmationEmail;