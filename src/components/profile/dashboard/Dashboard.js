import React, { useContext } from "react";
import { AuthContext } from "../../../firebase/context/AuthContext";
import { Link } from "react-router-dom";
import "./css/Dashboard.css";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <p className="dashboard-title">Dashboard</p>
      <div className="dashboard-card">
        {currentUser ? (
          <>
            <div className="distance">
              <p className="title">Total distance walked</p>
              <p className="data">

                {/* {currentUser.totalDistance}  */}
                12.3 miles
              </p>

            </div>
            <div className="walkies">
              <p className="title">Total walkies attended</p>
              <p className="data"> 2

              </p>
            </div>
            <div className="group-walkies">
              <p className="title">Total group walkies attended</p>
              <p className="data">
                {/* {currentUser.groupWalkies ? currentUser.groupWalkies.length : 0} */}
                3
              </p>
            </div>
            <div className="favourites">
              <p className="title">My friends</p>

              {currentUser.favourites && currentUser.favourites.length > 0 ? (
                <ul className="fav-members">
                  {currentUser.favourites.map((favoriteUser) => (
                    <li key={favoriteUser.id}>
                      <p className="fav-members">
                        <a href={`/members/${favoriteUser.id}`}>
                          <img
                            src={favoriteUser.photoURL}
                            alt="favourite-member"
                            className="fav-image"
                          />{" "}
                          {favoriteUser.firstName}
                        </a>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="data">0</p>
              )}
            </div>
          </>
        ) : (
          <p className="data">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
