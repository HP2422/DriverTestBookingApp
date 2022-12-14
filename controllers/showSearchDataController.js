const model = require("../model/model");
module.exports = async (req, res) => {
    console.log("showSearchData ( Controller ) is called.");
    console.log(req.body);
    let search = req.body.searchbox;
    const models = await model.find({}).populate("username");

    const key = "testType";
    const value = "";
    const fmodels = await model.find({ testType: { $regex: '.*' + search + '.*', $options: 'i' } }).exec();
    console.log(fmodels);
    res.render('examiner', { data: fmodels });
};