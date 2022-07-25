import express from "express";
import homeController from "../controller/homeController";

let route = express.Router();

const initWebRoute = (app) => {
  route.get("/", homeController.getHomePage);
  route.get("/detail/user/:userId", homeController.getDetailPage);
  route.post("/create/newUser", homeController.createNewUser);
  route.post("/delete-user", homeController.deleteUser);
  route.get("/getEdit-user/:id", homeController.getEditPage);
  // route.post("/update-users", homeController.postUpdateUser);
  route.post('/updateUser',homeController.postUpdateUser);



  route.get("/about", (req, res) => {
    res.send("index.ejs");
  });
  return app.use("/", route);
};
export default initWebRoute;
