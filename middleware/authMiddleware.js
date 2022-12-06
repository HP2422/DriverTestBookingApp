const model = require("../model/model");

module.exports = async (req, res, next) => {
  console.log("AuthMiddleware is called.");
  await model.findById(req.session.userId, (error, user) => {
    console.log("INSIDE");
    if (!req.session.userId) return res.redirect("/login");
    if (req.session.userType == "admin") {
      return res.redirect("/");
    }
    if (req.session.userType == "examiner") {
      return res.redirect("/")
    }
    if (error || !user) return res.redirect("/signup");
  }).clone();

  next();
};
