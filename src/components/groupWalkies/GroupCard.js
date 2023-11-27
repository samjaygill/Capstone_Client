import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/GroupCard.css";
import { AuthContext } from "../../firebase/context/AuthContext";

const GroupCard = ({ groupWalkies, onAddUser, onRemoveUser }) => {
  const { id } = useParams();
  const selectedWalk = groupWalkies.find((groupWalkie) => groupWalkie.id === parseInt(id));
  const { currentUser } = useContext(AuthContext);
  const isCurrentUserInGroup = selectedWalk && selectedWalk.users.some(user => user.id === currentUser.id);

  const addCurrentUser = async () => {
    onAddUser(selectedWalk.id, currentUser.id);
  };

  const removeCurrentUser = async () => {
    onRemoveUser(selectedWalk.id, currentUser.id)
  };

  if (!selectedWalk) {
    return <div>Walk not found</div>;
  }
  return (
    <div className="group-card-container">
      <div className="group-card-wrapper">
        <div className="group-card-details">
        <img src={selectedWalk.photoURL} className="gw-card-image" alt="group-walk"/>
          <h2>{selectedWalk.name}</h2>
          <p>
          Date: {new Date(selectedWalk.date).toLocaleDateString()} <br />
          Time: {new Date(selectedWalk.date).toLocaleTimeString()}<br/>
            Location: {selectedWalk.location}
            <br />
            Distance: {selectedWalk.distance} miles <br />
            Duration: {selectedWalk.duration} minutes <br />
            <br />
          </p>
        </div>

        <div className="attendees">
        

          {selectedWalk.users.map((user) => (
            <li className="users" key={user.id}>
              <Link to={`/members/${user.id}`}>
                {user.firstName} {user.lastName}
              </Link>
            </li>
          ))}
          {isCurrentUserInGroup ? (
          <button className="gc-button" onClick={removeCurrentUser} ><p className="gc-button-info">Withdraw</p></button>
        ) : (
          <button className="gc-button" onClick={addCurrentUser}><p className="gc-button-info">Join</p></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
