const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const bodyParser = require('body-parser');
// import 
const logger=require("./logger.js")
const app = express();
const geoserverRoutes = require('./app/routes/layerRouter.js');
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
// app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.get("/publish")

app.use('/geoserver', geoserverRoutes);


require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});
