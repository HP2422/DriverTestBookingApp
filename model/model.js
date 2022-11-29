const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const allData = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  userType: { type: String, default: "driver" },
  fName: { type: String, default: "harsh" },
  lName: { type: String, default: "patel" },
  age: { type: Number, default: 20 },
  sin: { type: String, default: "1234987676" },
  lNumber: { type: String, unique: true, default: "DFGHJKL" },
  date: { type: String, default: null },
  time: { type: String, default: null },
  firstTime: { type: Boolean, default: true },
  appointmentId: { type: String, default: null },
  // dob: { type: Date, default: new Date() },
  carDetails: {
    make: { type: String, default: "1980" },
    model: { type: String, default: "BMW" },
    year: { type: String, default: "1998" },
    plateNo: { type: String, default: "HPATEL" },
  },
});

allData.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.lNumber, 10, (error, hash) => {
    user.lNumber = hash;
    next();
  });
});

allData.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const data = mongoose.model("data", allData);
module.exports = data;
