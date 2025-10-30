import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../api";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    birthday: "",
    phone_number: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  
  try {
    const response = await signupUser(
      formData.first_name,
      formData.last_name,
      parseInt(formData.age),
      formData.birthday,
      formData.phone_number
    );
    setMessage(response.message);
    setTimeout(() => navigate("/Login"), 2000);
  } catch (err) {
    console.error(err);
    setMessage("Signup failed. Try again.");
  }
};

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-slogan">
          <span className="text-white">Smarter</span>
          <span className="text-black"> Health,</span>
          <br />
          <span className="text-white">Safer</span>
          <span className="text-black"> Aging</span>
        </div>
        <div className="register-image" />
      </div>

      <div className="register-form-card">
        <div className="register-logo" onClick={() => navigate("/")} />

        <h2 className="register-title">
          <span className="text-black">CREATE </span>
          <span className="text-red">ACCOUNT</span>
        </h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" 
              name="first_name"
              placeholder="First Name" 
              value={formData.first_name}
              onChange={handleChange}
              required 
            />
            <input type="text" 
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-row">
            <input type="text"
              name="birthday"
              placeholder="YYYY-DD-MM"
              value={formData.birthday}
              onChange={handleChange}
              required 
            />
            <input 
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="phone_number"
            placeholder="Mobile Number (09xx-xxxx-xxx)"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>

        <p className="register-login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/Login")} className="text-red cursor">
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
