const model = require("../model/model");
module.exports = async (req, res) => {
    console.log("Examiner Search is Called.");
    let payload = req.body.payload.trim();
    console.log(payload);
    let search = await model.find({ testType: { $regex: new RegExp('^' + payload + '.*') } }).exec();
    search = search.slice(0, 10);
    console.log("search");
    console.log(search);
    console.log("search");
    res.render('examiner', { data: search });
};