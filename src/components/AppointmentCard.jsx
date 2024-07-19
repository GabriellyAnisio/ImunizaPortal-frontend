import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../services/api'; 
import { Box, Stack, Text, Select } from '@chakra-ui/react';

const AppointmentCard = ({ appointment, onUpdate }) => {
  const [status, setStatus] = useState(appointment.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    
    try {
      await axios.put(`/api/appointment/${appointment.id}`, { status: newStatus });
      onUpdate(appointment, { status: newStatus });
    } catch (error) {
      console.error('Failed to update status:', error);
      setStatus(appointment.status);
    }
  };
  

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
      <Stack spacing="4">
        <Text><strong>Name:</strong> {appointment.patient.name}</Text>
        <Text><strong>Birthdate:</strong> {appointment.patient.dob}</Text>
        <Text><strong>Schedule Time:</strong> {new Date(appointment.dateTime).getHours()} h</Text>
        <Text><strong>Schedule Date:</strong> {new Date(appointment.dateTime).toLocaleDateString()}</Text>
        <Select onChange={handleStatusChange} value={status} disabled={status === 'completed' || status === 'missed'}>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="missed">Missed</option>
        </Select>
      </Stack>
    </Box>
  );
};

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    patient: PropTypes.shape({
      name: PropTypes.string.isRequired,
      dob: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AppointmentCard;
