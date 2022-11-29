const Data = require("../model/model");
const availableAppointmentsSchema = require("../model/appointments");
module.exports = async (req, res) => {
    console.log("Appointmet is called." + req.session.userId);
    const data = await Data.findOne({ _id: req.session.userId });
    console.log({ data });
    const appointment = null;
    res.render("appointment", { data, appointment });
};