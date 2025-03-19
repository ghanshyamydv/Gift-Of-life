import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

import Donor from "./models/donor.model.js";
import Recepient from "./models/recipient.model.js";
import User from "./models/user.model.js"
import NewsEvent from "./models/newsevent.model.js";
import multer from "multer";
// import { storage } from "./cloudinary.js";
import expressError from "./utils/expressError.js"
import passport from "./passportConfig.js";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import sendOtp from "./sendOtp.js";
import Story from "./models/story.model.js";
import Order from "./models/order.model.js";
import Product from "./models/product.model.js";
import storyValidationSchema from "./validation_schemas/validateStory.js";
import wrapAsync from "./utils/wrapAsync.js";
import Recipient from "./models/recipient.model.js";
import sendMail from "./sendMail.js";

import donorApproval from "./emails/donorApprovalEmail.js";
import donorApproved from "./emails/donorApprovedEmail.js";
import donorRejection from "./emails/donorRejectedEmail.js";

import recipientApproval from "./emails/recipientApprovalEmail.js";
import recipientApproved from "./emails/recipientApprovedEmail.js";
import recipientRejection from "./emails/recipientRejectedEmail.js";
import orderConfirmationEmail from './emails/orderConfirmation.js';
import Admin from "./models/admin.model.js";
const app = express();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images'); // Store files in the "uploads" folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Rename files to avoid collisions
    }
  });
//middlewares----------------------------
app.use(cors());
app.use(express.json());
// Serve static files from the "images" folder
app.use('/images', express.static(path.join(__dirname, 'images')));
// Initialize Passport Middleware
app.use(passport.initialize());

//database connection----------------------------
// const atlasdbURL = process.env.ATLASDB_URL;
const atlasdbURL = "mongodb://localhost:27017/GiftOfLife";
db()
  .then((res) => console.log("Database connection sucessful"))
  .catch((err) => console.log(err));

async function db() {
  await mongoose.connect(atlasdbURL);
}
//---------------------------------------------
const upload = multer({ storage });

// app.get("/api", (req, res) => {
//   const data = {
//     name: "mohan",
//     age: 18,
//   };
//   try {
//     // Simulate data fetching
//     res.status(200).json(data);
//   } catch (err) {
//     next(err); // Pass error to middleware
//   }
// });

app.post(
  "/api/donor-register",
  passport.authenticate('jwt', { session: false }),
  upload.fields([
    { name: "photo", maxCount: 1 }, // Field name for photo, max 1 file
    { name: "citizenship", maxCount: 1 }, // Field name for citizenship, max 1 file
  ]),
  wrapAsync(
    async (req, res, next) => {
      const userId = req.user._id;
      // const photoUrl = req.files.photo[0].path;
      const photoFilename = req.files.photo[0].filename;
      const photoUrl = `http://localhost:4000/images/${photoFilename}`;
  
      // const citizenshipUrl = req.files.citizenship[0].path;
      const citizenshipFilename = req.files.citizenship[0].filename;
      const citizenshipUrl = `http://localhost:4000/images/${citizenshipFilename}`;
  
      const newDonor = new Donor({
        ...req.body,
        photo: { fileName: photoFilename, url: photoUrl },
        citizenship: { fileName: citizenshipFilename, url: citizenshipUrl },
        userId
      });
      await newDonor.save();
      const {email, fullName}=newDonor;
      sendMail(donorApproval(email, fullName));
      res.status(200).json({
        success: true,
        message: 'Thank you for registering as donor please wait for approval!',
      });
    }
  ) 
);

app.post(
  "/api/recipient-register",
  passport.authenticate('jwt', { session: false }),
    upload.fields([
    { name: "photo", maxCount: 1 },          // Field name for photo, max 1 file
    { name: "citizenship", maxCount: 1 },    // Field name for citizenship, max 1 file
    { name: "hospitalDocs", maxCount: 1 }    // Field name for hospital documents 1 file
  ]),
  wrapAsync(
    async (req, res, next) =>{
      const userId = req.user._id;
      // const photoUrl = req.files.photo[0].path;
      const photoFilename = req.files.photo[0].filename;
      const photoUrl = `http://localhost:4000/images/${photoFilename}`;
  
      // const citizenshipUrl = req.files.citizenship[0].path;
      const citizenshipFilename = req.files.citizenship[0].filename;
      const citizenshipUrl = `http://localhost:4000/images/${citizenshipFilename}`;

      // const hospitalDocsUrl = req.files.hospitalDocs[0].path;
      const hospitalDocsFilename = req.files.hospitalDocs[0].filename;
      const  hospitalDocsUrl = `http://localhost:4000/images/${hospitalDocsFilename}`;
      
  

      const newRecepient = new Recepient({
        ...req.body,
        photo: { fileName: photoFilename, url: photoUrl },
        citizenship: { fileName: citizenshipFilename, url: citizenshipUrl },
        hospitalDocs: { fileName: hospitalDocsFilename, url: hospitalDocsUrl },
        userId
      });
      await newRecepient.save();
      const {email, fullName}=newRecepient;
      sendMail(recipientApproval(email,fullName));
      res.status(200).json({
        success: true,
        message: 'Must Welcome you have registered as recipient i hope you will get your organ soon wait for approval!',
      });
    }
  )
);

//---------------------------------

app.post("/api/signup", wrapAsync(
  async (req, res, next) =>{  
    const newUser = new User(req.body);
    await newUser.save()
    
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
          username: newUser.username, // Use saved user data
          id: newUser._id, // Correct way to get the user ID
      },
  });
}
));

app.post("/api/login", (req, res, next)=>{
  
  User.findOne({username:req.body.username})
  .then(user=>{
    // No user found
    if(!user){
      return res.status(401).json({
        success:false,
        message:"Invalid Username"
      })
    }

    // Incorrect Password
    if(!compareSync(req.body.password, user.password)){
      return res.status(401).json({
        success:false,
        message:"Invalid Password"
      })
    }

    const payload={
      username:user.username,
      id:user._id
    }
    const token=jwt.sign(payload,"Ghanu", {expiresIn:"1d"})
    return res.status(200).json({
      success:true,
      message:"Logged in Successfully!",
      token:"Bearer "+ token
    })
  })
}
);

app.get('/api/auth/verify', passport.authenticate('user-jwt', { session: false }), (req, res) => {
  console.log("u",req.user);
  res.json({ valid: true,user:req.user }); // Token is valid
});

app.post("/api/resetpassword",sendOtp);
app.post("/api/setnewpassword/:id",wrapAsync(
  async (req,res ,next)=>{
    const {id}=req.params;
    const {password}=req.body;
    const updatedUser=await User.findByIdAndUpdate(id,{password},{new:true,runValidators: true})
    await updatedUser.save();
    res.status(200).json({
      success:true,
      message:"Password changed successfully!"
    }) 
  }
));

app.post("/api/create-story", passport.authenticate('user-jwt', { session: false }), upload.single('image'), wrapAsync(
  async (req,res,next)=>{
    const userId = req.user._id;
    // const url = req.file.path;
    const fileName = req.file.filename;
    const  url = `http://localhost:4000/images/${fileName}`;
      const isValidStory=await storyValidationSchema.validate({...req.body,image:{url,fileName},userId});
      const newStory=new Story({...req.body,image:{url,fileName},userId})
      await newStory.save();
      res.status(200).json({
        success:true,
        message:"Story Create Successfully!"
      }) 
    } 
  
));

app.get("/api/approved-stories", wrapAsync(
  async (req,res, next)=>{
    const stories=await Story.find({status:"approved"});
    res.status(200).json({stories,success:true});
}
));

app.get('/api/orders', wrapAsync(
  async(req, res,next) => {
 
    const orders=await Order.find().populate('product');;
    res.status(200).json({orders}); 
  
}
));

app.patch('/api/orders/:id/deliver', wrapAsync(
  async(req, res, next) => {
    const order=await Order.findByIdAndUpdate(req.params.id,{status:"Delivered"});
    res.status(200).json({success:true,order}); 
  }
));

app.delete('/api/orders/:id', wrapAsync(
  async(req, res, next) => {
    const cancledOrder=await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({success:true, cancledOrder, message:"Your order has been cancled!"}); 
  }
));

app.get('/api/products/search', wrapAsync(
  async(req, res, next) => {
    const query = req.query.q ? req.query.q.toLowerCase().split(" ").join("") : ''; 
    const products=await Product.find();
    
    const results = products.filter((item) =>
      item.name.toLowerCase().split(" ").join("").includes(query)
    );
    res.status(200).json({success:true, results}); 
  }
));

app.get('/api/:id/profile', wrapAsync(
  async(req, res, next) => {
    const user=await User.findById(req.params.id);
    res.status(200).json(user); 
  }
));

app.post('/api/:id/profile',upload.single("profileImage"),wrapAsync(
  async(req, res, next) => {
    console.log(req.file);
    
    const id =req.params.id;
    const fileName = req.file.filename;
    // const url =req.file.path;
    const url = `http://localhost:4000/images/${fileName}`;
    
    const updatedUser=await User.findByIdAndUpdate(id,{profileImage:{url,fileName}});
    res.status(200).json({
      success:true,
      message:"Profile pic updated successfully!",
      updatedUser
    }) 
  }
));

app.get("/api/donor-stories/:id", wrapAsync(
  async (req,res, next)=>{
    const story=await Story.findById(req.params.id);
    res.status(200).json({story,success:true}) 
  }
));

app.get("/api/recipient-stories/:id", wrapAsync(
  async (req,res, next)=>{
    const story=await Story.findById(req.params.id);
    res.status(200).json({story,success:true}) 
  }
));

app.get("/api/donor-story/:id", wrapAsync(
  async (req,res, next)=>{
    const story=await Story.findOne({userId:req.params.id});
    res.status(200).json({story,success:true}) 
  }
));

app.get("/api/recipient-story/:id", wrapAsync(
  async (req,res, next)=>{
    const story=await Story.findOne({userId:req.params.id});
    res.status(200).json({story,success:true}) 
  }
));

app.post('/api/:id/buy', wrapAsync(
  async(req, res, next) => {
    const {id}=req.params;
    
    const orderCreated=new Order({...req.body, product:id,status:"Confirmed"});
    
    // Save the order to the database
    await orderCreated.save();
    const order=await Order.findById(orderCreated._id).populate("product");
    
    // Combine order and product details
    // const order = {
    //   ...orderCreated.toObject(), // Convert Mongoose document to a plain object
    //   productDetail: productDetail
    // };
    const {email,name, _id:orderId, product,createdAt:orderDate, totalPrice, address, quantity}=order;
    sendMail(orderConfirmationEmail(email,name, orderId, product, orderDate, totalPrice, address, quantity))
    
    res.status(200).json({
      success:true,
      order,
      message:"Your order has been placed successfully!"
    }); 
  }
));

app.get("/api/donors", wrapAsync(
  async (req,res, next)=>{
    const donors=await Donor.find({status:"approved"});
    res.status(200).json({donors,success:true}) 
  }
));

app.get("/api/recipients", wrapAsync(
  async (req,res, next)=>{
    const recipients=await Recipient.find({status:"approved"});
    res.status(200).json({recipients,success:true}) 
  }
));

app.get('/api/donors/search', wrapAsync(
  async(req, res, next) => {
    const query = req.query.q ? req.query.q.toLowerCase().split(" ").join("") : ''; 
    const donors=await Donor.find();
    
    const results = donors?.filter((donor) =>{
      const organTissues=donor.organsAndTissues[0]?.selectedOrgans.join(", ")+donor.organsAndTissues[0]?.otherOrganTissue;
      
      if(donor.fullName.toLowerCase().split(" ").join("").includes(query)){
        return donor;
      }else if(organTissues.toLowerCase().split(" ").join("").includes(query)){
        return donor;
      }
    }
    );
    res.status(200).json({success:true, results}); 
  }
));

app.get('/api/recipients/search', wrapAsync(
  async(req, res, next) => {
    const query = req.query.q ? req.query.q.toLowerCase().split(" ").join("") : ''; 
    const recipients=await Recipient.find();
    
    const results = recipients?.filter((recipient) =>{
      const organTissues=recipient.organsAndTissues[0]?.selectedOrgans.join(", ")+recipient.organsAndTissues[0]?.otherOrganTissue;
      
      if(recipient.fullName.toLowerCase().split(" ").join("").includes(query)){
        return recipient;
      }else if(organTissues.toLowerCase().split(" ").join("").includes(query)){
        return recipient;
      }
    }
    );
    res.status(200).json({success:true, results}); 
  }
));

app.get("/api/donor-registered/:id", wrapAsync(
  async (req,res, next)=>{
    const donor=await Donor.findOne({userId:req.params.id});
    if(donor){
      res.status(200).json({success:true, isRegistered:true}) 
    }else{
      res.status(200).json({success:true, isRegistered:false}) 
    }
  }
));

app.get("/api/recipient-registered/:id", wrapAsync(
  async (req,res, next)=>{
    const recipient=await Recipient.findOne({userId:req.params.id});
    if(recipient){
      res.status(200).json({success:true, isRegistered:true}) 
    }else{
      res.status(200).json({success:true, isRegistered:false}) 
    }
  }
));

//admin routes
app.get("/api/admin/newsandevents", wrapAsync(
  async (req,res, next)=>{
    const newsAndEvents=await NewsEvent.find();
    const news=newsAndEvents.filter((newNewsEvent)=>newNewsEvent.category==="news");
    const events=newsAndEvents.filter((newNewsEvent)=>newNewsEvent.category==="event");
    res.status(200).json({news, events, newsAndEvents})
  }
))

app.get("/api/admin/newsandevent/:id", wrapAsync(
  async (req,res, next)=>{
    const {id}=req.params;
    const newsAndEvent=await NewsEvent.findById(id);
    res.status(200).json({newsAndEvent})
  }
))

app.post("/api/admin/newsandevents", wrapAsync(
  async (req,res, next)=>{
    const newNewsEvent=new NewsEvent(req.body)
    await newNewsEvent.save()
    res.status(200).json({
      success:true,
      message:"News or Event created successfully!"
    })
  }
))

app.patch("/api/admin/newsandevents/:id/edit", wrapAsync(
  async (req,res, next)=>{
    const {id}=req.params;
    const updatedNewsOrEvent= await NewsEvent.findByIdAndUpdate(id,req.body);
    await updatedNewsOrEvent.save()
    res.status(200).json({
      success:true,
      message:`News or Event Updated Successfully! ${updatedNewsOrEvent}`
    })
  }
))

app.delete("/api/admin/newsandevents/:id/delete", wrapAsync(
  async (req,res, next)=>{
    const {id}=req.params;
    const deletedNewsOrEvent= await NewsEvent.findByIdAndDelete(id);
    res.status(200).json({
      success:true,
      message:`News or Event Deleted Successfully! ${deletedNewsOrEvent}`
    })
  }
))

app.post("/api/admin/product",upload.single('image'), wrapAsync(
  async (req,res, next)=>{
    // const url = req.file.path;
    const fileName = req.file.filename;
    const  url = `http://localhost:4000/images/${fileName}`;
    const newProduct=new Product({...req.body, image:{url,fileName}})
    await newProduct.save()
    res.status(200).json({
      success:true,
      message:"News or Event created successfully!"
    })
  }
))

app.get("/api/admin/product", wrapAsync(
  async (req,res, next)=>{
    const products =await Product.find();
    res.status(200).json({
      success:true,
      products
    })
  }
))

app.get("/api/admin/product/:id", wrapAsync(
  async (req,res, next)=>{
    const {id}=req.params;
    const product =await Product.findById(id);
    res.status(200).json({
      success:true,
      product
    })
  }
))


app.get("/api/admin/review-stories", wrapAsync(
  async (req,res, next)=>{
    const reviewStory=await Story.find({status:"pending"});
    res.status(200).json({
      reviewStory,
      success:true,
      message:"Story reviewed successfully!"
    }) 
  }
));

app.patch("/api/admin/review-stories/:id/approve", wrapAsync(
  async (req,res, next)=>{
    const approvedStory=await Story.findByIdAndUpdate(req.params.id,{status:"approved"});
    res.status(200).json({
      success:true,
      message:"Story reviewed successfully!"
    }) 
  }
));

app.patch("/api/admin/review-stories/:id/reject", wrapAsync(
  async (req,res, next)=>{
    const approvedStory=await Story.findByIdAndUpdate(req.params.id,{status:"rejected"});
    res.status(200).json({
      success:true,
      message:"Story reviewed successfully!"
    }) 
  }
));

// app.delete("/api/admin/review-stories/:id", wrapAsync(
//   async (req,res)=>{
//     const deletedStory=await Story.findByIdAndDelete(req.params.id);
//     res.status(200).json({
//       deletedStory,
//       success:true,
//       message:"Story Deleted successfully!"
//     }) 
//   }
// ));

app.get("/api/admin/review-donors", wrapAsync(
  async (req,res, next)=>{
    const donors=await Donor.find({status:"pending"});
    res.status(200).json({
      donors,
      success:true
    }) 
  }
));


app.patch("/api/admin/review-donor/:id/approve", wrapAsync(
  async (req,res, next)=>{
    const approvedDonor=await Donor.findByIdAndUpdate(req.params.id, {status:"approved"});
    const {email, fullName}=approvedDonor;
    sendMail(donorApproved(email, fullName));
    res.status(200).json({
      success:true,
      message:"You are approved successfully!"
    }) 
  }
));

app.patch("/api/admin/review-donor/:id/reject", wrapAsync(
  async (req,res, next)=>{
    const rejectedDonor=await Donor.findByIdAndUpdate(req.params.id, {status:"rejected"});
    const {email, fullName}=rejectedDonor;
    sendMail(donorRejection(email, fullName));
    res.status(200).json({
      success:true,
      message:"You are rejected!"
    }) 
  }
));

// route for recipients approval
app.get("/api/admin/review-recipients", wrapAsync(
  async (req,res, next)=>{
    const recipients=await Recipient.find({status:"pending"});
    res.status(200).json({
      recipients,
      success:true
    }) 
  }
));


app.patch("/api/admin/review-recipient/:id/approve", wrapAsync(
  async (req,res, next)=>{
    const approvedRecipient=await Recipient.findByIdAndUpdate(req.params.id, {status:"approved"});
    const {email, fullName}=approvedRecipient;
    sendMail(recipientApproved(email, fullName));
    res.status(200).json({
      success:true,
      message:"You are approved successfully!"
    }) 
  }
));

app.patch("/api/admin/review-recipient/:id/reject", wrapAsync(
  async (req,res, next)=>{
    const rejectedRecipient=await Recepient.findByIdAndUpdate(req.params.id, {status:"rejected"});
    const {email, fullName}=rejectedRecipient;
    sendMail(recipientRejection(email, fullName));
    res.status(200).json({
      success:true,
      message:"You are rejected!"
    }) 
  }
));

// app.get("/api/admin/signup",async (req,res,next)=>{
//   const newAdmin=new Admin({username:"ghanshyam",password:"Ghanu@9862#",email:"yghanu9819@gmail.com"});
//   await newAdmin.save();
// })
app.post("/api/admin/login", (req, res, next)=>{
  
  Admin.findOne({username:req.body.username})
  .then(admin=>{
    // No admin found
    if(!admin){
      return res.status(401).json({
        success:false,
        message:"Invalid Username"
      })
    }

    // Incorrect Password
    if(!compareSync(req.body.password, admin.password)){
      return res.status(401).json({
        success:false,
        message:"Invalid Password"
      })
    }

    
    const payload={
      username:admin.username,
      id:admin._id
    }
    
    const adminToken=jwt.sign(payload,"AdminGhanu", {expiresIn:"1d"})
    
    return res.status(200).json({
      success:true,
      message:"Logged in Successfully!",
      adminToken:"Bearer "+ adminToken
    })
  })
}
);

app.get('/api/admin/verify', passport.authenticate('admin-jwt', { session: false }), (req, res) => {
  console.log(req.user);
  
  res.json({ valid: true,admin:req.user }); // Token is valid
});

app.all("*", (req, res, next) => {
  let err = new expressError(400, "Page Not Found!");
  next(err);
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Some Error Occurred" } = err;
  console.log(statusCode, message);
  res.status(statusCode).json({ message });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`app is listening at port ${process.env.PORT}`);
});
