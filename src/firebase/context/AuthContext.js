import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Request from "../../Helpers/Request";



export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    const request = new Request();
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
      if (user) {
        request.get(`/api/users/uid/${user.uid}`)
          .then((user) => {
            setCurrentUser(user);
          })
      }


    });
  
  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //     console.log(user);
  //   });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};