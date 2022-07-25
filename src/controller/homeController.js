import pool from "../configs/connectDB";
import multer from "multer";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users` ");
  return res.render("index.ejs", { dataUser: rows, test: "abc String " });
};

let getDetailPage = async (req, res) => {
  let userId = req.params.userId;
  let [user] = await pool.execute(`select * from users where id =?`, [userId]);
  console.log(user);
  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  console.log(">>>check req, ", req.body);
  let { firstName, lastName, email, adress } = req.body;
  // (????) điền giá trị
  await pool.execute(
    `insert into users(firstName, lastName, email, adress)  values  (?,?,?,?)`,
    [firstName, lastName, email, adress]
  );
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute(`delete from users where id = ? `, [userId]);
  return res.redirect("/");
};

let getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute(`select * from users where id = ?`, [id]);
  console.log(user);
  return res.render("updates.ejs", { dataUser: user[0] });
};

let postUpdateUser = async (req, res) => {
  console.log("check req, ", req.body);
  let { firstName, lastName, email, adress, id } = req.body;
  await pool.execute(
    `UPDATE users SET firstName = ?, lastName = ?, email = ?, adress = ? WHERE id = ?`,
    [firstName, lastName, email, adress, id]
  );
  return res.redirect("/");
};

let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

let handleUploadFile = async (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form

  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }

  res.send(
    `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
  );
};

let handleUploadMutipleFiles = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select an image to upload");
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/image/${files[index].filename} "width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload">Upload more images</a>';
  res.send(result);
};

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  getUploadFilePage,
  handleUploadFile,
  handleUploadMutipleFiles,
};
