const Data = require("../model/model");
module.exports = async (req, res) => {
  console.log("G is called." + req.session.userId);
  // res.sendFile(path.resolve(__dirname, "pages/g.html"));
  const data = await Data.findOne({ _id: req.session.userId });
  console.log({ data });
  const appointment = null;
  res.render("g", { appointment: appointment, data: data });
};