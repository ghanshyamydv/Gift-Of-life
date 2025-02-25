import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Donor from "./models/donor.model.js";
import Recepient from "./models/recipient.model.js";
import User from "./models/user.model.js"
import multer from "multer";
import { storage } from "./cloudinary.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "./passportConfig.js";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
const app = express();

//middlewares----------------------------
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store:MongoStore.create({mongoUrl:'mongodb://localhost:27017/GiftOfLife', collectionName:"sessions"}),
  cookie: { 
    maxAge:1000*60*60*24 
  }
}))

// Initialize Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
//database connection----------------------------
// const atlasdbURL = process.env.ATLASDB_URL;
const atlasdbURL = "mongodb://localhost:27017/GiftOfLife";
db()
  .then((res) => console.log("connection sucessful"))
  .catch((err) => console.log(err));

async function db() {
  await mongoose.connect(atlasdbURL);
}
//---------------------------------------------
const upload = multer({ storage });


app.get("/", (req, res) => {
  const data = {
    name: "mohan",
    age: 18,
  };
  try {
    // Simulate data fetching
    res.status(200).json(data);
  } catch (err) {
    next(err); // Pass error to middleware
  }
});

app.post(
  "/donor-register",
  upload.fields([
    { name: "photo", maxCount: 1 }, // Field name for photo, max 1 file
    { name: "citizenship", maxCount: 1 }, // Field name for citizenship, max 1 file
  ]),
  async (req, res, next) => {

    const photoUrl = req.files.photo[0].path;
    const photoFilename = req.files.photo[0].filename;

    const citizenshipUrl = req.files.citizenship[0].path;
    const citizenshipFilename = req.files.citizenship[0].filename;

    const newDonor = new Donor({
      ...req.body,
      photo: { filename: photoFilename, url: photoUrl },
      citizenship: { filename: citizenshipFilename, url: citizenshipUrl },
    });
    await newDonor.save();
    res.status(200).json({
      success: true,
      message: 'Data received and processed successfully',
    });
  }
);

app.post(
  "/recipient-register",
    upload.fields([
    { name: "photo", maxCount: 1 },          // Field name for photo, max 1 file
    { name: "citizenship", maxCount: 1 },    // Field name for citizenship, max 1 file
    { name: "hospitalDocs", maxCount: 1 }    // Field name for hospital documents 1 file
  ]),
  async (req, res) =>{
    
    const photoUrl = req.files.photo[0].path;
    const photoFilename = req.files.photo[0].filename;

    const citizenshipUrl = req.files.citizenship[0].path;
    const citizenshipFilename = req.files.citizenship[0].filename;

    const hospitalDocsUrl = req.files.hospitalDocs[0].path;
    const hospitalDocsFilename = req.files.hospitalDocs[0].filename;

    const newRecepient = new Recepient({
      ...req.body,
      photo: { filename: photoFilename, url: photoUrl },
      citizenship: { filename: citizenshipFilename, url: citizenshipUrl },
      hospitalDocs: { filename: hospitalDocsFilename, url: hospitalDocsUrl }
    });
    await newRecepient.save();
    res.status(200).json({
      success: true,
      message: 'Data received and processed successfully',
    });
  }
);

//---------------------------------

app.post("/signup", async (req, res) =>{  
    try{
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
    }catch(err){
      res.status(200).json({
        success: false,
        message: "Some thing went wrong",
        error:err,
    });
    }
});

app.post("/login", (req, res, next)=>{
  // passport.authenticate("local", (err, user, info)=>{
  //   if(err) return next(err);
  //   if(!user){
  //     return res.json({success:false,
  //       message:"Invalid credentials",
  //       redirectTo:"/login"
  //     });
  //   }
  //   req.logIn(user,(err)=>{
  //     if(err) return next(err);
  //     return res.json({success:true,
  //       redirectTo:"/"
  //     });
  //   })
  // })(req, res, next)
  User.findOne({username:req.body.username})
  .then(user=>{
    // No user found
    if(!user){
      return res.status(401).send({
        success:false,
        message:"Could not find the user."
      })
    }

    // Incorrect Password
    if(!compareSync(req.body.password, user.password)){
      return res.status(401).send({
        success:false,
        message:"Incorrect Password"
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

app.get("/protected",passport.authenticate("jwt",{session:false}), (req,res)=>{
  return res.status(200).send({
    success:true,
    user: {
      username: req.user.username, // Use saved user data
      id: req.user._id, // Correct way to get the user ID
  },
  })
})

app.all("*", (req, res, next) => {
  let err = new expressError(400, "Page Not Found!");
  next(err);
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Some Error Occurred" } = err;
  res.status(statusCode).json({ message });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`app is listening at port ${process.env.PORT}`);
});
