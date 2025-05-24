require("dotenv").config();

const express = require("express");
const path = require("path");
const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("Connect to the database!");

    // const distPath = path.join(__dirname, "../frontend/dist")
    // app.use(express.static(distPath));

    // app.get("*", (req, res) => {
    //   res.sendFile(path.join(distPath, "index.html"));
    // });

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Cannot connect to the database!", error);
    process.exit();
  }
}

startServer();
