const model = require("../model/model");
module.exports = async (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/dashboard.html"));
    console.log("Dashboard is Called.");
    const models = await model.find({}).populate("username");
    console.log(req.session);
    console.log(models);
    res.render('dashboard', { models });
};