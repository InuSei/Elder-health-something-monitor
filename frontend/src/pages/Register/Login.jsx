import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const data = await loginUser(first_name,last_name,birthday);
      localStorage.setItem("access_token", data.access_token);
      navigate("/Dashboard");
    }
    catch{
      console.error(err);
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo" onClick={() => navigate("/")} />
        <h2 className="login-title">
          <span className="text-black">WELCOME </span>
          <span className="text-red">BACK</span>
        </h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input 
          type="text" 
          placeholder="First Name" 
          value={first_name} 
          onChange={(e) => setFirstName(e.target.value)} 
          required 
          />

          <input 
          type="text" 
          placeholder="Last Name"
           value={last_name}
           onChange={(e) => setLastName(e.target.value)} 
          required 
          />

          <input type="date" 
          placeholder="Birthday (YY/DD/MM)"
           value={birthday}
           onChange={(e) => setBirthday(e.target.value)}
          required 
          />

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        {/* Error message appears here */}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <p className="login-register-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/Register")} className="text-red cursor">
            Sign Up
          </span>
        </p>
      </div>

      <div className="login-right">
        <div className="login-bg-image" />
      </div>
    </div>
  );
};

export default Login;
