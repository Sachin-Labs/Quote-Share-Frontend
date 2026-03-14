import { Link, useNavigate, useLocation } from "react-router";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import "../styles/auth.css";
import axios from "axios";

const AuthPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(location.state?.mode || "login"); // "login" | "signup" | "forgot"
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    otp: "",
    password: "",
  });

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    let interval;
    if (!canResend && step === 2 && mode !== "login") {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [canResend, step, mode]);

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}requestOtp`, {
        emailId: formData.emailId,
      });
      alert("OTP resent to email");
      setResendTimer(60);
      setCanResend(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupStep1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}requestOtp`, {
        emailId: formData.emailId,
      });
      alert("OTP sent to email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}verifyOtp`, {
        emailId: formData.emailId,
        otp: formData.otp,
      });
      alert("OTP verified");
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}register`, {
        emailId: formData.emailId,
        name: formData.name,
        password: formData.password,
      });
      alert("Registered successfully");
      setMode("login");
      setStep(1);
    } catch (err) {
      alert(err.response.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${API_BASE_URL}login`,
        {
          emailId: formData.emailId,
          password: formData.password,
        },
        { withCredentials: true }
      );
      alert("Logged in successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotStep1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}requestForgotOtp`, {
        emailId: formData.emailId,
      });
      alert("OTP sent to email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotStep2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}verifyForgotOtp`, {
        emailId: formData.emailId,
        otp: formData.otp,
      });
      alert("OTP verified");
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}resetPassword`, {
        emailId: formData.emailId,
        newPassword: formData.password,
      });
      alert("Password reset successfully");
      setMode("login");
      setStep(1);
      setFormData({ name: "", emailId: "", otp: "", password: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  const getSubmitHandler = () => {
    if (mode === "login") return handleLogin;
    if (mode === "signup") {
      if (step === 1) return handleSignupStep1;
      if (step === 2) return handleVerifyOtp;
      return handleFinalRegister;
    }
    if (mode === "forgot") {
      if (step === 1) return handleForgotStep1;
      if (step === 2) return handleForgotStep2;
      return handleResetPassword;
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Link to="/" className="back-link">
          <FaArrowRight style={{ transform: "rotate(180deg)", marginRight: "8px" }} />
          Back to home
        </Link>
        <h1>
          {mode === "login"
            ? "Welcome Back"
            : mode === "signup"
              ? "Create an account"
              : "Reset Password"}
        </h1>

        <div className="toggle-container">
          {mode !== "forgot" && (
            <>
              <p>
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <button
                className="toggle-button"
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setStep(1);
                  setFormData({ name: "", emailId: "", otp: "", password: "" });
                }}
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </>
          )}

          {mode === "forgot" && (
            <button
              className="toggle-button"
              onClick={() => {
                setMode("login");
                setStep(1);
                setFormData({
                  name: "",
                  emailId: "",
                  otp: "",
                  password: "",
                });
              }}
            >
              Back to Login
            </button>
          )}
        </div>

        <form className="login-form" onSubmit={getSubmitHandler()}>
          {mode === "signup" && step === 1 && (
            <>
              <label>Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label>Email</label>
          <input
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            required
            readOnly={mode !== "login" && step > 1}
          />

          {mode === "login" && (
            <>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </>
          )}

          {mode !== "login" && step === 2 && (
            <>
              <label>Enter OTP</label>
              <input
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
              />
              <div className="resend-container">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || loading}
                  className="resend-button"
                >
                  {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
                </button>
              </div>
            </>
          )}

          {mode !== "login" && step === 3 && (
            <>
              <label>
                {mode === "signup" ? "Create Password" : "New Password"}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </>
          )}

          {mode === "signup" && (
            <div className="auth-terms-acceptance">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="terms-checkbox"
                required
              />
              <label htmlFor="terms">
                <span>I agree to the </span>
                <Link to="/terms" className="link">
                  terms
                </Link>
                <span> and </span>
                <Link to="/privacy" className="link">
                  privacy policy
                </Link>
              </label>
            </div>
          )}

          {mode === "login" && (
            <button
              type="button"
              className="forgot-link-btn"
              onClick={() => {
                setMode("forgot");
                setStep(1);
                setFormData({
                  name: "",
                  emailId: "",
                  otp: "",
                  password: "",
                });
              }}
            >
              Forgot Password?
            </button>
          )}

          <button type="submit" className="authButton" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : step === 1
                  ? "Send OTP"
                  : step === 2
                    ? "Verify OTP"
                    : mode === "signup"
                      ? "Create Account"
                      : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
