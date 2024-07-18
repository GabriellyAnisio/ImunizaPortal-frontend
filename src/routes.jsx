import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppointmentsPage from './pages/ViewAppointment';
import SubmitAppointmentPage from './pages/Appointment';
import HomePage from './pages/HomePortal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/submit-appointment" element={<SubmitAppointmentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
