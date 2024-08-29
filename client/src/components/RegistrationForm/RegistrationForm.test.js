import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationForm from './RegistrationForm';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('<RegistrationForm />', () => {
  test('renders RegistrationForm component', () => {
    render(<RegistrationForm />);
    
    expect(screen.getByTestId('RegistrationForm')).toBeInTheDocument();
  });

  test('renders input fields with correct placeholders', () => {
    render(<RegistrationForm />);
    
    expect(screen.getByPlaceholderText('registration.enterUsername')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('registration.enterPassword')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('registration.reenterPassword')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('passwordReset.emailPlaceholder')).toBeInTheDocument();
  });

  test('calls navigate function on back to login button click', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    
    render(<RegistrationForm />);
    
    fireEvent.click(screen.getByLabelText('passwordReset.backToLoginButtonAriaLabel'));
    expect(navigate).toHaveBeenCalledWith('/');
  });

  test('enables and disables submit button based on input values', () => {
    render(<RegistrationForm />);
    
    const submitButton = screen.getByText('registration.registerButton');
    
    expect(submitButton).toBeDisabled();
    
    fireEvent.change(screen.getByPlaceholderText('registration.enterUsername'), { target: { value: 'username' } });
    fireEvent.change(screen.getByPlaceholderText('registration.enterPassword'), { target: { value: 'password' } });
    fireEvent.change(screen.getByPlaceholderText('registration.reenterPassword'), { target: { value: 'password' } });
    fireEvent.change(screen.getByPlaceholderText('passwordReset.emailPlaceholder'), { target: { value: 'email@example.com' } });
    
    expect(submitButton).toBeEnabled();
  });
});
