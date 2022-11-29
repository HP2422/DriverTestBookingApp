module.exports = async (req, res) => {
    console.log("Logout is Called.");
    global.isInfoProvided = false;
    global.userType = null;
    req.session.userId = null;
    console.log("Logout Controller called.");
    res.render("login");
};