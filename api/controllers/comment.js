import moment from "moment";
import db from "../connectDB.js";
import jwt from "jsonwebtoken";

export const getComments = (req, res) => {
  // const q = `SELECT * FROM posts_media AS p JOIN users_media AS u ON u.id = p.userId`
  const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments_media AS c JOIN users_media AS u ON (u.id = c.userId)
          WHERE c.postId = ? ORDER BY c.createdAt DESC`;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
    const token = req.cookies.msToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "rill", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      // const q = `SELECT * FROM posts_media AS p JOIN users_media AS u ON u.id = p.userId`
      const q = "INSERT INTO comments_media(`desc`,`createdAt`,`userId`,`postId`) VALUES (?)";
  
      const values = [
        req.body.desc,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
        req.body.postId
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created!");
      });
    });
  };
