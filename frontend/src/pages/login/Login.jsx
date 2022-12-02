import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = ({isLogin}) => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const [registerData, setRegisterData] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  })

  const [login, setLogin] = useState(isLogin)

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    if(login){
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }else{
      setRegisterData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if(login){
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/auth/login", credentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/")
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
    }else{
        try {
          const registerRes = await axios.post('/auth', registerData)
          if(registerRes.data === "User has been created"){
            const res = await axios.post("/auth/login", registerData);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
          }else{
            throw new Error("Error")
          }
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    }
  };


  return (
  <>
  {login ? (    
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
        <p className="lRegister" onClick={() => setLogin(false)}>Register</p>
      </div>
    </div>
    ) 
    : 
    (
    <div className="login">
        <div className="lContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          <button disabled={loading} onClick={handleClick} className="lButton">
            Register
          </button>
          {error && <span>{error.message}</span>}
          <p className="lLoginp" onClick={() => setLogin(true)}>Login</p>
        </div>
      </div>  
    )}
  </>
  );
};

export default Login;