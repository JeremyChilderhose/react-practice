import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordResetForm from './PasswordResetForm';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('<PasswordResetForm />', () => {
  let navigate;

  beforeEach(() => {
    navigate = useNavigate();
  });

  test('it should mount', () => {
    render(<PasswordResetForm />);
    const heading = screen.getByText('passwordReset.forgotPassword');
    expect(heading).toBeInTheDocument();
  });

  test('should render input field with correct attributes', () => {
    render(<PasswordResetForm />);
    const inputField = screen.getByPlaceholderText('passwordReset.emailPlaceholder');
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveAttribute('type', 'email'); // Ensure this matches actual InputField component
  });

  test('should render buttons with correct text and attributes', () => {
    render(<PasswordResetForm />);
    const submitButton = screen.getByText('passwordReset.passwordResetButton');
    expect(submitButton).toBeInTheDocument();

    const textButton = screen.getByText('passwordReset.backToLoginButton');
    expect(textButton).toBeInTheDocument();
  });

  test('should disable submit button when email is empty', () => {
    render(<PasswordResetForm />);
    const submitButton = screen.getByText('passwordReset.passwordResetButton');
    expect(submitButton).toBeDisabled();
  });

  test('should update email state on input change', () => {
    render(<PasswordResetForm />);
    const inputField = screen.getByPlaceholderText('passwordReset.emailPlaceholder');
    
    fireEvent.change(inputField, { target: { value: 'test@example.com' } });
    expect(inputField.value).toBe('test@example.com');
  });
});
