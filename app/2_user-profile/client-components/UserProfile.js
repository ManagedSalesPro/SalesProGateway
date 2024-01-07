// components/ButtonEditProfile.js
"use client";

import { useState } from 'react';
import UpdateProfile from '../server-components/UpdateProfile.js';

const UserProfile = ({ currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
      {isEditing ? (
        <UpdateProfile currentUser={currentUser} />
      ) : (
        <>
          <h2 className="text-center text-2xl font-semibold mt-3">{currentUser.name ? currentUser.name : "No name available"}</h2>
          <p className="text-center text-gray-600 mt-1">{currentUser.company ? currentUser.company : "No company name available"}</p>
          <p className="text-center text-gray-500 mt-1">{currentUser.email}</p> {/* Displaying the user's email */}
          <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-block mx-auto mt-5">Edit Profile</button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
