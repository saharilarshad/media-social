import { db } from "../connectDB.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = (req, res) => {
  // check user exist
  const q = "SELECT * FROM users_media WHERE username = ? OR email = ?";

  db.query(q, [req.body.username,req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("username already exist!");
    // create user
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // insert user
    const q =
      "INSERT INTO users_media (`username`,`email`,`password`,`name`) VALUES (?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("User has been created!");
    });
  });
};
export const login = (req, res) => {
  // check user exist
  const q = "SELECT * FROM users_media WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("username not found!");

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

    if (!checkPassword) return res.status(400).json("wrong password or username");

    const token = jwt.sign({id:data[0].id}, "rill");

    const {password, ...others} = data[0];

    res.cookie("msToken", token,  { 
        httpOnly:true,
    }).status(200).json(others);
  });
};


export const logout = (req, res) => {
    res.clearCookie('msToken',{
        secure:true,
        sameSite:"none",
    }).status(200).json("user has been logout")
  
};
