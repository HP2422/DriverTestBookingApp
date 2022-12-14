const model = require("../model/model");
module.exports = async (req, res) => {
    console.log("seeResult ( Controller ) is called.");
    console.log(req.session.userId);

    const models = await model.findOne({ _id: req.session.userId });
    console.log(models);
    if (models.result) {
        var result = "PASS";
    } else {
        var result = "FAIL";
    }
    console.log(models.comment);
    res.render('seeResult', { data: models, result: result });
};