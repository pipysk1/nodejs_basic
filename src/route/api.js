import express from "express";
import APIController from "../controller/APIController";

let route = express.Router();

const initAPIRoute = (app) => {
  route.get("/users", APIController.getAllUsers); //method get. Read Data
  route.post("/create-user", APIController.createNewUser); //method create -> Add data
  route.put("/update-user", APIController.updateUser);
  route.delete("/delete-user/:id", APIController.deleteUser);
  return app.use("/api/v1", route);
};
export default initAPIRoute;
