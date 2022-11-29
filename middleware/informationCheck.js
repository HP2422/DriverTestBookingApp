const { models } = require("mongoose");
const user = require("../model/user");

module.exports = (req, res, next) => {
    console.log("information check middleware is called - gIP" + global.isInfoProvided);
    if (!global.isInfoProvided)
        return res.redirect("/g2");
    next();
}