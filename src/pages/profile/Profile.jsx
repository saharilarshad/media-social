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

const Profile = () => {
  return (
    <div className="profile">
      <div className="images">
        <img
          className="cover"
          src="https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <img
          className="profilePic"
          src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=600"
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
            <span>Saharil Arshad</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>Malaysia</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>SaharilDev</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts />
      </div>
    </div>
  );
};

export default Profile;
