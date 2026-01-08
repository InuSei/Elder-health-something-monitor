import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../api";
import { validateRegister } from "../../utils/validators";
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

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    
    const { isValid, errors: newErrors } = validateRegister(formData);

    if (!isValid) {
      setErrors(newErrors); // Show errors
      return; // Stop here
    }

    // 2. If valid, proceed to API
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
          
          {/* ROW 1: First & Last Name */}
          <div className="form-row">
            <div className="input-group">
              <input 
                type="text" 
                name="first_name"
                placeholder="First Name" 
                value={formData.first_name}
                onChange={handleChange}
                // If error exists, add "input-error" class to turn border red
                className={errors.first_name ? "input-error" : ""}
              />
              {errors.first_name && <span className="error-message">{errors.first_name}</span>}
            </div>
            
            <div className="input-group">
              <input 
                type="text" 
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className={errors.last_name ? "input-error" : ""}
              />
              {errors.last_name && <span className="error-message">{errors.last_name}</span>}
            </div>
          </div>

          {/* ROW 2: Birthday & Age */}
          <div className="form-row">
            <div className="input-group">
              <input 
                type="text"
                name="birthday"
                placeholder="YYYY-MM-DD"
                value={formData.birthday}
                onChange={handleChange}
                className={errors.birthday ? "input-error" : ""}
              />
              {errors.birthday && <span className="error-message">{errors.birthday}</span>}
            </div>

            <div className="input-group">
              <input 
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className={errors.age ? "input-error" : ""}
              />
              {errors.age && <span className="error-message">{errors.age}</span>}
            </div>
          </div>

          {/* ROW 3: Phone Number */}
          <div className="form-row phone-row-container"> 
            <div className="input-group phone-group">
              <input
                type="text"
                name="phone_number"
                placeholder="Mobile Number (09xxxxxxxxx)"
                value={formData.phone_number}
                onChange={handleChange}
                className={errors.phone_number ? "input-error" : ""}
              />
              {errors.phone_number && <span className="error-message">{errors.phone_number}</span>}
            </div>
          </div>
          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>

        {message && <p style={{ textAlign: "center", marginTop: "10px" }}>{message}</p>}

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