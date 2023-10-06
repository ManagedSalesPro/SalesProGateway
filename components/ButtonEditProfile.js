"use client";
// components/ButtonEditProfile.js

import { useState } from 'react';
import apiClient from '@/libs/api';

const ButtonEditProfile = ({ currentUser }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editedUser, setEditedUser] = useState(currentUser);

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post('/api/updateprofile', editedUser);
      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      setMessage('An error occurred while updating the profile.');
    }
    setLoading(false);
  };

  return (
    <div>
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
        className="btn btn-primary"
        onClick={handleEditProfile}
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Edit Profile'}
      </button>
      {message && <div>{message}</div>}
    </div>
  );
};

export default ButtonEditProfile;
