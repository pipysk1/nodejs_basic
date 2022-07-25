import express from "express";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");
import homeController from "../controller/homeController";

let route = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
  route.get("/", homeController.getHomePage);
  route.get("/detail/user/:userId", homeController.getDetailPage);
  route.post("/create/newUser", homeController.createNewUser);
  route.post("/delete-user", homeController.deleteUser);
  route.get("/getEdit-user/:id", homeController.getEditPage);
  // route.post("/update-users", homeController.postUpdateUser);
  route.post("/updateUser", homeController.postUpdateUser);
  route.get("/upload", homeController.getUploadFilePage);
  route.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );
  route.post(
    "/upload-multiple-images",
    upload.array("multiple_images", 3),
    homeController.handleUploadMutipleFiles
  );
  route.get("/about", (req, res) => {
    res.send("index.ejs");
  });
  return app.use("/", route);
};
export default initWebRoute;
