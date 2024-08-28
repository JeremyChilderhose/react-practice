import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  it('renders the Login component at the root path', () => {
    // Render App with a router directly in the test setup
    render(
      <App />
    );

    // Navigate to the root path
    window.history.pushState({}, 'Login Page', '/');

    // Check if Login component elements are present
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('renders the RegistrationForm component at the /register path', () => {
    // Render App with a router directly in the test setup
    render(
        <App />
    );
  });
});
