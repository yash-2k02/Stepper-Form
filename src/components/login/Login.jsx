import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { SignJWT } from "jose";
import styles from './Login.module.css'

const KEY = import.meta.env.VITE_KEY;
const SECRET_KEY = new TextEncoder().encode(KEY);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const generateToken = async (payload) => {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(SECRET_KEY);
    return token;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "yashdp@gmail.com" && password === "123") {
      const token = await generateToken({ email, role: "user", name: "Yash" });
      localStorage.setItem("authToken", token);
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className={styles.login_container}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            px: 4,
            py: 7,
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            Welcome back
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Please enter your details
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={
              {
                // width: "100%",
                // p: 3,
                // bgcolor: "#fff",
                // borderRadius: 2,
                // boxShadow: 1,
              }
            }
          >
            <TextField
              type="email"
              fullWidth
              margin="normal"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              // sx={{ my: 1 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    size="small"
                  />
                }
                label="Remember me"
              />

              <Link href="#" fontSize={14}>
                Forgot password
              </Link>
            </Stack>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 1,
                backgroundColor: "#6A0DAD",
                "&:hover": { backgroundColor: "#5900b3" },
                textTransform: "none",
                fontWeight: 500,
                fontSize: 16,
                py: 1.2,
              }}
            >
              Sign in
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<FcGoogle />}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                fontSize: 16,
                py: 1.2,
              }}
            >
              Sign in with Google
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3 }}
              color="text.secondary"
            >
              Don’t have an account?{" "}
              <Link href="#" underline="hover">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
