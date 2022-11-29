const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String },
    userType: String
});

userSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    })
})

const user = mongoose.model("user", userSchema);
module.exports = user;