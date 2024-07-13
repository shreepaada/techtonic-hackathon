// AboutUs.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import "tailwindcss/tailwind.css";

const AboutContainer = styled.div`
  padding: 100px 40px 60px 40px; /* Increased padding-top to move content down from the header */
  background-color: #f5f5f5;
  color: #333;
  min-height: 100vh;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
  color: #000;
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #000;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  text-align: center;
  margin: 20px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Name = styled.h3`
  font-size: 18px;
  color: #000;
`;

const AboutUs: React.FC = () => {
  return (
    <AboutContainer>
      <Section>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Title>About Malicious URL Detection with Machine Learning</Title>
            <Text>
              Malicious URL detection is a crucial task in cybersecurity, aiming
              to identify and block harmful websites before they can cause
              damage. Machine learning techniques have proven to be highly
              effective in this domain, leveraging vast amounts of data to
              detect patterns and anomalies that indicate malicious intent. By
              training models on known malicious and benign URLs, these systems
              can learn to distinguish between harmful and safe sites with high
              accuracy. This technology plays a vital role in protecting users
              and networks from phishing, malware, and other cyber threats.
            </Text>
          </motion.div>
        </AnimatePresence>
      </Section>
      <Section>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Title>Our Team</Title>
            <ImageContainer>
              <ImageWrapper>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                >
                  <Image src="/photos/shreepaada.jpg" alt="Shreepaada M C" />
                  <Name>Shreepaada M C</Name>
                </motion.div>
              </ImageWrapper>
              <ImageWrapper>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                >
                  <Image src="/photos/sourabh2.jpg" alt="Sourabh J Gor" />
                  <Name>Sourabh J Gor</Name>
                </motion.div>
              </ImageWrapper>
            </ImageContainer>
          </motion.div>
        </AnimatePresence>
      </Section>
    </AboutContainer>
  );
};

export default AboutUs;
