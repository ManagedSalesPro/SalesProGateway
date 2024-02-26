"use client";

import { useState, useEffect, useCallback } from 'react';
import apiClient from '../../../libs/api.js';

export default function ShowUserProfile ({ currentUser }) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const email = currentUser.email;
      console.log("Executing get-user-profile API POST Request");
      const response = await apiClient.post("/get-user-profile", {email});

      // Check the structure of response and adjust accordingly
      if (response && response.userProfile) {
        setResults([response.userProfile]); // Wrap the user profile object in an array
      } else {
        // Handle case where response.data is not as expected
        console.error("Unexpected response structure:", response);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser?.email]); // dependencies of getUserProfile

  useEffect(() => {
    setIsLoading(true);
    getUserProfile();
  }, [getUserProfile]);

  return(
    <>
    {isLoading ? (
         <div className="flex justify-center items-center">
         <span className="loading loading-spinner loading-xs"></span>
       </div>
      ) : (
      results.map((client) => (
        <div key={client.id}>
          <h2 className="text-center text-2xl font-semibold mt-3">{client?.name || "No name available"}</h2>
          <p className="text-center text-gray-600 mt-1">{client?.company || "No company name available"}</p>
          <p className="text-center text-gray-500 mt-1">{client.email}</p> {/* Displaying the user's email */}
        </div>
      ))
      )}
    </>
  )
  }