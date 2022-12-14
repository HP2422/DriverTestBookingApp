const model = require("../model/model");
module.exports = async (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/dashboard.html"));
    console.log("Dashboard ( Controller ) is called.");
    const models = await model.find({}).populate("username");
    res.render('dashboard', { models });
};