import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/PasswordReset.css";
import { resetPassword } from "../services/apiMethods";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const email = location?.state?.email || "";

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character (e.g., Abhinav@2000)"
      );
    } else {
      try {
        let emailId = user ? user.email : email;
        const response = await resetPassword({
          email: emailId,
          oldPassword,
          password,
        });
        if (response.status === 200) {
          if (user) {
            toast.success("Password Changed Successfully");
            navigate("/user/profile");
          } else {
            toast.success("Password Changed Successfully");
            navigate("/");
          }
        }
      } catch (error) {
        toast.error(error?.response?.message || error?.message);
      }
    }
  };

  return (
    <div className="password-reset-container">
      <div className="password-reset-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          {user && (
            <div className="input-group">
              <label htmlFor="password">Enter Old Password</label>
              <input
                type="password"
                id="oldpassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="password">Enter Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Re-enter Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="password-reset-btn">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
