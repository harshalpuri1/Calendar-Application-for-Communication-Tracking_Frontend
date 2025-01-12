import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./Login.css";
import api from "../services/api";
import constants from "../utils/config/config";

function LoginPage() {
  const [activeTab, setActiveTab] = useState("user");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setShowForgotPassword(false);
  };

  return (
    <div className="app-container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "user" ? "active" : ""}`}
          onClick={() => handleTabSwitch("user")}
          id="userTab"
        >
          User Login
        </button>
        <button
          className={`tab-button ${activeTab === "admin" ? "active" : ""}`}
          onClick={() => handleTabSwitch("admin")}
          id="adminTab"
        >
          Admin Login
        </button>
      </div>
      <div className="tab-contents">
        {showForgotPassword ? (
          <ForgotPasswordForm />
        ) : activeTab === "user" ? (
          <UserForm setShowForgotPassword={setShowForgotPassword} />
        ) : (
          <AdminForm setShowForgotPassword={setShowForgotPassword} />
        )}
      </div>
    </div>
  );
}

function UserForm({ setShowForgotPassword }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const loadingToast = toast.loading("Processing...");

    const data = isRegister
      ? {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = isRegister
        ? await api.registerUser(data)
        : await api.loginUser(data);

      if (response) {
        toast.success(response.message || (isRegister ? "Registration successful!" : "Login successful!"), {
          id: loadingToast,
        });

        if (!isRegister && response.body.token) {
          localStorage.setItem(constants.localStorage.userToken, response.body.token);
          navigate("/user");
        }
      } else {
        toast.error(response.message || "Something went wrong!", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to connect to the server!", { id: loadingToast });
    }
  };

  return (
    <div className="form-container">
      <h2>{isRegister ? "User Register" : "User Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="input-field"
            id="usernameInput"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="input-field"
          id="emailInput"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="input-field"
          id="passwordInput"
        />
        {isRegister && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="input-field"
            id="confirmPasswordInput"
          />
        )}
        <div className="form-options">
          <p className="toggle-mode" onClick={() => setShowForgotPassword(true)} id="forgotPasswordLink">Forgot your password?</p>
        </div>
        <button type="submit" className="submit-button" id="userSubmitButton">
          {isRegister ? "Register" : "Log In"}
        </button>
      </form>
      <p>
        {isRegister ? "Already have an account? " : "Don’t have an account? "}
        <span
          className="toggle-mode"
          onClick={() => setIsRegister(!isRegister)}
          id="toggleModeUser"
        >
          {isRegister ? "Log In" : "Register"}
        </span>
      </p>
    </div>
  );
}

function AdminForm({ setShowForgotPassword }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Processing...");

    try {
      const response = await api.loginAdmin(formData);

      if (response.status && response.body) {
        toast.success(response.message || "Admin Login successful!", { id: loadingToast });
        localStorage.setItem(constants.localStorage.adminToken, response.token);
        localStorage.setItem(constants.localStorage.AdminEmail, formData.email);
        navigate("/admin");
      } else {
        toast.error(response.message || "Something went wrong!", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to connect to the server!", { id: loadingToast });
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="input-field"
          id="adminEmailInput"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="input-field"
          id="adminPasswordInput"
        />
        <div className="form-options">
          {/* <p className="toggle-mode" onClick={() => setShowForgotPassword(true)} id="forgotPasswordLinkAdmin">Forgot your password?</p> */}
        </div>
        <button type="submit" className="submit-button" id="adminSubmitButton">
          Log In
        </button>
      </form>
    </div>
  );
}

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Processing...");

    try {
      const response = await api.forgotPassword({ email });

      if (response.status) {
        toast.success(response.message || "Password reset link sent!", { id: loadingToast });
        navigate("/");
      } else {
        toast.error(response.message || "Something went wrong!", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to connect to the server!", { id: loadingToast });
    }
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          required
          className="input-field"
          id="forgotPasswordEmailInput"
        />
        <button type="submit" className="submit-button" id="forgotPasswordSubmitButton">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default LoginPage;