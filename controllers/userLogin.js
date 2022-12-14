const bcrypt = require("bcrypt");
const model = require("../model/model");

module.exports = (req, res) => {
  console.log("UserLogin ( Controller ) is called.");
  const { username, password } = req.body;
  console.log(req.body);
  model.findOne({ username: username }, (error, user) => {
    console.log(user + " , " + error);
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          req.session.userType = user.userType;
          console.log("Passwords matched!!");
          res.redirect("/");
          // If the username and password is available.
        } else {
          console.log("Passwords didn't match");
          res.redirect("/login");
          // If the password didn't match.
        }
      });
    } else {
      console.log("Please do sign up if the username is not available.");
      res.redirect("/signup");
      // If the username is not available in the database.
    }
  });
};