import "./post.scss";
import MoreHorizonIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);

  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [noComments, setNoComments] = useState(0);

  // const liked = false;
  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);

      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        //invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
        // queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        //invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
        // queryClient.invalidateQueries(["user"]);
      },
    }
  );

  

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };


  const handleDelete =() => {
    deleteMutation.mutate(post.id)
  }

  // setNoComments(getCommentMutation.mutate())

  // console.log(data);
  // console.log(currentUser);

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/"+post.profilePic} alt={"/upload/"+post.name} />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizonIcon  onClick={() => setMenuOpen(!menuOpen)}/>
          {menuOpen && post.userId === currentUser.id  && (<button onClick={handleDelete}>Delete</button>)}
        </div>
        <div className="content">
          <span>{post.desc}</span>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "Loading..."
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorder onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div className="item">
            <TextsmsOutlinedIcon onClick={() => setCommentOpen(!commentOpen)} />
            {noComments} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} setNoComments={setNoComments} />}
      </div>
    </div>
  );
};

export default Post;
