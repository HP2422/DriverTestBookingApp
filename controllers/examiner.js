const model = require("../model/model");
module.exports = async (req, res) => {
    console.log("Examiner is Called.");
    const models = await model.find({}).populate("username");
    console.log(req.session);
    // console.log(models);

    const key = "date";
    const value = "";
    const fmodels = models.filter(d => d[key] != null);
    console.log(fmodels);
    res.render('examiner');
};