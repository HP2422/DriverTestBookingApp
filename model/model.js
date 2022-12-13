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
  testType: { type: String, default: null },
  firstTime: { type: Boolean, default: true },
  appointmentId: { type: String, default: null },
  comment: { type: String, default: null },
  result: Boolean,
  // dob: { type: Date, default: new Date() },
  carDetails: {
    make: { type: String, default: "TOYOTA" },
    model: { type: String, default: "CAMRY" },
    year: { type: Number, default: "2020" },
    plateNo: { type: String, default: "patel495patel004" },
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
