import { render, screen, describe, expect, it, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppointmentsList from '../components/AppointmentList';
import { format } from 'date-fns';

jest.mock('../components/AppointmentCard', () => ({ appointment, onUpdate }) => (
  <div data-testid="appointment-card">
    <p>{appointment.patient.name}</p>
    <button onClick={() => onUpdate(appointment, { status: 'updated' })}>Update</button>
  </div>
));

describe('AppointmentsList', () => {
  const mockAppointmentsData = [
    {
      id: '1',
      dateTime: '2023-07-18T14:00:00Z',
      status: 'scheduled',
      patient: {
        name: 'John Doe',
        dob: '1985-05-15',
      },
    },
    {
      id: '2',
      dateTime: '2023-07-18T14:00:00Z',
      status: 'scheduled',
      patient: {
        name: 'Jane Smith',
        dob: '1990-08-25',
      },
    },
    {
      id: '3',
      dateTime: '2023-07-19T15:00:00Z',
      status: 'scheduled',
      patient: {
        name: 'Alice Johnson',
        dob: '1987-09-30',
      },
    },
  ];

  const mockHandleUpdate = jest.fn();

  it('renders appointment dates and times correctly', () => {
    render(<AppointmentsList appointmentsData={mockAppointmentsData} handleUpdate={mockHandleUpdate} />);

    const date1 = format(new Date('2023-07-18T14:00:00Z'), 'dd/MM/yyyy');
    const date2 = format(new Date('2023-07-19T15:00:00Z'), 'dd/MM/yyyy');
    const time1 = format(new Date('2023-07-18T14:00:00Z'), 'HH:mm');
    const time2 = format(new Date('2023-07-19T15:00:00Z'), 'HH:mm');

    expect(screen.getByText(date1)).toBeInTheDocument();
    expect(screen.getByText(date2)).toBeInTheDocument();
    expect(screen.getByText(time1)).toBeInTheDocument();
    expect(screen.getByText(time2)).toBeInTheDocument();
  });

  it('expands and collapses appointment times correctly', () => {
    render(<AppointmentsList appointmentsData={mockAppointmentsData} handleUpdate={mockHandleUpdate} />);

    const date1 = format(new Date('2023-07-18T14:00:00Z'), 'dd/MM/yyyy');
    const time1 = format(new Date('2023-07-18T14:00:00Z'), 'HH:mm');

    const timeButton = screen.getByText(time1);

    expect(screen.queryAllByTestId('appointment-card')).toHaveLength(0);

    fireEvent.click(timeButton);
    expect(screen.getAllByTestId('appointment-card')).toHaveLength(2);

    fireEvent.click(timeButton);
    expect(screen.queryAllByTestId('appointment-card')).toHaveLength(0);
  });

  it('calls handleUpdate when an appointment is updated', () => {
    render(<AppointmentsList appointmentsData={mockAppointmentsData} handleUpdate={mockHandleUpdate} />);

    const date1 = format(new Date('2023-07-18T14:00:00Z'), 'dd/MM/yyyy');
    const time1 = format(new Date('2023-07-18T14:00:00Z'), 'HH:mm');

    const timeButton = screen.getByText(time1);

    fireEvent.click(timeButton);

    const updateButton = screen.getAllByText('Update')[0];
    fireEvent.click(updateButton);

    expect(mockHandleUpdate).toHaveBeenCalledWith(
      mockAppointmentsData[0],
      { status: 'updated' }
    );
  });
});
