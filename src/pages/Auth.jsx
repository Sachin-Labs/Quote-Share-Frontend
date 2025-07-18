import { Link, useNavigate } from "react-router";
import React, { useState,useEffect } from "react";
import "../styles/auth.css";
import axios from "axios";

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
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
    if (!canResend && step === 2) {
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
  }, [canResend, step]);

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
      setIsLogin(true);
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

  return (
    <div className="login-container">
      <img src="/LoginSideImage.jpg" alt="side-image" />
      <div className="login-card">
        <h1>{isLogin ? "Welcome Back" : "Create an account"}</h1>

        <div className="toggle-container">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            className="toggle-button"
            onClick={() => {
              setIsLogin(!isLogin);
              setStep(1);
              setFormData({ name: "", emailId: "", otp: "", password: "" });
            }}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>

        <form
          className="login-form"
          onSubmit={
            isLogin
              ? handleLogin
              : step === 1
              ? handleSignupStep1
              : step === 2
              ? handleVerifyOtp
              : handleFinalRegister
          }
        >
          {!isLogin && step === 1 && (
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
            readOnly={!isLogin && step > 1}
          />

          {isLogin && (
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

          {!isLogin && step === 2 && (
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

          {!isLogin && step === 3 && (
            <>
              <label>Create Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </>
          )}

          <div className="terms-container">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="terms-checkbox"
              required
            />
            <label htmlFor="terms">
              I agree to the
              <Link to="/terms" className="link">
                terms
              </Link>
              and
              <Link to="/privacy" className="link">
                privacy policy
              </Link>
            </label>
          </div>

          <button type="submit" className="authButton" disabled={loading}>
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : step === 1
              ? "Send OTP"
              : step === 2
              ? "Verify OTP"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
