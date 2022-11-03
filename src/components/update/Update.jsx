import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";

const Update = ({ setUpdateOpen, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: "",
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      //   if (user) return makeRequest.delete("/relationships?userId=" + userId);

      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        //invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let coverUrl = user.coverPic;
    // let profileUrl = user.profilePic;
    let coverUrl;
    let profileUrl;

    coverUrl = cover ? await upload(cover) : user.coverPic
    profileUrl = profile ? await upload(profile) : user.profilePic

    mutation.mutate({ coverPic: coverUrl, profilePic: profileUrl, ...texts });

    setUpdateOpen(false);
    setCover(null);
    setProfile(null);
  };


  console.log(cover);
  console.log(profile);
  console.log(texts);

  return (
    <div className="update">
      <h1>Update Profile</h1>
      <form>
        <input type="file" onChange={(e) => setCover(e.target.files[0])} />
        <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="city" onChange={handleChange} />
        <input type="text" name="website" onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <span onClick={() => setUpdateOpen(false)}>X</span>
    </div>
  );
};

export default Update;
