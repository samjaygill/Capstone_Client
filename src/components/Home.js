import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../firebase/context/AuthContext";
import dogs from "./images/assets/IMG_0587.png";
import "./css/Home.css";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="home-container">
        <div className="home-wrapper">
          <div className="details">
            <p className="welcome">Welcome to </p>
            <p className="wiggle">Wiggle Waggy Walks!</p>
            {/* {currentUser && `${currentUser.firstName}`} */}

            {/* {currentUser && <img src={currentUser.photoURL} alt='' style={{ height: '200px', width: '200px', objectFit: 'cover', borderRadius: '50%'}}/>}<br></br>
             */}
          </div>
          <div className="home-image">
            <img src={dogs} alt="dogs" className="dogs" />
          </div>
        </div>
      </div>
      <div className="button">
        {!currentUser && (
        <button className="enter">
          <Link to="/login" className="login">
            Get Started
          </Link>
        </button>
        )}

      </div>
    </>
  );
};

export default Home;
