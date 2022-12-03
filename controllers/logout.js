module.exports = async (req, res) => {
    console.log("Logout Controller called.");
    global.isInfoProvided = false;
    global.userType = null;
    req.session.userId = null;
    console.log(req.session);
    req.session.destroy(() => res.redirect("/"));
};