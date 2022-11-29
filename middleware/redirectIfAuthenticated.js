const { models } = require("mongoose");
const user = require("../model/user");

module.exports = (req, res, next) => {
    console.log("redirectIfAuthenticated middleware is Called, login - " + req.session.userId);
    if (req.session.userId)
        return res.redirect("/");
    next();
}