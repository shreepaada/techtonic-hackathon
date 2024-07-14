"use client";
import React from "react";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";

// Import GSAP and plugins dynamically
import { gsap } from "gsap/dist/gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { Flip } from "gsap/dist/Flip";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Observer } from "gsap/dist/Observer";
import { Draggable } from "gsap/dist/Draggable";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { EaselPlugin } from "gsap/dist/EaselPlugin";
import { PixiPlugin } from "gsap/dist/PixiPlugin";
import { TextPlugin } from "gsap/dist/TextPlugin";

gsap.registerPlugin(
  ScrollToPlugin,
  Flip,
  ScrollTrigger,
  Observer,
  Draggable,
  MotionPathPlugin,
  EaselPlugin,
  PixiPlugin,
  TextPlugin
);

const FooterContainer = styled.footer`
  background-color: #111;
  color: #fff;
  padding: 20px 10px;
  text-align: center;
  position: relative;
  z-index: 10;
`;

const SocialSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  gap: 80px;
`;

const SocialIconWithName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 20px;
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

const SectionDivider = styled.div`
  width: 1px;
  height: 50px;
  background-color: #fff;
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
  bottom: 20px;
  right: 20px;
  background: #ff8c00;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 20;
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease;

  &:hover {
    background: #ff6500;
  }
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
    gsap.to(window, { duration: 1, scrollTo: { y: 0, autoKill: true } });
  };

  return (
    <>
      <FooterContainer>
        <SocialSection>
          <SocialIconWithName>
            <SocialIcons>
              <SocialIcon
                href="https://linkedin.com/in/sourabh"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <FaLinkedin />
              </SocialIcon>
              <SocialIcon
                href="https://github.com/sourabh"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <FaGithub />
              </SocialIcon>
            </SocialIcons>
            <p>Sourabh</p>
          </SocialIconWithName>
          <SectionDivider />
          <SocialIconWithName>
            <SocialIcons>
              <SocialIcon
                href="https://linkedin.com/in/shreepaada"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <FaLinkedin />
              </SocialIcon>
              <SocialIcon
                href="https://github.com/shreepaada"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <FaGithub />
              </SocialIcon>
            </SocialIcons>
            <p>Shreepaada</p>
          </SocialIconWithName>
        </SocialSection>
        <p>
          Made with <WaveEmoji>👋</WaveEmoji> by Code Busters
        </p>
        <UpArrowContainer
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={scrollToTop}
        >
          <FiArrowUp />
        </UpArrowContainer>
      </FooterContainer>
      <BackgroundAnimated />
    </>
  );
};

export default Footer;
