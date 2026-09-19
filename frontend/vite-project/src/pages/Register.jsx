import { useState } from "react"; // 1. Added useState import
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Register.css";
import { registerUser } from "../api/authApi";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
function Register() {
  // 2. Added missing initial f ields (name, confirmPassword)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });   

  const [registerError, setRegisterError] = useState("");
    const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Quick client-side check before submission
    if (formData.password !== formData.confirmPassword) {
      setRegisterError("Passwords do not match!");
      return;
    }

      try {
        const { confirmPassword, ...userdata } = formData;
        await registerUser(userdata);
        setRegisterError("");
        toast.success("Account created successfully!");
        navigate("/login");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response)
            setRegisterError(error.response.data.errors[0]?.message?error.response.data.errors[0].message :error.response.data.message);
        } else if (error.request) {
          console.log("No response received:", error.request);
        }
      }
  };

  return (
    <div className="register-page">
      <Navbar />
      <main className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2>Create an Account</h2>
            <p>Start organizing your tasks and files today</p>
          </div>

          {/* 3. Added onSubmit handler */}
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Alex Johnson"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="alex@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword} // 4. Fixed casing to match state key
                onChange={handleChange}
                required
              />
            </div>
            {registerError && (
              <div className="register-error">{registerError}</div>
            )}
            <button type="submit" className="register-button">
              Create Account
            </button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Register;
