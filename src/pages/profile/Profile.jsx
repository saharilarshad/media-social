import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const [updateOpen, setUpdateOpen] = useState(false);

  const userId = parseInt(location.pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { data: relationshipData } = useQuery(["relationship"], () =>
    makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);

      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        //invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  // console.log(userId);
  // console.log(data);
  // console.log(relationshipData);
  // console.log(typeof currentUser.id)
  // console.log(typeof userId)

  return (
    <div className="profile">
      {isLoading ? (
        "Loading.."
      ) : (
        <>
          <div className="images">
            <img className="cover" src={"/upload/" + data?.coverPic} alt="" />
            <img
              className="profilePic"
              src={"/upload/" + data?.profilePic}
              alt=""
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="medium" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="medium" />
                </a>
              </div>
              <div className="center">
                <span>{data?.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data?.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data?.website}</span>
                  </div>
                </div>
                {userId === currentUser.id ? (
                  <button onClick={() => setUpdateOpen(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData?.includes(currentUser.id)
                      ? "following"
                      : "follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {updateOpen && <Update setUpdateOpen={setUpdateOpen} user={data} />}
    </div>
  );
};

export default Profile;
