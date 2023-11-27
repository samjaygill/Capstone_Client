import React from "react";
import { Link } from "react-router-dom";

import "./css/Dog.css";

const Dog = ({ dog }) => {
  return (
    <Link to={`/dogs/${dog.id}`}>
      <div className="dog">
        <p>{dog.name}</p>
        <img className="dog-img-sm" src={dog.photoURL} alt="image of dog"></img>
      </div>
    </Link>
  );
};

export default Dog;
