import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['donor', 'recipient'] // Ensures only valid categories are used
    },
    // registeredForm: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     refPath: 'categoryModel', // Dynamically reference model
    // }
});

// // Define a virtual field for `categoryModel` that won't be stored in the database
// userSchema.virtual('categoryModel').get(function () {
//     return this.category === 'donor' ? 'Donor' : 'Recipient';
// });

// // Ensure virtuals are included when converting documents to JSON or Objects
// userSchema.set('toJSON', { virtuals: true });
// userSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', userSchema);
export default  User;
