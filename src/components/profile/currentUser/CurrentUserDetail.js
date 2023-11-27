import React, { useContext } from "react";
import { AuthContext } from "../../../firebase/context/AuthContext";
import "../css/UserDetail.css";
import { Link } from "react-router-dom";
import CurrentUserForm from "./CurrentUserForm";

const CurrentUserDetail = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="current_user_container">
      <div className="user-header">Logged in as {currentUser.firstName}</div>
      <div className="user-card">
        <p className="photo">
          {currentUser && <img src={currentUser.photoURL} alt="" />}
          <br></br>
        </p>
        <div className="user-details">
          <p>
            Name: {currentUser.firstName} {currentUser.lastName}
          </p>

          <p>Age: {currentUser.age}</p>
          <p>Login Details: {currentUser.email}</p>
          <p>Gender: {currentUser.gender}</p>

          <Link to="/updateprofile">
        <button className="cud-button"><p className="cud-button-info">Update Profile</p></button>
      </Link>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserDetail;
