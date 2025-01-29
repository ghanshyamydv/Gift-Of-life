import mongoose from "mongoose";
const donorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  emergencyContact: {
    name: {
      type: String,
      required: true,
    },
    donorRelationship: {
        type:String,
        required:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
  },
  organsAndTissues: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  consent: {
    type: Boolean,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  witnessDetail: {
    name: {
      type: String,
      required: true,
    },
    donorRelationship: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
  },
  medicalPractitioner: {
    name: String,
    role:String,
    signature:String,
  },
  religious:String,
  conditions:String,
  notes:String,
  donationAmount: {
    type:Number,
    required:true,
    min:0
  },
  photo: {
    type: String,
    default:
      "https://i.pinimg.com/474x/0a/52/d5/0a52d5e52f7b81f96538d6b16ed5dc2b.jpg",
    set: (v) =>
      v === ""
        ? "https://i.pinimg.com/474x/0a/52/d5/0a52d5e52f7b81f96538d6b16ed5dc2b.jpg"
        : v,
  },
  citizenship: {
    type: String,
    // required: true,
  },
  confirmation: {
    type:Boolean,
    required:true
  },
});

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
