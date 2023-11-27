import React, { useState, useEffect, useContext } from "react";
import DogDetail from "./dogs/DogDetail";
import Request from "../../Helpers/Request";
import CurrentUserDetail from "./currentUser/CurrentUserDetail";
import { AuthContext } from "../../firebase/context/AuthContext";
import Notification from "./Notification";

const Detail = ({ selectedOption, users, onCreateWalkie, onDeleteNotification }) => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState();

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.id;
      const request = new Request();
      request.get(`/api/users/${userId}`).then((data) => setUser(data));
    }
  }, [currentUser]);

  return (
    <>
      <div>
        {selectedOption === "user" ? <CurrentUserDetail user={user} onCreateWalkie={onCreateWalkie}/> : null}
        {selectedOption === "dog" ? (
          <DogDetail dogs={user ? user.dogs : []} />
        ) : null}
        {selectedOption === "notifications" ? <Notification users={users} onDeleteNotification={onDeleteNotification} onCreateWalkie={onCreateWalkie}/> : null}
      </div>
    </>
  );
};

export default Detail;
