"use client";
import React from "react";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { FaInstagram, FaLinkedin, FaArrowUp } from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: #111;
  color: #fff;
  padding: 40px 20px;
  text-align: center;
  position: relative;
  z-index: 10;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const SocialIcon = styled(motion.a)`
  color: #fff;
  font-size: 24px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff8c00;
  }
`;

const waveAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const WaveEmoji = styled.span`
  display: inline-block;
  animation: ${waveAnimation} 2s infinite;
`;

const UpArrowContainer = styled(motion.div)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #ff8c00;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 20;
`;

const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const BackgroundAnimated = styled.div`
  background: linear-gradient(270deg, #ff8c00, #111, #ff8c00);
  background-size: 600% 600%;
  animation: ${backgroundAnimation} 16s ease infinite;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <FooterContainer>
        <SocialIcons>
          <SocialIcon
            href="https://instagram.com"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <FaInstagram />
          </SocialIcon>
          <SocialIcon
            href="https://linkedin.com"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <FaLinkedin />
          </SocialIcon>
        </SocialIcons>
        <p>
          Made by <WaveEmoji>👋</WaveEmoji> Code Busters
        </p>
        <UpArrowContainer
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={scrollToTop}
        >
          <FaArrowUp color="#fff" />
        </UpArrowContainer>
      </FooterContainer>
      <BackgroundAnimated />
    </>
  );
};

export default Footer;
