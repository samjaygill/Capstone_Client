import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../../firebase'
import { AuthContext } from '../context/AuthContext'
import chat_logo from "../images/chat_logo.png"


const Navbar = () => {

  const {currentUser} = useContext(AuthContext)
  
  return (
    <div className='navbar'>
        <span className='talkie-logo'><img src={chat_logo} alt='logo' className='chat-logo'/></span>
        <div className="user">
            <img src={currentUser.photoURL} alt=''/>
            <span className='nav-name'>{currentUser.firstName}</span>
            <button onClick={()=>signOut(auth)}>logout</button>
        </div>
    </div>
  )
}

export default Navbar