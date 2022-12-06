const Data = require("../model/model");
const availableAppointmentsSchema = require("../model/appointments");

module.exports = async (req, res) => {
  console.log("Update Data is called." + req.session.userId);
  console.log("BODY");
  console.log(req.body.body);
  console.log("BODY");
  console.log(req.body._id);
  console.log({ req });

  const appointment = await availableAppointmentsSchema.findOneAndUpdate(
    { time: req.body.time, date: req.body.date },
    {
      isTimeSlotAvailable: false,
    }
  );

  await Data.findOneAndUpdate(
    { _id: req.session.userId },
    {
      ...req.body,
      carDetails: {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        plateNo: req.body.plateNo,
      },
    }
  );

  res.redirect("/g");
};
