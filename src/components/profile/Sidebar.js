import React from 'react'
import { Link } from 'react-router-dom'
import "./css/SideBar.css"

const Sidebar = ({setSelectedOption}) => {
  return (
    <>    
    <div className='sidebar-container'>
    <button className="sb-button" onClick={()=> setSelectedOption("user")}> <p className='sb-button-info'>My Info</p></button>

    <button className="sb-button" onClick={()=> setSelectedOption("dog")}> <p className='sb-button-info'>My Dogs</p></button>
    </div>
    </>
  )
}

export default Sidebar