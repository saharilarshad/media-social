import db from "../connectDB.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const q = "SELECT userId FROM likes_media WHERE postId = ?";

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.userId));
  });
};

export const addLike = (req, res) => {
  const token = req.cookies.msToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "rill", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // const q = `SELECT * FROM posts_media AS p JOIN users_media AS u ON u.id = p.userId`
    const q =
      "INSERT INTO likes_media(`userId`,`postId`) VALUES (?)";

    const values = [
    //   req.body.desc,
    //   moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been like!");
    });
  });
};

export const deleteLike = (req, res) => {

    // console.log("works");

    const token = req.cookies.msToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "rill", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      // const q = `SELECT * FROM posts_media AS p JOIN users_media AS u ON u.id = p.userId`
      const q =
        "DELETE FROM likes_media WHERE `userId` = ? AND `postId` = ?";
  
  
      db.query(q, [userInfo.id, req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Likes has been deleted!");
      });
    });
  };
