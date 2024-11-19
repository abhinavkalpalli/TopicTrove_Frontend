// src/pages/login/Login.js
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./CSS/login.css";
import bck from "../assets/login.png";
import { login } from "../services/apiMethods";
import { userAuth, refreshToken } from "../const/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { setReduxUser } from "../utils/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  // State for email or phone number and password
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.user?.userData);
  useEffect(() => {
    if (userData) {
      navigate("/user/posts");
    }
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!emailOrPhone || !password) {
      setError("Email/Phone number and password are required");
      return;
    }

    // Email validation (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Adjust as needed for your phone number format

    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setError("Please enter a valid email address or phone number");
      return;
    }

    setError("");

    try {
      const response = await login({ emailOrPhone, password });
      if (response.status === 200) {
        localStorage.setItem(userAuth, response.data.tokens.accessToken);
        localStorage.setItem(refreshToken, response.data.tokens.refreshToken);
        dispatch(setReduxUser({ userData: response.data, validUser: true }));
        navigate("/user/posts");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <Container component="main" maxWidth="lg" className="login-container">
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          className="login-image"
          style={{
            backgroundImage: `url(${bck})`,
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className="login-form-container"
        >
          <Box className="login-box">
            <Typography component="h1" variant="h5" className="login-title">
              Login
            </Typography>
            {error && <Typography color="error">{error}</Typography>}{" "}
            {/* Show error message */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="emailOrPhone"
                label="Email Address or Phone Number"
                name="emailOrPhone"
                autoComplete="emailOrPhone"
                autoFocus
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)} 
                sx={{
                  backgroundColor: "#f0f0f0", 
                  borderRadius: "5px", 
                  "& .MuiInputBase-root": {
                    padding: "8px", 
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    borderColor: "#007bff", 
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                sx={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px", 
                  "& .MuiInputBase-root": {
                    padding: "8px", 
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    borderColor: "#007bff", 
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login-button"
              >
                Sign In
              </Button>
              <Grid container className="login-link-container">
                <Grid item xs>
                  <Link href="/forgotPassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
