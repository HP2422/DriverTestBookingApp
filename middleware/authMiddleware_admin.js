const model = require("../model/model");

module.exports = (req, res, next) => {
    console.log("AuthMiddleware_Admin is called.");
    console.log("Check the Session Id" + req.session.userId);
    if (!req.session.userId) return res.redirect("/login");
    model.findById(req.session.userId, (error, user) => {
        if (user.userType == "examiner" || user.userType == "driver") {
            return res.redirect("/g2")
        }
        if (error || !user) return res.redirect("/signup");
    });

    next();
};
