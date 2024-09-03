import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import PasswordResetForm from './components/PasswordResetForm/PasswordResetForm'
import UserProfile from './components/UserProfile/UserProfile'
import './utils/i18n'
// import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Router>
      {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/:variant" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/resetPassword" element={<PasswordResetForm />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
