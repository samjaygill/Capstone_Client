import React, { useContext, useEffect, useState } from "react";
import './css/Member.css'
import { AuthContext } from "../../firebase/context/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Member = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.favourites) {
      setFavourites(currentUser.favourites);
    }
  }, [currentUser]);

  const isUserInFavorites = () => {
    return favourites.some((fav) => fav.id === user.id);
  };


  return (
      <div className="member-wrapper">
        <div>
      <img src={user.photoURL} alt="user" className="member-image" />
      <p className="member-name">

        {user.firstName} {user.lastName}
      </p>
    </div>
    </div>
  );
};

export default Member;
