import db from "../connectDB.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;

  const q = "SELECT * FROM users_media WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];

    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.msToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "rill", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users_media SET `coverPic`=?,`profilePic`=?,`name`=?,`city`=?,`website`=? WHERE id=?";

    db.query(
      q,
      [
        req.body.coverPic,
        req.body.profilePic,
        req.body.name,
        req.body.city,
        req.body.website,
        userInfo.id,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        // if (data.affectedRows > 0) return res.json("Update successfully!");
        return res.json("Update successfully!");
        // return res.status(202).json("Update only your profile!");
      }
    );
  });
};
