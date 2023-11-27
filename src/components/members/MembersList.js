import React, { useContext } from "react";
import Member from "./Member";
import { Link } from "react-router-dom";
import './css/MembersList.css'
import { AuthContext } from "../../firebase/context/AuthContext";

const MembersList = ({ users }) => {
  const { currentUser } = useContext(AuthContext);
  const usersNodes = users.filter(user => user.id !== currentUser.id).map((user, id) => {

    return (
      <Link
        key={user.id}
        to={{ pathname: `/members/${user.id}`, state: { user } }}
      >
          <Member user={user} />
      </Link>
    );
  });
  return (
    <>
    <div className="members-list-container">
        {usersNodes}
        </div>
        </>
  );
};

export default MembersList;
