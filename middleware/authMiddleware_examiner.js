const model = require("../model/model");

module.exports = async (req, res, next) => {
    console.log("AuthMiddleware_Examiner is called.");
    console.log("Check the Session Id" + req.session.userId);
    if (!req.session.userId) return res.redirect("/login");
    await model.findById(req.session.userId, (error, user) => {
        if (user.userType == "admin") {
            return res.redirect("/")
        };
        if (user.userType == "driver") {
            return res.redirect("/")
        }
        if (error || !user) return res.redirect("/signup");
    }).clone();
    next();
};
