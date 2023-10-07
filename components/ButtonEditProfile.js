// components/ButtonEditProfile.js
"use client";

import { useState } from 'react';
import ButtonUpdateProfile from './ButtonUpdateProfile';

const ButtonEditProfile = ({ currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
      {isEditing ? (
        <ButtonUpdateProfile currentUser={currentUser} />
      ) : (
        <>
          <h2 className="text-center text-2xl font-semibold mt-3">{currentUser.name}</h2>
          <p className="text-center text-gray-600 mt-1">{currentUser.company}</p>
          <p className="text-center text-gray-500 mt-1">{currentUser.email}</p> {/* Displaying the user's email */}
          <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-block mx-auto mt-5">Edit Profile</button>
        </>
      )}
    </div>
  );
};

export default ButtonEditProfile;
