// components/ButtonEditProfile.js
"use client";

import { useState } from 'react';
import ButtonUpdateProfile from './ButtonUpdateProfile';

const ButtonEditProfile = ({ currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
      {isEditing ? (
        <>
          <input
            type="text"
            defaultValue={currentUser.name}
            placeholder="Name"
            className="block w-full p-2 mt-3 border rounded-md"
          />
          <input
            type="text"
            defaultValue={currentUser.company}
            placeholder="Company"
            className="block w-full p-2 mt-3 border rounded-md"
          />
          <ButtonUpdateProfile currentUser={currentUser} className="btn btn-primary btn-wide mt-4" />
        </>
      ) : (
        <>
          <h2 className="text-center text-2xl font-semibold mt-3">{currentUser.name}</h2>
          <p className="text-center text-gray-600 mt-1">{currentUser.company}</p>
          <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-wide mt-4">Edit Profile</button>
        </>
      )}
    </div>
  );
};

export default ButtonEditProfile;
