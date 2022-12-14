const availableAppointmentsSchema = require("../model/appointments");

module.exports = async (req, res, error) => {
    console.log("createAppointment ( Controller ) is called." + req.session.userId);
    await availableAppointmentsSchema.create({
        date: req.body.date,
        time: req.body.time,
    });
    loggedIn = req.session.userId;

    const appointment = null;
    const date = "";
    res.render("appointment", { appointment: appointment, date: date });
};
