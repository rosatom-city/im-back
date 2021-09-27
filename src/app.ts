import * as dotenv from "dotenv";
import express from "express";
import { initialize } from "express-openapi";
import sequelize from "./db";
import IO from "./services/io.service";

let server;

dotenv.config();

let path = require("path");
let cors = require("cors");

let app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/../public`));

initialize({
  apiDoc: require("./api/doc.js"),
  app: app,
  paths: path.resolve(__dirname, "api/routes"),
});

app.use(function (err, req, res, next) {
  res.status(err.status).json(err);
});

module.exports = app;

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection... Auth`);
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error);
    process.exit(1);
  }
}

async function init() {
  let serverPort = process.env.PORT || 4000;

  server = await app.listen(serverPort, function () {
    console.log("Express server started");
  });

  IO.instance.config(server).run();

  await assertDatabaseConnectionOk();
}

init();

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server")
  server.close(() => {
    console.log("HTTP server closed");
  })
})
