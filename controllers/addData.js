const Data = require('../model/model');
module.exports = async (req, res) => {
    console.log("addData ( Controller ) is called.");
    console.log(req.body);

    const object = {
        fName: req.body.fName,
        lName: req.body.lName,
        lNumber: req.body.lNumber,
        dob: new Date(req.body.dob),
        age: req.body.age,
        sin: req.body.sin,
        carDetails: {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            plateNo: req.body.plateNo,
        }
    };


    const output = await Data.findByIdAndUpdate(req.session.userId, object, function (error, object) {
        console.log("error -> " + error + " , Obj -> " + object);
        if (error == null && object != null) {
            global.isInfoProvided = true;
            console.log("isInfoProvided - " + global.isInfoProvided);
        }
    }).clone();

    res.redirect("/g2");
}