import db from "../connectDB.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getPosts = (req, res) => {
  const userId = req.query.userId;

  // console.log(userId ? "there is": "none")

  const token = req.cookies.msToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "rill", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // const q = `SELECT * FROM posts_media AS p JOIN users_media AS u ON u.id = p.userId`
    const q = userId !== "undefined"
      ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts_media AS p JOIN users_media AS u ON (u.id = p.userId) WHERE p.userId = ?`
      : `SELECT p.*, u.id AS userId, name, profilePic FROM posts_media AS p JOIN users_media AS u ON (u.id = p.userId)
        JOIN relationship_media AS r ON (p.userId = r.followedUserId) WHERE followerUserId = ? OR p.userId = ?
        ORDER BY p.createdAt DESC`;

    const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.msToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "rill", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // const q = `SELECT * FROM posts_media AS p JOIN users_media AS u ON u.id = p.userId`
    const q =
      "INSERT INTO posts_media(`desc`, `img`, `userId`, `createdAt`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json("Post has been created!");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.msToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "rill", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // const q = `SELECT * FROM posts_media AS p JOIN users_media AS u ON u.id = p.userId`
    const q =
      "DELETE FROM posts_media WHERE `id`= ? AND `userId` = ?";

    db.query(q, [req.params.id,userInfo.id], (err, data) => {
      if (err) res.status(500).json(err);
      // if (data.affectedRows > 0) res.status(200).json("Post has been deleted!");
      return res.status(200).json("Post has been deleted!");
      // return res.status(403).json("You can only delete your own post!");
    });
  });
};
