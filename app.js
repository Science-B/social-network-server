const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const initDataBase = require("./startUp/initDataBase");
const app = express();
const routes = require("./routes");
const PORT = config.get("port") ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", routes);

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDataBase();
    });
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green(`MongoDB is working`));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT} ...`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}
start();
