const mongoose = require("mongoose");
const socketIo = require("socket.io");

function startDatabaseListener(server) {
  const io = socketIo(server);
  const db = mongoose.connection;

  db.collection("users")
    .watch()
    .on("change", (change) => {
      if (change.operationType === "update") {
        io.emit("userUpdate", change.fullDocument);
      }
    });

  db.collection("products")
    .watch()
    .on("change", (change) => {
      if (change.operationType === "update") {
        io.emit("productUpdate", change.fullDocument);
      }
    });
}

module.exports = startDatabaseListener;
