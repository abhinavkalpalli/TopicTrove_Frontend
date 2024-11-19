import React, { useState, useEffect } from "react";
import "./CSS/signup.css";
import signupImage from "../assets/signup.png";
import {
  Container,
  CssBaseline,
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import dayjs from "dayjs";
import { register, getAllPreferences } from "../services/apiMethods";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [articlePreferences, setArticlePreferences] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const response = await getAllPreferences();
      if (response.status === 200) {
        setArticlePreferences(response.data.preferences);
        console.log(articlePreferences);
      }
    } catch (error) {
      toast.error(
        error?.response?.message || error?.message || "An error occurred"
      );
    }
  };

  const handleSelectPreference = (preferenceId) => {
    setSelectedPreferences((prev) => {
      if (prev.includes(preferenceId)) {
        return prev.filter((id) => id !== preferenceId);
      } else {
        return [...prev, preferenceId];
      }
    });
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateForm = (event) => {
    const newErrors = {};

    if (!event.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!event.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(event.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(event.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!event.dob) {
      newErrors.dob = "Date of birth is required";
    }

    const password = event.password;
    const confirmPassword = event.password2;
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must include uppercase, lowercase, number, and special character (e.g. Abhinav@2000)";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password !== confirmPassword) {
      newErrors.password2 = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formValues = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      dob: event.target.dob.value,
      password: event.target.password.value,
      password2: event.target.password2.value,
    };

    if (!validateForm(formValues)) {
      return;
    }

    const formData = {
      ...formValues,
      dob: formValues.dob
        ? dayjs(formValues.dob).format("YYYY-MM-DD")
        : undefined,
      preferences: selectedPreferences, // Send preference IDs
    };

    try {
      const response = await register(formData);
      if (response.status === 201) {
        const { email, otp } = response.data;
        navigate("/OtpVerification", { state: { email, otp } });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.message || error?.message || "An error occurred"
      );
    }
  };

  return (
    <Container component="main" maxWidth="lg" className="signup-container">
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={4}
          md={7}
          style={{
            backgroundImage: `url(${signupImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="signup-image"
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className="signup-form-container"
        >
          <Box className="signup-box">
            <Typography component="h1" variant="h5" className="signup-title">
              Sign up
            </Typography>
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
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                type="tel"
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="dob"
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.dob}
                helperText={errors.dob}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Re-enter Password"
                type="password"
                id="password2"
                autoComplete="new-password"
                error={!!errors.password2}
                helperText={errors.password2}
              />

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Article Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articlePreferences.map((preference) => (
                    <div
                      key={preference._id}
                      className={`p-2 rounded-lg cursor-pointer ${
                        selectedPreferences.includes(preference._id)
                          ? "bg-blue-100"
                          : "bg-gray-100"
                      }`}
                      onClick={() => handleSelectPreference(preference._id)}
                    >
                      {preference.name}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="signup-button"
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2" className="signup-link">
                    Already have an account? Sign in
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
