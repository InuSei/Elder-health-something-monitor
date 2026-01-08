import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../api";
import { validateLogin } from "../../utils/validators";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setErrors({});
    
    // Bundle data
    const loginData = { first_name, last_name, birthday };
    
    // Validate
    const { isValid, errors: newErrors } = validateLogin(loginData);

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
    // Convert YYYY-MM-DD -> YY-MM-DD
    const [year, month, day] = birthday.split("-");
    const shortBirthday = `${year.slice(2)}-${month}-${day}`;

    console.log("Sending to backend:", {
      first_name,
      last_name,
      birthday: shortBirthday
    });

    const data = await loginUser(first_name, last_name, shortBirthday);

    console.log("API response:", data);

    if (!data.access_token) {
      throw new Error("No token received");
    }

    localStorage.setItem("access_token", data.access_token);
    navigate("/Dashboard");
  } 

    catch (err) {
      console.error(err);
      setApiError("Invalid login credentials or connection error");
    }
  };

  const wrapperStyle = { width: "100%", marginBottom: "15px" }; // Spacing between inputs
  const inputStyle = { width: "100%", boxSizing: "border-box" }; // Ensures padding doesn't break width
  const errorStyle = { color: "red", fontSize: "12px", marginTop: "2px", textAlign: "left", width: "100%" };

 return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo" onClick={() => navigate("/")} />
        <h2 className="login-title">
          <span className="text-black">WELCOME </span>
          <span className="text-red">BACK</span>
        </h2>

        <form className="login-form" onSubmit={handleSubmit}>
          
          <div style={wrapperStyle}>
            <input 
              type="text" 
              placeholder="First Name" 
              value={first_name} 
              onChange={(e) => setFirstName(e.target.value)} 
              style={{ ...inputStyle, borderColor: errors.first_name ? "red" : "" }}
            />
            {errors.first_name && <span style={errorStyle}>{errors.first_name}</span>}
          </div>

          <div style={wrapperStyle}>
            <input 
              type="text" 
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)} 
              style={{ ...inputStyle, borderColor: errors.last_name ? "red" : "" }}
            />
            {errors.last_name && <span style={errorStyle}>{errors.last_name}</span>}
          </div>

          <div style={wrapperStyle}>
            {/* Reverted to Text Input for consistency */}
            <input 
              type="date" 
              placeholder="Birthday (YYYY-MM-DD)"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              style={{ ...inputStyle, borderColor: errors.birthday ? "red" : "" }}
            />
             {errors.birthday && <span style={errorStyle}>{errors.birthday}</span>}
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        {/* API Error Display */}
        {apiError && <p style={{ color: "red", marginTop: "10px" }}>{apiError}</p>}

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