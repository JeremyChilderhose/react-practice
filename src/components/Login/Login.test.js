import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  it('renders login form elements correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // Check if the form inputs, buttons, and icons are rendered
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('allows user to type in username and password', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });

  it('disables login button when username or password is empty', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(loginButton).toBeDisabled(); // Initial state

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    // Simulate typing only username
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(loginButton).toBeDisabled();

    // Simulate typing both username and password
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(loginButton).not.toBeDisabled();
  });

  it('toggles password visibility', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const eyeButton = screen.getByLabelText(/Show Password/i); // Updated query to use accessible label

    // Initial state should be password hidden
    expect(passwordInput.type).toBe('password');

    // Click the eye button to show password
    fireEvent.click(eyeButton);
    expect(passwordInput.type).toBe('text');

    // Ensure the button label changes accordingly
    expect(screen.getByLabelText(/Hide Password/i)).toBeInTheDocument();

    // Click again to hide password
    fireEvent.click(screen.getByLabelText(/Hide Password/i));
    expect(passwordInput.type).toBe('password');
  });

  it('navigates to signup page on click', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const signupButton = screen.getByText(/sign up/i);

    // Simulate clicking the signup button
    fireEvent.click(signupButton);

    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  it('prevents form submission without username and password', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });

    // Click the login button without filling the form
    fireEvent.click(loginButton);

    // Check if the login button is still disabled
    expect(loginButton).toBeDisabled();
  });
});
