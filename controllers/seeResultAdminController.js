const model = require("../model/model");
module.exports = async (req, res) => {
    console.log("seeResultAdmin  ( Controller ) is called.");

    const models = await model.find({}).populate("username");

    const fmodels = [];
    for (let i = 0; i < models.length; i++) {
        if (models[i].comment)
            fmodels.push(models[i]);
    }
    console.log("FMODELS");
    console.log(fmodels);
    console.log("FMODELS");
    res.render('displayResult', { data: fmodels });
};