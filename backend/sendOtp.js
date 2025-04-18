import { response } from "express";
import nodemailer from "nodemailer";
import User from "./models/user.model.js";
// Temporary OTP storage (Use Redis or DB in production)
const otpStorage = {otp:null};
let userStorage="";

const sendOtp=async(req,res)=>{
    // 1️⃣ **If OTP verification is requested**
    if (req.body.otp) {
        console.log(req.body.otp, typeof(req.body.otp));
        
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
            
            const receiver = {
                from: "yghanu9819@gmail.com",
                to: req.body.email,
                subject: "Your One-Time Password (OTP) for resetting your Gift of Life account password",
                text: `Your OTP for resetting GiftofLife account password is: ${newOtp}`,
                html: `
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px;">
                        <!-- Header -->
                        <div style="text-align: center; padding: 20px 0; background: rgba(0, 74, 99, 0.842); color: white; border-radius: 10px 10px 0 0;">
                            <h1 style="margin: 0; font-size: 28px;">Gift of Life</h1>
                            <p style="margin: 5px 0 0; font-size: 16px;">Password Reset Request</p>
                        </div>
            
                        <!-- Content -->
                        <div style="padding: 20px;">
                            <p style="font-size: 16px; color: #333;">Hello,</p>
                            <p style="font-size: 16px; color: #333;">You have requested to reset your Gift of Life account password. Please use the OTP below to proceed:</p>
                            
                            <!-- OTP Box -->
                            <div style="text-align: center; margin: 20px 0;">
                                <div style="font-size: 28px; font-weight: bold; background: #f8f8f8; padding: 15px; display: inline-block; border-radius: 5px; letter-spacing: 5px; color: rgba(0, 74, 99, 0.842);">
                                    ${newOtp}
                                </div>
                            </div>
            
                            <p style="font-size: 16px; color: #333;">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
                            <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
                        </div>
            
                        <!-- Footer -->
                        <div style="text-align: center; padding: 15px; background: #f8f8f8; border-radius: 0 0 10px 10px; font-size: 14px; color: #777;">
                            <p style="margin: 0;">&copy; 2023 Gift of Life. All rights reserved.</p>
                            <p style="margin: 5px 0 0;">This is an automated message, please do not reply.</p>
                        </div>
                    </div>
                `,
            };

            transporter.sendMail(receiver,(error, emailResponse)=>{
                if(error){
                    throw error;
                }
                // console.log(emailResponse);
                if(otpStorage.otp){
                    setTimeout(()=>{
                        otpStorage.otp=null;                        
                    },600000)
                }
                
                res.status(200).json({
                    success:true,
                    message:"OTP sent successfully!"
                })
            })     
        }catch(err){
            res.status(401).json({
                success:false,
                message:"User Doesn't Exist"
            })
        }
    }
    
}

export default sendOtp;