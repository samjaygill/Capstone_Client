import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../../firebase'
import { AuthContext } from '../context/AuthContext'


const Navbar = () => {

  const {currentUser} = useContext(AuthContext)
  
  return (
    <div className='navbar'>
        <span className='talkie-logo'>Walkie Talkie</span>
        <div className="user">
            <img src={currentUser.photoURL} alt=''/>
            <span>{currentUser.firstName}</span>
            <button onClick={()=>signOut(auth)}>logout</button>
        </div>
    </div>
  )
}

export default Navbar