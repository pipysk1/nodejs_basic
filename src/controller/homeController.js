import pool from '../configs/connectDB'

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users` ');
    return res.render('index.ejs', { dataUser: rows, test: 'abc String ' })

}
let getDetailPage = async (req, res) => {
    let userId = req.params.userId;
    let [user] = await pool.execute(`select * from users where id =?`, [userId])
    console.log(user);
    return res.send(JSON.stringify(user))
}
module.exports = {
    getHomePage,
    getDetailPage
}