import React, { useState, useEffect } from "react";
import axios from "axios";

type UserData = {
  name: string,
  email: string
};

const UserComponent: React.FC = () => {
  const [user, setUser] = (useState < UserData) | (null > null);

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      const userData = response.data.results[0];
      const { name, email } = userData;
      setUser({ name: `${name.first} ${name.last}`, email });
      // Save user data to local storage
      localStorage.setItem("userData", JSON.stringify({ name, email }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to refresh user data
  const refreshUserData = () => {
    setUser(null);
    localStorage.removeItem("userData");
    fetchUserData();
  };

  useEffect(() => {
    // Check if user data is available in local storage
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setUser(JSON.parse(savedUserData));
    } else {
      fetchUserData();
    }
  }, []);

  return (
    <div>
      <h1>User Information</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={refreshUserData}>Refresh</button>
    </div>
  );
};

export default UserComponent;
