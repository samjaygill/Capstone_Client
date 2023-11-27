import React from "react";
import Group from "./Group";
import { Link } from "react-router-dom";
import './css/GroupList.css'

const GroupList = ({ groupWalkies, users }) => {
  const groupNodes = groupWalkies.map((groupWalk, id) => {
    return (
      <>
      <Link
        key={groupWalk.id}
        to={{ pathname: `/groupwalkies/${groupWalk.id}`, state: { groupWalk } }}
        className="group-link"
      >
        <li key={id} className="list">
          <Group groupWalk={groupWalk} users={users} />
        </li>
      </Link>
      </>
    );
  });
  return (
    <>
    <div className="main-container">
    <button className="gwl-button"><Link to={{pathname: "/creategroupwalk"}}><p className="button-info">Create</p></Link></button>
      <div className="group-list-container">
      {groupNodes}
      </div>
      </div>
    </>
  );
};

export default GroupList;
