import React, { useState } from 'react';
import "./css/GroupWalkieForm.css"
import dog from "../images/assets/dog7.png"
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const GroupWalkieForm = ({ onCreate }) => {
    const [file, setFile] = useState(null);
    const [stateGroupWalkies, setStateGroupWalkies] = useState({
        name: "",
        date: "",
        distance: 0,
        duration: 0,
        location: "",
        difficulty: "",
    });

    const handleChange = (event) => {
        let propertyName = event.target.name;
        let copiedGroupWalkie = { ...stateGroupWalkies };
        copiedGroupWalkie[propertyName] = event.target.value;
        setStateGroupWalkies(copiedGroupWalkie);
    };

    const handleSubmit =  (event) => {
        event.preventDefault()

        try {
            const storageRef = ref(storage, `groupwalks/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on('state_changed',
            (snapshot) => {},
            (error) => {console.log(error)},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    stateGroupWalkies.photoURL = downloadURL;
                    onCreate(stateGroupWalkies);
                    window.location="/groupwalkies"
                })
            }
            )
        } catch (error) {
            console.log(error)
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const handleLocation = function (event) {
        const selectedLocation = event.target.value
        let copiedLocation = { ...stateGroupWalkies };
        copiedLocation['location'] = selectedLocation
        setStateGroupWalkies(copiedLocation)

    }

    const locations = [
        "Kelvingrove",
        "Botanic Gardens",
        "Riverview Park",
        "Hyndford Glen Park",
        "Queens Park",
        "Pollok Country Park",
        "Roughholm Park",
        "Newlands Park",
        "Glasgow Green",
        "Alexandra Park",
        "Victoria Park",
        "Rogart Street Park",
        "Barrowland Park",
        "Springburn Park",
        "Ruchill Park",
        "Kelvin Meadows Park",
        "Summerston Park",
        "Eglinton Country Park"
       
      ];

      const locationNodes = locations.map((location, index) => {
        return(
        <option key={index} value={location}>
            {location}
        </option>
        )
      });
      
      const difficulties = [
        "Easy",
        "Moderate",
        "Hard"
      ]

      const difficultyNodes = difficulties.map((difficulty, index)=> {
        return(
            <option key={index} value={difficulty} > 
            {difficulty}
            </option>
        )
      })
      
    return (
        <div className="gw-form-container">
      <div className="gw-form-card">

            <form onSubmit={handleSubmit} className='gw-form'>
                <h2 className='gw-header'>Create a new group walk:</h2>
                <br/>
                <label htmlFor="name">{" "}Walk Name
                <br/>
                <input type="text" 
                name='name' 
                placeholder='Enter walk name...' 
                 onChange={handleChange} 
                 className='gw-input'
                 />
                </label>

<br/>
                <label htmlFor="date">
                {" "} Date and Time
                <br/>
                <input type="datetime-local" 
                    name="date" 
                    onChange={handleChange} 
                    className='gw-input'
                />
                </label>
                <br/>

                <label htmlFor="location">{" "} Location
                <br/>
                <select name="location"
                 id="location" 
                 value={stateGroupWalkies.location} 
                  onChange={handleLocation}
                  className='gw-input'
                  >
                   <option value="select-location">
                      Select a Location
                   </option>
                {locationNodes}    
           </select> 
                </label>
               
<br/>
                <label htmlFor="difficulty">{" "} 
                Difficulty
                <br/>
                <select name="difficulty"
                 id="difficulty" 
                 value={stateGroupWalkies.difficulty}  
                 onChange={handleChange}
                 className='gw-input'>
                   
                   <option value="select-difficulty">
                      Select a Location
                   </option>
               {difficultyNodes}    
           </select>
                </label>
               
<br/>
                <label htmlFor="distance">{" "}Distance (miles)
                <br/>
                <input type="number"
                 min="1" max="60" 
                 name="distance" 
                 value={stateGroupWalkies.distance} 
                 onChange={handleChange} 
                 className='gw-input'/>
                </label>
                <br/>
                <label htmlFor="duration">{" "}Duration (mins)
                <br/>
                <input type="number" 
                min="1" max="60" 
                name="duration"
                 value={stateGroupWalkies.duration} 
                 onChange={handleChange} 
                 className='gw-input'/>
                </label>

                <input type='file' id='file' onChange={handleFileChange} ></input>

                <input type="submit" value="Create New Meet" className='gw-button'/>
            </form>
            </div>
            <div className='gw-image-card'>
                <img src={dog} alt='dog' className='dog-image'/>
            </div>
        
        </div>
    );
};


export default GroupWalkieForm;
