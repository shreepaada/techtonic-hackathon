"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const HistoryItem = styled.li`
  margin: 10px 0;
`;

const LogoutButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #f44336;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d32f2f;
  }
`;
const api_url = "http://127.0.0.1:5000/"
const Profile: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          router.push("/loginpage");
          return;
        }
        const response = await axios.get("/api/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(response.data.history);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      await axios.post(
        `${api_url}api/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("auth_token");
      router.push("/loginpage");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProfileContainer>
      <h2>User Profile</h2>
      <h3>URL History</h3>
      <HistoryList>
        {history.map((url, index) => (
          <HistoryItem key={index}>{url}</HistoryItem>
        ))}
      </HistoryList>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </ProfileContainer>
  );
};

export default Profile;
