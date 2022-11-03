import "./register.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", inputs);
    } catch (err) {
      if (err.response.data ==="username already exist!"){
        setErr(err.response.data)
      }else {
        setErr("registeration was error")
      }
      // setErr(err.response.data);
      // console.log(err)
    }
  };

  // console.log(inputs);
  // console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>RiLL Social</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            ullam earum? Ullam, temporibus nulla dignissimos distinctio sapiente
            officiis eos neque aliquam nemo quis consequuntur voluptates dolore
            corporis quam totam rem.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username.."
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email.."
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password.."
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name.."
              name="name"
              onChange={handleChange}
            />

            {err && err}
            {/* {err?.length && <p>{err}</p>} */}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
