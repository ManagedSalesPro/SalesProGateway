"use client";

import { useState, useRef } from 'react';
import { toast } from "react-hot-toast";
import apiClient from '@/libs/api';
import { useRouter } from 'next/router';

const ButtonEditProfile = ({ currentUser, extraStyle }) => {
  const inputRef = useRef(null);
  const [editedUser, setEditedUser] = useState({ ...currentUser, email: currentUser.email });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();
  
  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleEditProfile = async (e) => {
    
    e?.preventDefault();
    
    setIsLoading(true);
    try {
      await apiClient.post("/updateprofile", editedUser);
      
      toast.success("Profile update successfully!");
      
      // Refresh the current page to reflect the updated user details
      router.reload();

      // just remove the focus on the input
      inputRef.current.blur();
      setEditedUser("");
      setIsDisabled(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={`w-full max-w-xs space-y-3 ${extraStyle ? extraStyle : ""}`}
      onSubmit={handleEditProfile}
    >
      <input
        type="text"
        name="name"
        value={editedUser.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="company"
        value={editedUser.company}
        onChange={handleInputChange}
        placeholder="Company"
      />

      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={isDisabled}
      >
        Update Your Profile
        {isLoading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </form>
  );
};

export default ButtonEditProfile;
