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


    const models = await Data.findOne({ _id: loggedIn });
    console.log("models");
    console.log(models.fName);
    console.log("models");
    let toEntercarDetail = { ...req.query, fName: models.fName, lName: models.lName, lNumber: models.lNumber, age: models.age }
    res.render("g", { appointment: appointment, date: date, data: toEntercarDetail });
};
