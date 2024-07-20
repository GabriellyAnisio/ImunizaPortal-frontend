import { render, screen, beforeEach, afterEach, waitFor, describe, expect, it, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppointmentSubmit from '../components/AppointmentSubmit';
import axios from '../services/api'; 
import { useModal } from '../context/ModalContext'; 

jest.mock('../services/api');
jest.mock('../context/ModalContext', () => ({
  useModal: jest.fn(),
}));

const mockedUseModal = useModal;

describe('AppointmentSubmit', () => {
  const openModalMock = jest.fn();

  beforeEach(() => {
    mockedUseModal.mockReturnValue({ openModal: openModalMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<AppointmentSubmit />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthdate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Schedule day and time/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('validates the form fields correctly', async () => {
    render(<AppointmentSubmit />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Jo' } });
    fireEvent.change(screen.getByLabelText(/Birthdate/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Schedule day and time/i), { target: { value: '' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Name must be real/i)).toBeInTheDocument();
      expect(screen.getByText(/Birthdate is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Schedule day and time is required/i)).toBeInTheDocument();
    });
  });

  it('submits the form successfully', async () => {
    const mockResponse = { data: { message: 'Appointment created successfully!' } };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<AppointmentSubmit />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Birthdate/i), { target: { value: new Date('1985-05-15') } });
    fireEvent.change(screen.getByLabelText(/Schedule day and time/i), { target: { value: new Date('2023-07-18T14:00:00Z') } });
    
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/appointment', expect.any(Object));
      expect(openModalMock).toHaveBeenCalledWith('Appointment created successfully!');
    });
  });

  it('displays an error message when submission fails', async () => {
    const mockError = { message: 'Error creating appointment' };
    axios.post.mockRejectedValueOnce(mockError);

    render(<AppointmentSubmit />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Birthdate/i), { target: { value: new Date('1985-05-15') } });
    fireEvent.change(screen.getByLabelText(/Schedule day and time/i), { target: { value: new Date('2023-07-18T14:00:00Z') } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(openModalMock).toHaveBeenCalledWith('Error creating appointment: Error creating appointment');
    });
  });
});
