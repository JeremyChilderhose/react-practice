import React from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate(); 

  return (
    <div data-testid="UserProfile">
      <p>UserProfile Component</p>
      <button
        onClick={async () => {
          console.log("Checking token");
          const isAuthenticated = await authService.isAuthenticated();
          if (isAuthenticated) {
            console.log("Authenticated!");
          } else {
            console.log("Not Authenticated!");
          }
        }}
      >
        Check access Token
      </button>

      <button
        onClick={() => {
          authService.logout(); 
          navigate('/'); 
        }}
      >
        Log Out
      </button>
    </div>
  );
};

UserProfile.propTypes = {};

export default UserProfile;
