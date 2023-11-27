import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import logoSmall from "./images/small_logo.png";


const Register = ( {onCreate} ) => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [stateUser, setStateUser] = useState({
    displayName: "",
    lastName: "",
    email: ""
  })

  const handleInputChange = (e) => {
    let propertyName = e.target.name;
    let copiedUser = {...stateUser}
    copiedUser[propertyName] = e.target.value
    setStateUser(copiedUser)
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    
    const displayName = e.target[0].value;
    const lastName = e.target[1].value;
    const emailAddress = e.target[2].value;
    const password = e.target[3].value;
    const file = e.target[4].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, emailAddress, password);
      console.log(res);

      const userWithUid = {
        ...stateUser,
        uid: res.user.uid
      };
      
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                lastName,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                lastName,
                emailAddress,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "userChats", res.user.uid), {});
              
              window.location.href = "/profile"

              onCreate({
                ...userWithUid,
                photoURL: downloadURL,
              });
              
            } catch (err) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        }
      );
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };
  
  return (
    <div className="formContainer">
      <div className="formWrapper">
      <img src={logoSmall} className="small-logo"/>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit} id="register">
          <input type="text" placeholder="first name" name="firstName" onChange={handleInputChange}/>
          <input type="text" placeholder="last name" name="lastName" onChange={handleInputChange}/>
          <input type="email" placeholder="email address" name="email" onChange={handleInputChange}/>
          <input type="password" placeholder="password" />
          <input type="file" id="file" />
          <button>Sign up</button>
          {/* {loading && "Uploading and compressing the image please wait..."} */}
          {err && <span>Something went wrong..</span>}
        </form>
        <p>You have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};
export default Register;