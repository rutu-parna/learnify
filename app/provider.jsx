"use client";

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';

// Create Context
export const UserDetailContext = createContext();

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user]);

  const createNewUser = async () => {
    try {
      const result = await axios.post('/api/user', {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress
      });
      console.log(result.data);
      setUserDetail(result.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;
