const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
    date: { type: String },
    time: { type: String },
    isTimeSlotAvailable: { type: Boolean, default: true },
});
const availableAppointmentsSchema = mongoose.model("availableAppointmentsSchema", appointmentsSchema);

module.exports = availableAppointmentsSchema;