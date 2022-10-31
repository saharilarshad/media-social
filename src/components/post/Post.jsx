import "./post.scss";
import MoreHorizonIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";

const Post = ({ post }) => {

    const [commentOpen, setCommentOpen] = useState(false)

    const liked = false;
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt={post.name} />
            <div className="details">
              <Link
                to={`/post/${post.userId}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <span className="name">{post.name}</span>
              </Link>
                <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizonIcon />
        </div>
        <div className="content">
            <span>{post.desc}</span>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
            <div className="item">
                {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorder />}
                12 Likes
            </div>
            <div className="item">
                <TextsmsOutlinedIcon  onClick={() => setCommentOpen(!commentOpen)}/>
                12 Comments
            </div>
            <div className="item">
                <ShareOutlinedIcon />
                Share
            </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
