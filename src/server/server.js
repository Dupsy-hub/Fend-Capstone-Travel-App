/* Setting .env for API keys */
const dotenv = require("dotenv");
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

const path = require("path");
const fetch = require("node-fetch");

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
app.use(express.static("dist"));
console.log(__dirname);

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors({}));

// Setup Server
const port = 8000;
// Spin up the Server
// const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})
//Callback to debug
function listening() {
  console.log("server running");
  console.log(`Server is running on port: ${port}`);
}

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

// POST route

app.post("/getLocation", async (req, res) => {
  console.log(process.env.GEONAMES_USERNAME);
  const url = `http://api.geonames.org/searchJSON?q=${req.body.location}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`;
  console.log(url);
  const response = await fetch(url);
  try {
    const data = await response.json();
    let coordinates = {
      lat: data.geonames[0].lat,
      long: data.geonames[0].lng,
    };
    res.send(coordinates);
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/getWeather", async (req, res) => {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.body.lat}&lon=${req.body.lon}&key=${process.env.WEATHERBIT_API_KEY}`;
  console.log(url);
  const response = await fetch(url);
  try {
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/getImage", async (req, res) => {
  const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${req.body.city}&image_type=photo`;
  const response = await fetch(url);
  try {
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});

const server = app.listen(port, listening);
