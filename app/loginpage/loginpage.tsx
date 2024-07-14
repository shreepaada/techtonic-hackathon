"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { useRouter } from "next/navigation";


const api_url = "http://127.0.0.1:5000/"
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const FormWrapper = styled(motion.div)`
  width: 350px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  color: black;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const RegisterButton = styled(Button)`
  background-color: #008cba;

  &:hover {
    background-color: #007bb5;
  }
`;

const SwitchButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;

const InfoText = styled.p`
  font-size: 12px;
  color: #555;
  margin: 0;
`;

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
  margin: 0;
`;

const Popup = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const pageVariants = {
  initial: { opacity: 0, x: "100%" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "-100%" },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const router = useRouter();

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      try {
        
        const response = await axios.post(
          `${api_url}api/register`,
          {
            username: username,
            email: email,
            password: password,
          },
          {
            withCredentials: true, // Enable sending cookies cross-origin
            headers: {
              'Content-Type': 'application/json',
              // Add CORS headers here if necessary
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            },
          }
        );
       if (response.data.status === "success") {
          setErrorMessage("");
          setShowPopup(true);
          setPopupMessage("Registration successful!");
          setTimeout(() => {
            setShowPopup(false);
            setIsRegister(false);
          }, 3000);
        }
      } catch (error) {
        setErrorMessage("Registration failed");
      }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;

    try {
      const response = await axios.post(`${api_url}api/login`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true, // Enable sending cookies cross-origin
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          },
      });
      if (response.data.status === "success") {
        localStorage.setItem("auth_token", response.data.token);
        setShowPopup(true);
        setPopupMessage("Login successful!");
        setTimeout(() => {
          setShowPopup(false);
          router.push("/profile");
        }, 3000);
      }
    } catch (error) {
      setErrorMessage("Login failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      router.push("/profile");
    }
  }, [router]);

  return (
    <Container>
      <AnimatePresence mode="wait">
        <FormWrapper
          key={isRegister ? "register" : "login"}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.2}
        >
          {!isRegister ? (
            <motion.div>
              <h3 className="text-xl font-semibold mb-4">
                Sign in or create account
              </h3>
              <Form onSubmit={handleLoginSubmit}>
                <Input type="text" placeholder="Username" name="username" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Continue</Button>
                <InfoText>
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-blue-500">
                    Conditions of Use
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500">
                    Privacy Notice
                  </a>
                  .
                </InfoText>
                <SwitchButton type="button" onClick={() => setIsRegister(true)}>
                  New to our site? Register Now
                </SwitchButton>
              </Form>
            </motion.div>
          ) : (
            <motion.div>
              <h3 className="text-xl font-semibold mb-4">Create account</h3>
              <Form onSubmit={handleRegisterSubmit}>
                <Input type="text" placeholder="Your Name" name="username" />
                <Input type="email" placeholder="Email" name="email" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
                <RegisterButton type="submit">
                  Create your account
                </RegisterButton>
                <SwitchButton
                  type="button"
                  onClick={() => setIsRegister(false)}
                >
                  Already have an account? Sign in
                </SwitchButton>
              </Form>
            </motion.div>
          )}
        </FormWrapper>
      </AnimatePresence>
      {showPopup && (
        <Popup
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          {popupMessage}
        </Popup>
      )}
    </Container>
  );
};

export default LoginPage;
