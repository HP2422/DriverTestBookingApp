const Data = require('../model/model');
module.exports = async (req, res) => {
    console.log("getData ( Controller ) is called.");
    console.log(req.body.lNumber);
    let data = "";
    try {
        data = await Data.find({
            lNumber: req.body.lNumber,
        }).lean();
        if (data[0] != null) {
            data.dob = data[0].dob.getMonth() + "-" + data[0].dob.getDate() + "-" + data[0].dob.getFullYear();
        } else {
            data = { message: "No user found" }
        }
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    res.render("g", { data });
};