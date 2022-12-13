const Data = require("../model/model");
const availableAppointmentsSchema = require("../model/appointments");

module.exports = async (req, res) => {

    console.log(req.body.id);
    console.log(req.body.comment);
    console.log(...req.body.result);
    if (req.body.result) {
        var result = true;
    } else {
        var result = false;
    }
    var id = req.body.id;
    var comment = req.body.comment.replace(/\s+/g, ' ');
    console.log(comment);
    await Data.findOneAndUpdate(
        { _id: id },
        {
            comment: comment,
            result: result,
        }
    );

    res.redirect("/examiner");
};
