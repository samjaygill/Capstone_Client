import React, { useContext } from 'react'
import WalkieCard from '../walkies/WalkieCard'
import { AuthContext } from "../../firebase/context/AuthContext"
import "./css/Notifications.css"
import { useNavigate } from 'react-router-dom'

const Notification = ({users, onDeleteNotification, onCreateWalkie}) => {
  const navigate = useNavigate
  const { currentUser } = useContext(AuthContext);

  const handleAccept = (notification) => {
    onCreateWalkie({
      location: notification.entries.Location,
      date: notification.entries.Date,
    });
  };
  
  const handleDeleteNotification = (id) => {
    fetch(`/api/notifications/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      navigate('/notifications');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  return (

    <div className='notifications-container'>
    <h2>Notification Centre</h2>
    
    {currentUser && currentUser.notifications && currentUser.notifications.length > 0 ? (
    currentUser.notifications.map((notification, index) => {
      const foundUser = users.find(user => typeof notification.sender === 'object' ? user.id === notification.sender.id : user.id === notification.sender);
    
      if (foundUser) {
        return (
          <div className='notification' key={index}>
            <h4>From: {foundUser.firstName} {foundUser.lastName}</h4>
            <p>Location: <b>{notification.entries.Location}</b></p>
            <p>Date: <b>{new Date(notification.entries.Date).toLocaleDateString()}</b></p>
            <p>Time: <b>{new Date(notification.entries.Date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</b></p>            <p>Message: <b>{notification.entries.Message}</b></p>
            <button className='mc-button' onClick={() => handleAccept(notification)}>Accept</button>
            <button className='mc-button' onClick={() => handleDeleteNotification(notification.id)}>Reject</button>
          </div>
        )
      }
    })
  ) : (
    <p>No notifications available</p>
  )}
  </div>
  )
}

export default Notification