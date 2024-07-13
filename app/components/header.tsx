"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #fff;
  color: #000;
  position: fixed;
  width: 100%;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavItem = styled(motion.a)`
  font-size: 18px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  position: relative;

  &:hover {
    color: #ff8c00;
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    display: block;
    margin-top: 5px;
    right: 0;
    background: #ff8c00;
    transition: width 0.4s ease;
  }

  &:hover::after {
    width: 100%;
    left: 0;
    background: #ff8c00;
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
  background-color: #000;
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

const MobileMenuItem = styled(motion.a)`
  font-size: 24px;
  color: #fff;
  margin: 20px 0;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #ff8c00;
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

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <HeaderContainer>
        <Logo>CODE BUSTERS</Logo>
        <Nav>
          <NavItem href="#">Home</NavItem>
          <NavItem href="#">About Us</NavItem>
          <NavItem href="#">Sign Up</NavItem>
          <NavItem href="#">Malicious_Url</NavItem>
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
        <AnimatePresence>
          {menuOpen && (
            <MobileMenuContainer
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
            >
              <MobileMenuItem href="#" onClick={() => setMenuOpen(false)}>
                Home
              </MobileMenuItem>
              <MobileMenuItem href="#" onClick={() => setMenuOpen(false)}>
                About Us
              </MobileMenuItem>
              <MobileMenuItem href="#" onClick={() => setMenuOpen(false)}>
                Sign Up
              </MobileMenuItem>
              <MobileMenuItem href="#" onClick={() => setMenuOpen(false)}>
                Malicious_Url
              </MobileMenuItem>
            </MobileMenuContainer>
          )}
        </AnimatePresence>
      </HeaderContainer>
    </>
  );
};

export default Header;
