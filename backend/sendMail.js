import nodemailer from "nodemailer";

const sendMail=async(receiver)=>{
            
            const transporter = nodemailer.createTransport({
                service:"gmail",
                port: 465,
                secure: true, // true for port 465, false for other ports
                auth: {
                user: "yghanu9819@gmail.com",
                pass: "iqkn czxl gfiq uqzc",
                },
            });
            

            // Send the email
            await transporter.sendMail(receiver);
        
    
}

export default sendMail;