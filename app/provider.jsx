"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, {
  useEffect,
  useState,
  createContext,
  useRef,
} from "react";
import SelectedChapterIndexContext from "../context/SelectedChapterIndexContext";

export const UserDetailContext = createContext();

function Provider({ children }) {
  const { user, isLoaded } = useUser();
  const [userDetail, setUserDetail] = useState(null);
  const [SelectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (isLoaded && user && !hasCreatedUser.current) {
      hasCreatedUser.current = true;
      createNewUser();
    }
  }, [isLoaded, user]);

  const createNewUser = async () => {
    try {
      const res = await axios.post("/api/user", {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
      });
      setUserDetail(res.data);
    } catch (err) {
      console.error("User creation failed:", err);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SelectedChapterIndexContext.Provider
        value={{ SelectedChapterIndex, setSelectedChapterIndex }}
      >
        {children}
      </SelectedChapterIndexContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
