import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users` ");
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, adress } = req.body;
  if (!firstName || !lastName || !email || !adress) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await pool.execute(
    `insert into users(firstName, lastName, email, adress)  values  (?,?,?,?)`,
    [firstName, lastName, email, adress]
  );
  return res.status(200).json({
    message: "Ok",
  });
};

let updateUser = async (req, res) => {
  console.log("check req, ", req.body);
  let { firstName, lastName, email, adress, id } = req.body;

  if (!firstName || !lastName || !email || !adress || !id) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await pool.execute(
    `UPDATE users SET firstName = ?, lastName = ?, email = ?, adress = ? WHERE id = ?`,
    [firstName, lastName, email, adress, id]
  );
  return res.status(200).json({
    message: "Ok",
  });
};

const deleteUser = async (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await pool.execute(`delete from users where id = ? `, [userId]);
  return res.status(200).json({
    message: "Ok",
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
