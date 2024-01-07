// components/ButtonUpdateProfile.js

import { useState, useRef } from 'react';
import { toast } from "react-hot-toast";
import apiClient from '../../../libs/api.js';

const UpdateProfile = ({ currentUser }) => {
  const inputRef = useRef(null);
  const [editedUser, setEditedUser] = useState({ ...currentUser, email: currentUser.email });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleEditProfile = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.post("/updateprofile", editedUser);
      toast.success("Profile updated successfully!");
      
      // Set a delay of 1 second before redirecting
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1000);
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleEditProfile} className="space-y-3">
      <input
        type="text"
        name="name"
        value={editedUser.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="block w-full p-2 mt-3 border rounded-md"
      />
      <input
        type="text"
        name="company"
        value={editedUser.company}
        onChange={handleInputChange}
        placeholder="Company"
        className="block w-full p-2 mt-3 border rounded-md"
      />
      <button className="btn btn-primary btn-block mx-auto" type="submit">Update Your Profile</button>
    </form>
  );
};

export default UpdateProfile;
