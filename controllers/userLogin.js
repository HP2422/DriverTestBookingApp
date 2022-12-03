const bcrypt = require("bcrypt");
const model = require("../model/model");

module.exports = (req, res) => {
  console.log("UserLogin is Called.");
  const { username, password } = req.body;
  console.log(req.body);

  model.findOne({ username: username }, (error, user) => {
    console.log(user + " , " + error);
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          req.session.userType = user.userType;
          console.log("Passwords match");

          // global.userType = user.userType;
          // global.isInfoProvided =
          //   user.lNumber != null && user.lNumber != "default";

          res.redirect("/");
          // If the username and password is available.
        } else {
          console.log("Passwords don't match");

          // global.isAdmin = false;

          res.redirect("/login");
          // If the user is Admin.
        }
      });
    } else {
      console.log("Sign up if the username is not available.");
      res.redirect("/signup");
      // If the username is not available in the database.
    }
  });
};

// const bcrypt = require("bcrypt");
// const user = require("../model/user");

// module.exports = (req, res) => {
//     const { username, password } = req.body;
//     console.log(req.body);
//     user.findOne({ username: username }, (error, user) => {
//         console.log(user + " , " + error);
//         if (user) {
//             bcrypt.compare(password, user.password, (error, same) => {
//                 if (same) {
//                     console.log("User Role = " + user.userType);
//                     if (user.userType == "admin") {
//                         global.isAdmin = true;
//                     } else {
//                         global.isAdmin = false;
//                     }
//                     res.redirect("/");
//                 } else {
//                     global.isAdmin = false;
//                     res.redirect("/login");
//                 }
//             })
//         } else {
//             res.redirect("/signup");
//         }
//     })
// }
