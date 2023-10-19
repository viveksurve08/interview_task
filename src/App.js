import React, { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const fetchRandomUser = async () => {
    try {
      const response = await fetch("https://randomuser.me/api");
      if (response.ok) {
        const data = await response.json();
        const user = data.results[0];
        setUserData(user);
        localStorage.setItem("randomUserData", JSON.stringify(user));
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const refreshUser = () => {
    fetchRandomUser();
  };

  return (
    <div className="App">
      <h1>Random User Information</h1>
      {userData && userData.name && (
        <div className="UserContainer">
          <img
            src={userData.picture.large}
            alt={`${userData.name.first}'s picture`}
            className="UserPicture"
          />
          <p className="FullName">
            Full Name: {userData.name.first} {userData.name.last}
          </p>
          <p className="Email">Email Address: {userData.email}</p>
        </div>
      )}
      <button onClick={refreshUser}>Refresh</button>
    </div>
  );
}

export default App;
