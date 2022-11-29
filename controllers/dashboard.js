module.exports = async (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/dashboard.html"));
    console.log(req.session);
    console.log("Dashboard is Called.");
    res.render('dashboard');
};