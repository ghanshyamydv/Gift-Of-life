import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        fileName:String,
        url:String,
    },
    category:{
        type: String,
        required: true,
        enum: ['donor', 'recipient']
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
},
{ timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
export default Story;