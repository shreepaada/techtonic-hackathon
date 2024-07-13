"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled, { createGlobalStyle } from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import Link from "next/link";

gsap.registerPlugin(ScrollToPlugin);

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #000;
    color: #fff;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #000;
  color: #fff;
  position: fixed;
  width: 100%;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
`;

const NavItem = styled(motion.div)`
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  transition: color 0.4s ease;

  &:hover {
    color: #888;
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    display: block;
    margin-top: 5px;
    right: 0;
    background: #888;
    transition: width 0.4s ease;
  }

  &:hover::after {
    width: 100%;
    left: 0;
    background: #888;
  }
`;

const BurgerContainer = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  width: 30px;
  height: 18px;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const BurgerLine = styled(motion.div)`
  width: 100%;
  height: 2px;
  background-color: #fff;
  border-radius: 2px;
`;

const MobileMenuContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: #111;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 60px 20px;
  z-index: 20;
`;

const MobileMenuItem = styled(motion.div)`
  font-size: 24px;
  color: #fff;
  margin: 20px 0;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #888;
  }
`;

const menuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const logoLetterVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    color: "#b0c4de", // Metallic-like color
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeInOut",
      type: "spring",
      stiffness: 300,
    },
  }),
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeInOut" },
  }),
};

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const logoText = "BUG BUSTERS";
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      const letters = logoRef.current.querySelectorAll("span");
      gsap.fromTo(
        letters,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "bounce.out",
          duration: 1,
          color: "#b0c4de",
        }
      );
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <HeaderContainer>
        <LogoContainer ref={logoRef}>
          {logoText.split("").map((letter, index) => (
            <motion.span
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={logoLetterVariants}
              style={{ display: "inline-block", marginRight: "4px" }}
              whileHover={{ scale: 1.2, color: "#ff8c00" }}
            >
              {letter}
            </motion.span>
          ))}
        </LogoContainer>
        <Nav>
          {[
            { label: "Home", href: "/intro" },
            { label: "About Us", href: "/aboutus" },
            { label: "Sign Up", href: "/loginpage" },
            { label: "Malicious_Url", href: "/malicious" },
          ].map((item, index) => (
            <Link key={item.label} href={item.href} passHref>
              <NavItem
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                whileHover={{ scale: 1.1, color: "#888" }}
              >
                {item.label}
              </NavItem>
            </Link>
          ))}
        </Nav>
        <BurgerContainer onClick={() => setMenuOpen(!menuOpen)}>
          <BurgerLine
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          />
          <BurgerLine animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
          <BurgerLine
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          />
        </BurgerContainer>
        <motion.div>
          {menuOpen && (
            <MobileMenuContainer
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
            >
              {[
                { label: "Home", href: "/intro" },
                { label: "About Us", href: "/aboutus" },
                { label: "Sign Up", href: "/loginpage" },
                { label: "Malicious_Url", href: "/malicious" },
              ].map((item) => (
                <Link key={item.label} href={item.href} passHref>
                  <MobileMenuItem onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </MobileMenuItem>
                </Link>
              ))}
            </MobileMenuContainer>
          )}
        </motion.div>
      </HeaderContainer>
    </>
  );
};

export default Header;
