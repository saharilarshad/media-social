import db from "../connectDB.js";
import jwt from "jsonwebtoken";

export const getFollows = (req, res) => {
  const q = "SELECT followerUserId FROM relationship_media WHERE followedUserId = ?";

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((follow) => follow.followerUserId));
  });
};

export const addFollow = (req, res) => {
  const token = req.cookies.msToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "rill", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // const q = `SELECT * FROM posts_media AS p JOIN users_media AS u ON u.id = p.userId`
    const q =
      "INSERT INTO relationship_media(`followerUserId`,`followedUserId`) VALUES (?)";

    const values = [
    //   req.body.desc,
    //   moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.userId,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following!");
    });
  });
};

export const unFollow = (req, res) => {

    // console.log("works");

    const token = req.cookies.msToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "rill", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      // const q = `SELECT * FROM posts_media AS p JOIN users_media AS u ON u.id = p.userId`
      const q =
        "DELETE FROM relationship_media WHERE `followerUserId` = ? AND `followedUserId` = ?";
  
  
      db.query(q, [userInfo.id, req.query.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Unfollow");
      });
    });
  };
