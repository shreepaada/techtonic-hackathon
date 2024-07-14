"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import "tailwindcss/tailwind.css";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import Link from "next/link";

gsap.registerPlugin(TextPlugin);

const IntroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const BackgroundAnimation = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f06, #ffba00, #00f);
  background-size: 600% 600%;
  z-index: -1;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 80%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Content = styled(motion.div)`
  flex: 1;
  padding: 20px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  text-align: justify; /* Justify the text */
`;

const HeadingContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
`;

const HeadingLetter = styled(motion.span)`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-right: 5px;
  margin-left: 5px;
`;

const ModernButton = styled(motion.a)`
  display: inline-block;
  background: linear-gradient(45deg, #555555, #888888);
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  position: relative;
  overflow: hidden;

  &:hover {
    color: #fff;
  }
`;

const Particles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const particleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
};

type GeometryProps = {
  r: number;
  position: [number, number, number];
  geometry: THREE.BufferGeometry;
  soundEffects: HTMLAudioElement[];
  materials: THREE.MeshStandardMaterial[];
};

const Shapes = () => {
  const geometries = [
    { position: [0, 0, 0], r: 0.3, geometry: new THREE.IcosahedronGeometry(3) }, // Gem
    {
      position: [1, -0.75, 4],
      r: 0.4,
      geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16),
    }, // Pill
    {
      position: [-1.4, 2, -4],
      r: 0.6,
      geometry: new THREE.DodecahedronGeometry(1.5),
    }, // Soccer ball
    {
      position: [-0.8, -0.75, 5],
      r: 0.5,
      geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32),
    }, // Donut
    {
      position: [1.6, 1.6, -4],
      r: 0.7,
      geometry: new THREE.OctahedronGeometry(1.5),
    }, // Diamond
  ];

  const soundEffects = [
    new Audio("/sounds/hit2.ogg"),
    new Audio("/sounds/hit3.ogg"),
    new Audio("/sounds/hit4.ogg"),
  ];

  const materials: THREE.MeshStandardMaterial[] = [
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0x2980b9,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.1,
      metalness: 0.5,
    }),
  ];

  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)} // Unique key
      position={position.map((p) => p * 2) as [number, number, number]}
      geometry={geometry}
      soundEffects={soundEffects}
      materials={materials}
      r={r}
    />
  ));
};

const Geometry: React.FC<GeometryProps> = ({
  r,
  position,
  geometry,
  soundEffects,
  materials,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(false);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(event: ThreeEvent<MouseEvent>) {
    const mesh = event.object as THREE.Mesh;

    gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
      yoyo: true,
    });

    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current!.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: gsap.utils.random(0.8, 1.2),
        ease: "elastic.out(1,0.3)",
        delay: gsap.utils.random(0, 0.5),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        ></mesh>
      </Float>
    </group>
  );
};

const buttonVariants = {
  rest: {
    scale: 1,
    background: "linear-gradient(45deg, #555555, #888888)",
    color: "#fff",
    transition: { duration: 0.5 },
  },
  hover: {
    scale: 1.1,
    background: "linear-gradient(45deg, #ff6f61, #ffa500)",
    color: "#fff",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const Intro: React.FC = () => {
  const headingText = "Malicious URL Detection with Machine Learning";
  const words = headingText.split("  ");
  const letters = words.join(" ").split(" ");
  return (
    <IntroContainer>
      <BackgroundAnimation
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <Box
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ContentContainer>
          <HeadingContainer>
            {letters.map((letter, index) => (
              <HeadingLetter
                key={index}
                initial={{ rotateY: -90, color: "#000" }}
                animate={{ rotateY: 0, color: "#484848" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </HeadingLetter>
            ))}
          </HeadingContainer>
          <Content
            className="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
          >
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
            <Link href="/malacious" passHref>
              <ModernButton
                as={motion.a}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
              >
                Try It Out
              </ModernButton>
            </Link>
          </Content>
        </ContentContainer>
        <Canvas style={{ width: "50%", height: "400px" }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <Suspense fallback={null}>
            <Shapes />
            <ContactShadows
              position={[0, -3.5, 0]}
              opacity={0.65}
              scale={40}
              blur={1}
              far={9}
            />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
        <Particles>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={particleVariants}
          >
            {/* Add particle effects here */}
          </motion.div>
        </Particles>
      </Box>
    </IntroContainer>
  );
};

export default Intro;
