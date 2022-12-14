const model = require("../model/model");
module.exports = async (req, res) => {
  console.log("StoreUser ( Controller ) is called.");
  try {
    if (req.body.password != req.body.r_password) {
      global.eMsg = "Password is mismached !!!";
      console.log("If the password mismached than it displayed error message ");
    } else {
      await model.create({
        username: req.body.username,
        password: req.body.password,
        userType: req.body.userType,
      });
      global.eMsg = null;
    }
  } catch (error) {
    console.log("error " + error);
    if (error.message.includes("E11000 duplicate key error")) {
      global.eMsg =
        "Username is already taken. Please try with a different username";
      console.log("If the username already taken than it displayed error message ");
    } else {
      global.eMsg = null;
    }
  }
  console.log("If the all things are correct than it will redirect to the dashboard page. otherwise it will redirect to the sign up page and display with error msg.");
  res.redirect(global.eMsg != null ? "/signup" : "/");
};