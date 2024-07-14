"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import "tailwindcss/tailwind.css";
import axios from "axios";
import withAuth from "./withauth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  height: 100vh;
`;

const FormWrapper = styled(motion.div)`
  width: 400px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
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

const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const FeedbackButton = styled(Button)`
  background-color: #008cba;

  &:hover {
    background-color: #007bb5;
  }
`;

const ResultText = styled.p`
  font-size: 16px;
  color: #333;
`;

const MaliciousUrl: React.FC = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleAnalyseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/analyse", { url });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error analysing URL:", error);
      setResult("Error analysing URL");
    }
  };

  const handleFeedback = async (isCorrect: boolean) => {
    try {
      await axios.post("/api/feedback", { url, feedback: isCorrect });
      setFeedback("Thank you for your feedback!");
      setTimeout(() => setFeedback(""), 3000);
    } catch (error) {
      console.error("Error sending feedback:", error);
      setFeedback("Error sending feedback");
    }
  };

  return (
    <Container>
      <FormWrapper
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
      >
        <h3 className="text-xl font-semibold mb-4">Analyse URL</h3>
        <Form onSubmit={handleAnalyseSubmit}>
          <Input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button type="submit">Analyse</Button>
        </Form>
      </FormWrapper>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <ResultText>Result: {result}</ResultText>
            <FeedbackContainer>
              <FeedbackButton onClick={() => handleFeedback(true)}>
                Correct
              </FeedbackButton>
              <FeedbackButton onClick={() => handleFeedback(false)}>
                Incorrect
              </FeedbackButton>
            </FeedbackContainer>
            {feedback && <ResultText>{feedback}</ResultText>}
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default withAuth(MaliciousUrl);
