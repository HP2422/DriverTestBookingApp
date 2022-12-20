require("dotenv").config();

const express = require("express");
const app = new express();

const path = require("path");
const route = express.Router();
const ejs = require("ejs");
const expressSession = require("express-session");
const flash = require("connect-flash");
const mongoStore = require("connect-mongo");
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
const seeResultAdminController = require("./controllers/seeResultAdminController");

const createAppointmentsController = require("./controllers/createAppointments");
const getAppointmentDriverController = require("./controllers/getAppointmentDriver");
const getAppointmentDriver_g_Controller = require("./controllers/getAppointmentDriver_g");
const seeResultController = require("./controllers/seeResultController");


const authMiddleware_examiner = require("./middleware/authMiddleware_examiner");
const examinerController = require("./controllers/examiner");
const examinerSearchController = require("./controllers/examinerSearchController");

const examineEditController = require("./controllers/examineEditController");
const updateResultController = require("./controllers/updateResultController");

const showSearchDataController = require("./controllers/showSearchDataController");

// const examineEditPageController = require("./controllers/examineEditPageController");

const logout = require("./controllers/logout");

app.use(flash());
app.set("view engine", "ejs");


global.eMsg = null;
global.loggedIn = null;
global.userType = null;
global.isInfoProvided = false;

app.use(express.json());
app.use(express.urlencoded());
app.use(expressSession({
  secret: "patel495",
  // "Harshkumar Narayanbhai Patel / Student Number :- 8805495 " 
 
  resave: false,
  saveUninitialized: true,
  store: mongoStore.create({ mongoUrl: process.env.MONGO_URL }),
}));

app.use("*", (req, res, next) => {
  console.log("* CALLED");
  loggedIn = req.session.userId;
  userType = req.session.userType;
  next();
});


var router = express.Router();
const port = 4001;

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

app.get("/g2", authMiddleware, g2);
app.get("/g", authMiddleware, g);
app.get("/seeResult", authMiddleware, seeResultController);

app.get("/login", redirectIfAuthenticated, login);
app.post("/users/login", redirectIfAuthenticated, userLogin);
app.get("/signup", redirectIfAuthenticated, signup);
app.post("/storeUser", redirectIfAuthenticated, storeUser);

app.get("/logout", logout);

// Add the data Function.
app.post("/g2/addData", authMiddleware, addData);

// Fetch the data function.
app.post("/getData", authMiddleware, getData);

// Update the Data.
app.post("/updateData", authMiddleware, updateData);

// To open appointment page for admin
app.get("/appointment", authMiddleware_admin, appointment);

app.post("/createAppointments", authMiddleware_admin, createAppointmentsController);

app.get("/getAppointmentAdmin", authMiddleware_admin, getAppointmentAdminController);
app.get("/seeResultAdmin", authMiddleware_admin, seeResultAdminController);


app.get("/getAppointmentDriver", authMiddleware, getAppointmentDriverController);
app.get("/getAppointmentDriver_g", authMiddleware, getAppointmentDriver_g_Controller);

app.get("/examiner", authMiddleware_examiner, examinerController);
app.post('/testType', authMiddleware_examiner, examinerSearchController);

app.get('/:id', authMiddleware_examiner, examineEditController);
// app.get('/examiner-edit', authMiddleware_examiner, examineEditPageController);

app.post('/updateResult', authMiddleware_examiner, updateResultController);
app.post('/showSearchData', authMiddleware_examiner, showSearchDataController);
//For public folder access.
app.use(express.static("public"));


app.listen(port, () => {
  console.log("Server is listening on " + port);
});

// app.use("*", (req, res, next) => {
//   if (req.session) {
//     loggedIn = req.session.userId;
//   } else {
//     loggedIn = req.session?.userId;
//   }
//   next();
// });

app.use((req, res) => res.render("notFound"));
// COMPLETED
