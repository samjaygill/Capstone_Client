import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  redirect,
} from "react-router-dom";
import MembersList from "../components/members/MembersList";
import Request from "../Helpers/Request";
import Register from "../firebase/Register";
import Home from "../components/Home";
import Login from "../firebase/Login";
import Profile from "../components/profile/Profile";
import MemberCard from "../components/members/MemberCard";
import WalkieForm from "../components/walkies/WalkieForm";
import Notification from "../components/profile/Notification";
import GroupCard from "../components/groupWalkies/GroupCard";
import GroupList from "../components/groupWalkies/GroupList";
import DogForm from "../components/profile/dogs/DogForm";
import DogDetail from "../components/profile/dogs/DogDetail";
import UserDetail from "../components/profile/UserDetail";
import DogCard from "../components/profile/dogs/DogCard";
import CurrentUserDetail from "../components/profile/currentUser/CurrentUserDetail";
import WalkieTalkie from "../firebase/WalkieTalkie";
import { AuthContext } from "../firebase/context/AuthContext";
import GroupWalkieForm from "../components/groupWalkies/GroupWalkieForm";
import Footer from "../components/Footer";
import Faq from "../components/FAQ/Faq";
import CurrentUserForm from "../components/profile/currentUser/CurrentUserForm";


const MainContainer = () => {
  const [users, setUsers] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [walkies, setWalkies] = useState([]);
  const [groupWalkies, setGroupWalkies] = useState([]);
  const [userDogs, setUserDogs] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const request = new Request();

    const userPromise = request.get("/api/users");
    const dogPromise = request.get("/api/dogs");
    const walkiesPromise = request.get("/api/walkies");
    const groupWalkiesPromise = request.get("/api/groupwalkies");
    const locationPromise = request.get("/api/locations");

    Promise.all([
      userPromise,
      dogPromise,
      walkiesPromise,
      groupWalkiesPromise,
      locationPromise,
    ]).then((data) => {
      setUsers(data[0]);
      setDogs(data[1]);
      setWalkies(data[2]);
      setGroupWalkies(data[3]);
      setLocation(data[4]);
    });
  }, []);

  const handlePost = (user) => {
    console.log("Posting user:", user);
    const request = new Request();
    request.post("/api/users", user).then(() => {
    });
  };

  const handleAddDog = (dog) => {
    console.log("Updating Dogs:", dog);
    const request = new Request();
    request.post("/api/dogs", dog).then(() => {});
  };

  const handleGroupWalk = (groupWalk) => {
    const request = new Request();
    request.post("/api/groupwalkies", groupWalk).then(() =>{})
  }

  const handleUpdateUser = async (user) => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        console.error('Failed to update user:', response.statusText);
      }
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  const handleDeleteDog = (id) => {
    const request = new Request();
    request.delete(`/api/dogs/${id}`).then(() => {
      window.location = "/profile";
    });
  };

  const handleAddUserToGroupWalkie = (walkieId, userId) => {
    const request = new Request();
    request
      .post(`/api/groupwalkies/${walkieId}/users/${userId}`, {})
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          window.location.reload();
        } else {
          console.log("User has not been added due to an error");
        }
      });
  };

  const handleRemoveUserFromGroupWalkie = (walkieId, userId) => {
    const request = new Request();
    request
      .delete(`/api/groupwalkies/${walkieId}/users/${userId}`, {})
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          window.location.reload();
        } else {
          console.log("User has not been removed due to an error");
        }

      });
  };

  const handleCreateWalkie = (walkie) => {
    const request = new Request();
    request.post("/api/walkies", walkie).then(() => {});
  };

  const handleDeleteNotification = (id) => {
    const request = new Request();
    request.delete(`/api/notifications/${id}`).then(() => {
    });
  };

  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register onCreate={handlePost} />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dogs/:id"
          element={<DogCard onDelete={handleDeleteDog} />}
        />

        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <MembersList users={users} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile users={users} onCreateWalkie={handleCreateWalkie} onDeleteNotification={handleDeleteNotification}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateprofile"
          element={
            <ProtectedRoute>
              <CurrentUserForm onUpdateUser={handleUpdateUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="members/:id/walkiesForm"
          element={
            <ProtectedRoute>
              <WalkieForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members/:id"
          element={
            <ProtectedRoute>
              <MemberCard users={users} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groupwalkies/:id"
          element={
            <ProtectedRoute>
              <GroupCard
                groupWalkies={groupWalkies}
                onAddUser={handleAddUserToGroupWalkie}
                onRemoveUser={handleRemoveUserFromGroupWalkie}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groupwalkies"
          element={
            <ProtectedRoute>
              <GroupList groupWalkies={groupWalkies} users={users} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newDog"
          element={
            <ProtectedRoute>
              <DogForm onCreate={handleAddDog} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dogs"
          element={
            <ProtectedRoute>
              <DogDetail users={users} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <CurrentUserDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/walkietalkie"
          element={
            <ProtectedRoute>
              <WalkieTalkie />
            </ProtectedRoute>
          }
        />

        <Route
          path="/creategroupwalk"
          element={
            <ProtectedRoute>
              <GroupWalkieForm
                groupWalkies={groupWalkies}
                onCreate={handleGroupWalk}
              />
            </ProtectedRoute>
          }
        />

<Route
          path="/faq"
          element={
            <ProtectedRoute>
              <Faq/>
            </ProtectedRoute>
          }
        />
      

        {/* <MembersList users={users}/> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
        
};

export default MainContainer;
