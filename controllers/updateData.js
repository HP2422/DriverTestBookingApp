const Data = require("../model/model");
const availableAppointmentsSchema = require("../model/appointments");

module.exports = async (req, res) => {
  console.log("updateData ( Controller ) is called." + req.session.userId);
  // console.log("BODY");
  // console.log(req.body.time);
  // console.log("BODY");
  // console.log(req.body.date);
  // console.log({ req });

  const appointment = await availableAppointmentsSchema.findOneAndUpdate(
    { time: req.body.time, date: req.body.date },
    {
      isTimeSlotAvailable: false,
    }
  );
  console.log(...req.body.testType);
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
