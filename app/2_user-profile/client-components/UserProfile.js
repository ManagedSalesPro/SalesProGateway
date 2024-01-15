"use client";

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import ShowUserProfile from './ShowUserProfile.js';
import UpdateUserProfile from '../server-components/UpdateUserProfile.js';

const UserProfile = () => {
  const { data: session, status } = useSession();  

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState(null);
  
  useEffect(() => {
    if (session?.user) {
      setSessionUser(session.user);
      setIsLoading(false);
    } else if (status !== "loading") {
      // Handle case where there is no session (e.g., user not logged in)
      setIsLoading(true);
    }
  }, [session, 
      status,
      sessionUser?.user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xs"></span>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
      {sessionUser && (
        <>
          {isEditing ? (
            <UpdateUserProfile currentUser={sessionUser} />
          ) : (
            <>
              <ShowUserProfile currentUser={sessionUser} />
              <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-block mx-auto mt-5">Edit Profile</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;
