const model = require("../model/model");
module.exports = async (req, res) => {
    console.log("Examiner Search is Called.");
    let payload = req.body.payload.trim();
    let search = await model.find({ testType: { $regex: '.*' + payload + '.*', $options: 'i' } }).exec();
    console.log(search);
    res.render('examiner', { data: search });
};