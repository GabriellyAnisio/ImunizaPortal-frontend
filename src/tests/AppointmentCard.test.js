import { render, screen, describe, expect, it, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from '../services/api';
import AppointmentCard from '../components/AppointmentCard';

jest.mock('../services/api');

describe('AppointmentCard', () => {
  const mockAppointment = {
    id: '1',
    dateTime: '2023-07-18T14:00:00Z',
    status: 'scheduled',
    patient: {
      name: 'John Doe',
      dob: '1985-05-15',
    },
  };

  const mockOnUpdate = jest.fn();

  it('renders appointment details correctly', () => {
    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />);

    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Birthdate: 1985-05-15')).toBeInTheDocument();
    expect(screen.getByText('Schedule Time: 14 h')).toBeInTheDocument();
    expect(screen.getByText('Schedule Date: 18/07/2023')).toBeInTheDocument();
  });

  it('allows status change and calls onUpdate on success', async () => {
    axios.put.mockResolvedValueOnce({});

    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'completed' } });

    expect(axios.put).toHaveBeenCalledWith('/api/appointment/1', { status: 'completed' });
    await screen.findByDisplayValue('completed');

    expect(mockOnUpdate).toHaveBeenCalledWith(mockAppointment, { status: 'completed' });
  });

  it('reverts status change on failure', async () => {
    axios.put.mockRejectedValueOnce(new Error('Failed to update status'));

    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'completed' } });

    await screen.findByDisplayValue('scheduled');  

    expect(screen.getByDisplayValue('scheduled')).toBeInTheDocument();
  });

  it('disables select when status is completed or missed', () => {
    const completedAppointment = { ...mockAppointment, status: 'completed' };
    render(<AppointmentCard appointment={completedAppointment} onUpdate={mockOnUpdate} />);

    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
