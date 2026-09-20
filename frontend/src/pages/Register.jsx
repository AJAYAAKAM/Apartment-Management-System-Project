
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://apartment-management-system-project.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="register-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="register-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>

        {message && <p className="register-message">{message}</p>}

        <button
          className="login-link"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default Register;

