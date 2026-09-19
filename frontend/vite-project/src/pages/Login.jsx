import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Login.css";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "../customhooks/useAuth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
     const { login } = useAuth();
   
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
    // console.log("Logging in with:", formData);
    // Backend Authentication logic will go here
    try {
      await login(formData);
      setRegisterError("");
      toast.success("logged in successfully!");
      navigate("/Dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response)
          setRegisterError(
            error.response.data.errors[0]?.message
              ? error.response.data.errors[0].message
              : error.response.data.message,
          );
        toast.error(
          error.response?.data?.message || "Invalid email or password",
        );
      } else if (error.request) {
        console.log("No response received:", error.request);
      }
    }
  };

  return (
    <div className="login-page">
      <Navbar />

      <main className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
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

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
