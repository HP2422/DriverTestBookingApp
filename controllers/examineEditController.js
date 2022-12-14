const model = require("../model/model");
module.exports = async (req, res) => {
    console.log("Examiner-Edit ( Controller ) is called.");
    const models = await model.find({}).populate("username");

    const id = req.params.id;
    const key = "_id";
    const value = "";
    const fmodels = models.filter(d => d[key] == id);

    console.log("fmodels");
    console.log(fmodels);
    console.log("fmodels");

    res.render('examiner-edit', { data: fmodels[0] });

};