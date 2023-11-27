import React from "react";
import "./css/Group.css";

const Group = ({ groupWalk }) => {
  return (
    <>
      <div className="group-wrapper" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${groupWalk.photoURL})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
        <div className="gw-info">
        <h2>{groupWalk.name}</h2>
        
          {/* {groupWalk.date}{" "}&#9900;{" "} */}
          {new Date(groupWalk.date).toLocaleDateString()}{"  "}&#9900;{"  "}
          {groupWalk.location}
          </div>
      </div>
    </>
  );
};

export default Group;
