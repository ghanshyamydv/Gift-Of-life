import { response } from "express";
import nodemailer from "nodemailer";
import User from "./models/user.model.js";
// Temporary OTP storage (Use Redis or DB in production)
const otpStorage = {otp:null};
let userStorage="";
const sendMail=async(req,res)=>{
    
    // 1️⃣ **If OTP verification is requested**
    if (req.body.otp) {
        if (otpStorage.otp === req.body.otp) {
            otpStorage.otp=null; // Remove OTP after successful verification
            return res.status(200).json({
                success: true,
                userId:userStorage.id,
                message: "OTP verified successfully!",
                // otp:otpStorage.otp
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "OTP is invalid or expired!",
            });
        }
    }

    if(req.body.email){
        try{
            const user=await User.findOne({email:req.body.email});
            userStorage=user;
            if(user===null){
                res.status(401).json({
                    success:false,
                    message:"User Doesn't Exist"
                })
            }
            
            const transporter = nodemailer.createTransport({
                service:"gmail",
                port: 465,
                secure: true, // true for port 465, false for other ports
                auth: {
                user: "yghanu9819@gmail.com",
                pass: "iqkn czxl gfiq uqzc",
                },
            });

            // Generate a random 6-digit OTP
            const generateOTP = () => {
                return Math.floor(100000 + Math.random() * 900000).toString();
            };
            let newOtp=generateOTP();
            otpStorage.otp = newOtp; // Store OTP temporarily
            
            const receiver={
                from:"yghanu9819@gmail.com",
                to:req.body.email,
                subject:"Your One-Time Password (OTP) for resetting your Gift of Life account password",
                text:`Your OTP for resetting GiftofLife account password is: ${newOtp}`,
                html:`
            <div style="text-align: center; font-family: Arial, sans-serif;">
                <h2>Password Reset Request</h2>
                <p>Use the OTP below to reset your GiftofLife account password:</p>
                <div style="font-size: 24px; font-weight: bold; background: #f8f8f8; padding: 10px; display: inline-block; border-radius: 5px;">${newOtp}</div>
                <p>This OTP is valid for <strong>10 minutes</strong>. Do not share it.</p>
            </div>
            `,
            }

            transporter.sendMail(receiver,(error, emailResponse)=>{
                if(error){
                    throw error;
                }
                res.status(200).json({
                    success:true,
                    message:"OTP sent successfully!"
                })
                response.end();
            })     
        }catch(err){
            res.status(401).json({
                success:false,
                message:"User Doesn't Exist"
            })
        }
    }
    
}

export default sendMail;