import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Donor from "./models/donor.model.js";
import Recepient from "./models/recepient.model.js";
import User from "./models/user.model.js"
import multer from "multer";
import { storage } from "./cloudinary.js";

const app = express();

//middlewares----------------------------
app.use(cors());
app.use(express.json());

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
    const donorDetails = JSON.parse(req.body.donorDetails);
    const address = JSON.parse(req.body.address);
    const emergencyContact = JSON.parse(req.body.emergencyContact);
    const witnessDetail = JSON.parse(req.body.witnessDetail);
    const medicalPractitioner = JSON.parse(req.body.medicalPractitioner);
    const organsAndTissues = JSON.parse(req.body.organsAndTissues);

    const photoUrl = req.files.photo[0].path;
    const photoFilename = req.files.photo[0].filename;

    const citizenshipUrl = req.files.citizenship[0].path;
    const citizenshipFilename = req.files.citizenship[0].filename;

    const newDonor = new Donor({
      ...donorDetails,
      address,
      emergencyContact,
      witnessDetail,
      medicalPractitioner,
      organsAndTissues,
      photo: { filename: photoFilename, url: photoUrl },
      citizenship: { filename: citizenshipFilename, url: citizenshipUrl },
    });
    // console.log(newDonor);
    await newDonor.save();
  }
);

app.post(
  "/recepient-register",
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
    // console.log(newDonor);
    await newRecepient.save();
  }
);

//---------------------------------

app.post("/signup", async (req, res) =>{  
    const newUser = new User(req.body);
    await newUser.save()
    res.status(200).json({
      success: true,
      message: 'Data received and processed successfully',
    });
});

app.post("/login",async (req, res) =>{
  console.log(req.body);
  res.status(200).json({
    success: true,
    message: 'Data received and processed successfully',
  });
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
