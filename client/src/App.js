import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import PasswordResetForm from './components/PasswordResetForm/PasswordResetForm'
import Navbar from './components/Navbar/Navbar'
import './utils/i18n'
import Home from './components/Home/Home';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:variant" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/resetPassword" element={<PasswordResetForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
