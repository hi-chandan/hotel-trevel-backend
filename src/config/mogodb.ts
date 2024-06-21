import mongoose from "mongoose";

export const DBconnect = mongoose
  .connect("mongodb://localhost:27017/", {
    dbName: "authuser",
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database Error", err));
