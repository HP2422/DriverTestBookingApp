const Data = require("../model/model");
const availableAppointmentsSchema = require("../model/appointments");

module.exports = async (req, res) => {
    console.log("getAppoinementAdmin is called." + req.session.userId);
    loggedIn = req.session.userId;

    const dateFor = req.query.date;

    const [year, month, day] = dateFor.split("-");

    const date = [
        day.toString().padStart(2, "0"),
        month.toString().padStart(2, "0"),
        year,
    ].join("-");
    const appointmentArr = await availableAppointmentsSchema.find({
        date: date,
    });
    const appointment = [];
    for (let i = 0; i < appointmentArr.length; i++) {
        appointment.push(appointmentArr[i].time);
    }
    res.render("appointment", {
        appointment: appointment,
        date: date,
    });
};