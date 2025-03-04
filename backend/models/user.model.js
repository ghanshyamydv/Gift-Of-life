// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true // Ensures emails are stored in lowercase
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         required: true,
//         enum: ['donor', 'recipient'] // Only allows valid categories
//     }
// });

// // Hash password before saving user
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (err) {
//         next(err);
//     }
// });

// // Method to compare passwords
// userSchema.methods.comparePassword = async function (enteredPassword) {
//     return bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model("User", userSchema);
// export default User;

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    category: {
        type: String,
        required: true,
        enum: ['donor', 'recipient']
    }
}, { timestamps: true });

// Hash password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Hash password before updating user with findOneAndUpdate
userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(update.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;