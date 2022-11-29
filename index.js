require("dotenv").config();

const express = require("express");
const app = new express();

const path = require("path");
const route = express.Router();
const ejs = require("ejs");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const Data = require("./model/model");
const user = require("./model/user");

const home = require("./controllers/dashboard");
const g = require("./controllers/g");
const g2 = require("./controllers/g2");
const login = require("./controllers/login");
const addData = require("./controllers/addData");
const getData = require("./controllers/getData");
const updateData = require("./controllers/updateData");

const signup = require("./controllers/signup");
const storeUser = require("./controllers/storeUser");

const userLogin = require("./controllers/userLogin");

const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");
const informationCheck = require("./middleware/informationCheck");
const authMiddleware_admin = require("./middleware/authMiddleware_admin");

const appointment = require("./controllers/appointment");
const getAppointmentAdminController = require("./controllers/getAppointmentAdmin");
const createAppointmentsController = require("./controllers/createAppointments");
const getAppointmentDriverController = require("./controllers/getAppointmentDriver");

const logout = require("./controllers/logout");

app.set("view engine", "ejs");

global.eMsg = null;
global.loggedIn = null;
global.isInfoProvided = false;
app.use(express.json());
app.use(express.urlencoded());
app.use(expressSession({ secret: "patel495" }));
var router = express.Router();

const port = 4000;

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    console.log(`MongoDb Database is Connected ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB();

app.get("/", home);

app.get("/g", authMiddleware, g);

app.get("/g2", authMiddleware, g2);

app.get("/login", login);
app.post("/users/login", redirectIfAuthenticated, userLogin);
app.get("/signup", redirectIfAuthenticated, signup);
app.post("/storeUser", redirectIfAuthenticated, storeUser);

app.get("/logout", logout);

// Add the data Function.
app.post("/g2/addData", authMiddleware, addData);

// Fetch the data function.
app.post("/getData", getData);

// Update the Data.
app.post("/updateData", authMiddleware, updateData);

// To open appointment page for admin
app.get("/appointment", authMiddleware_admin, appointment);

app.post("/createAppointments", authMiddleware_admin, createAppointmentsController);

app.get("/getAppointmentAdmin", authMiddleware_admin, getAppointmentAdminController);

app.get("/getAppointmentDriver", authMiddleware, getAppointmentDriverController);

//For public folder access.
app.use(express.static("public"));

app.listen(port, () => {
  console.log("Server is listening on " + port);
});

app.use("*", (req, res, next) => {
  if (req.session) {
    loggedIn = req.session.userId;
  } else {
    loggedIn = req.session?.userId;
  }
  next();
});

app.use((req, res) => res.render("notFound"));
// COMPLETED
