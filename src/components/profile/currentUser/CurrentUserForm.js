import React, { useContext, useState } from "react";
import { AuthContext } from "../../../firebase/context/AuthContext";
import "../css/CurrentUserForm.css";
import dog from "../../images/assets/dog1.png";
import { useNavigate } from "react-router-dom";

const CurrentUserForm = ({ onUpdateUser }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [user, setUser] = useState({
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    age: currentUser.age || null,
    gender: currentUser.gender || null,
  });

  const handleInputChange = (e) => {
    let propertyName = e.target.name;
    let copiedUser = { ...user };
    copiedUser[propertyName] = e.target.value;
    copiedUser.id = currentUser.id;
    setUser(copiedUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting user data:", user);
    onUpdateUser(user)
      .then(() => {
        window.location="/profile";
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="userform-container">
      <div className="dog-card">
        <img src={dog} alt="dog" className="dog-image" />
      </div>
      <div className="userform-card">
        <h2>Update your details:</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">
            First Name:{" "}
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label className="label">
            Last Name:{" "}
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label className="label">
            Age:{" "}
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label className="label">
            Gender:{" "}
            <select
              name="gender"
              value={user.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <br />
          <br />
          <button type="submit" className="cuf-button">
            <p className="cuf-button-info">Update User</p>
          </button>
        </form>
      </div>
      <div className="extra">
        
      </div>
    </div>
  );
};

export default CurrentUserForm;
