if (process.env.NODE_ENV !== "production") {
    const dotenv = await import("dotenv");
    dotenv.config();
  }

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Donor from "./models/donor.model.js";
import multer from "multer";
const app = express();

app.use(cors());
app.use(express.json());
// const atlasdbURL = process.env.ATLASDB_URL;
const atlasdbURL = "mongodb://localhost:27017/";
db()
  .then((res) => console.log("connection sucessful"))
  .catch((err) => console.log(err));

async function db() {
  await mongoose.connect(atlasdbURL);
}

//multer config ------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images'); // Store files in the "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename files to avoid collisions
  }
});

const upload=multer({storage});
//-----------------------

app.get("/", (req, res) => {
  const data={
    name:"mohan",
    age:18
  };
  try {
    // Simulate data fetching
    res.status(200).json(data);
  } catch (err) {
    next(err); // Pass error to middleware
  }
});

app.post("/donor-register",
  upload.fields([
  { name: "photo", maxCount: 1 },         // Field name for photo, max 1 file
  { name: "citizenship", maxCount: 1 }    // Field name for citizenship, max 1 file
]),
async (req, res) => {
  console.log(req.body);
  
  // const newDonor=new Donor(req.body);
  // await newDonor.save();
  // try {
  //   if (!req.body) {
  //     throw new Error("Data submition failed!");
  //   }
  //   res.status(201).json({ message: "Data received successfully" });
  // } catch (err) {
  //   next(err); // Pass error to middleware
  // }

  });

app.post("/recepient-register",
  upload.fields([
  { name: "photo", maxCount: 1 },          // Field name for photo, max 1 file
  { name: "citizenship", maxCount: 1 },    // Field name for citizenship, max 1 file
  { name: "hospitalDocs", maxCount: 1 }    // Field name for hospital documents 1 file
]),
(req, res) => {
  console.log("recepientdata",req.body);
  });

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
