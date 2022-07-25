import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM `users` ");
    return res.render("index.ejs", {dataUser: rows, test: "abc String "});
};

let getDetailPage = async (req, res) => {
    let userId = req.params.userId;
    let [user] = await pool.execute(`select * from users where id =?`, [userId]);
    console.log(user);
    return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
    console.log(">>>check req, ", req.body);
    let {firstName, lastName, email, adress} = req.body;
    // (????) điền giá trị
    await pool.execute(`insert into users(firstName, lastName, email, adress)  values  (?,?,?,?)`, [firstName, lastName, email, adress]);
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
    console.log(user)
    return res.render("updates.ejs", {dataUser: user[0]});
};

let postUpdateUser = async (req, res) => {
    console.log('check req, ', req.body);
    let {firstName, lastName, email, adress, id} = req.body;
    await pool.execute(`UPDATE users SET firstName = ?, lastName = ?, email = ?, adress = ? WHERE id = ?`, [firstName, lastName, email, adress, id]);
    return res.redirect("/");
}
module.exports = {
    getHomePage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser,
};
