import "./login.scss";
import {Link, useNavigate} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const {login} = useContext(AuthContext);

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/")
    } catch (err) {
      if (err.response.data ==="username not found!" || "wrong password or username"){
        setErr(err.response.data)
        console.log(err)
      }else {
        setErr("username or password was wrong!")
      }
      
    }
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            ullam earum? Ullam, temporibus nulla dignissimos distinctio sapiente
            officiis eos neque aliquam nemo quis consequuntur voluptates dolore
            corporis quam totam rem.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username.." name="username" onChange={handleChange}/>
            <input type="password" placeholder="Password.." name="password" onChange={handleChange} />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
