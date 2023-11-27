import React from 'react'

import '../style.scss'
import Sidebar from './components/SideBar'
import Chat from './components/Chat'

const WalkieTalkie = () => {
  return (
    <div className='home'>
        <div className="container">
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}

export default WalkieTalkie