const express = require("express");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3030;
const app = express();

//------- Middlewares -------//
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

// Landing page route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Base Todo Router
const _router = require("./src/router/Router");
// Add more router here as per your application needs

_router(app);

// Running App
app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
