import mongoose from "mongoose";
const recipientSchema = new mongoose.Schema({
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
    recipientRelationship:{
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
    recipientRelationship: {
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
  paidOption: {
    type:Boolean,
    required:true,
  },
  photo: {
    url:{
      type:String,
      required:true
  },
  fileName:{
      type:String,
      required:true
  }
  },
  citizenship: {
    url:{
      type:String,
      required:true
  },
  fileName:{
      type:String,
      required:true
  }
  },
  hospitalDocs:{
    url:{
      type:String,
      required:true
  },
  fileName:{
      type:String,
      required:true
  }
  },
  confirmation: {
    type:Boolean,
    required:true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Ensures one donorDetail per user
},
status: {
  type: String,
  enum: ['pending', 'approved', 'rejected'], // Order status
  default: 'pending',
},
transplant:{
  type: String,
  enum: ['pending', 'success'], // Order status
  default: 'pending',
}
}, { timestamps: true });

const Recipient = mongoose.model("Recipient", recipientSchema);
export default Recipient;