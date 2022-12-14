const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const allData = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  userType: { type: String, default: "driver" },
  fName: { type: String, default: "HARSH" },
  lName: { type: String, default: "PATEL" },
  age: { type: Number, default: 25 },
  sin: { type: String, default: "1234987676" },
  lNumber: { type: String, unique: true, default: "HP2422" },
  date: { type: String, default: null },
  time: { type: String, default: null },
  testType: { type: String, default: null },
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
