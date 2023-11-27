import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Detail from "./Detail";
import { Link } from "react-router-dom";
import "./css/Profile.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Dashboard from "./dashboard/Dashboard.js";

const Profile = ( {users, onCreateWalkie, onDeleteNotification} ) => {
  const [selectedOption, setSelectedOption] = useState("user");

  return (
    <>
      <div className="profile-container">
        <div className="sidebar">
          <Sidebar setSelectedOption={setSelectedOption} />
        </div>

        <div className="notifications">
          <button onClick={() => setSelectedOption("notifications")} className="notif-button">
            <p className="notif-button-info">Notifications</p>
          </button>
        </div>

        <div className="detail">
          <Detail selectedOption={selectedOption} users={users} onCreateWalkie={onCreateWalkie} onDeleteNotification={onDeleteNotification}/>
          <button className="logout-button" onClick={() => signOut(auth)}>
            <p className="logout-button-info">Logout</p>
          </button>
        </div>
        <div className="dashboard">
          <Dashboard />
        </div>
      </div>
    </>
  );
};

export default Profile;
