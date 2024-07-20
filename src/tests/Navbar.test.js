import { render, screen, describe, expect, beforeEach, it, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WithSubnavigation from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('WithSubnavigation', () => {
  const navigateMock = useNavigate();

  beforeEach(() => {
    navigateMock.mockClear();
  });

  it('renders all elements correctly', () => {
    render(
      <Router>
        <WithSubnavigation />
      </Router>
    );

    const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();

    const seeAppointmentsButton = screen.getByRole('button', { name: /See Appointments/i });
    const submitAppointmentButton = screen.getByRole('button', { name: /Submit Appointment/i });

    expect(seeAppointmentsButton).toBeInTheDocument();
    expect(submitAppointmentButton).toBeInTheDocument();
  });

  it('navigates to home when logo is clicked', () => {
    render(
      <Router>
        <WithSubnavigation />
      </Router>
    );

    const logo = screen.getByRole('img');
    fireEvent.click(logo);

    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('navigates to appointments page when "See Appointments" button is clicked', () => {
    render(
      <Router>
        <WithSubnavigation />
      </Router>
    );

    const seeAppointmentsButton = screen.getByRole('button', { name: /See Appointments/i });
    fireEvent.click(seeAppointmentsButton);

    expect(navigateMock).toHaveBeenCalledWith('/appointments');
  });

  it('navigates to submit appointment page when "Submit Appointment" button is clicked', () => {
    render(
      <Router>
        <WithSubnavigation />
      </Router>
    );

    const submitAppointmentButton = screen.getByRole('button', { name: /Submit Appointment/i });
    fireEvent.click(submitAppointmentButton);

    expect(navigateMock).toHaveBeenCalledWith('/submit-appointment');
  });
});
