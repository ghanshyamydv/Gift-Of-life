import mongoose from "mongoose";

const newsEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
      },
    category: {
        type: String,
        required: true,
        enum: ['news', 'event'] // Only allows valid categories
    }
});

const NewsEvent = mongoose.model("NewsEvent", newsEventSchema);
export default NewsEvent;
