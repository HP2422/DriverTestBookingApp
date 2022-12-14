const Data = require("../model/model");
const availableAppointmentsSchema = require("../model/appointments");

module.exports = async (req, res) => {
    console.log("getAppointmentDreiver is called." + req.session.userId);
    loggedIn = req.session.userId;
    const dateFor = req.query.date;

    const [year, month, day] = dateFor.split("-");

    const date = [
        day.toString().padStart(2, "0"),
        month.toString().padStart(2, "0"),
        year,
    ].join("-");
    const availApntArray = await availableAppointmentsSchema.find({
        date: date,
    });
    const appointment = [];
    for (let i = 0; i < availApntArray.length; i++) {
        if (availApntArray[i].isTimeSlotAvailable)
            appointment.push(availApntArray[i].time);
    }
    console.log('suman', req.query)
    res.render("g2", { appointment: appointment, date: date, data: req.query });
};
