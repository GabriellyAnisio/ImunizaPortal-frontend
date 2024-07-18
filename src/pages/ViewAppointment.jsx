import { useState } from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import WithSubnavigation from '../components/Navbar'; 
import AppointmentList from '../components/AppointmentList';

const appointments = [
  {
    id: '1',
    dateTime: '2024-07-20T09:00',
    status: 'scheduled',
    patient: {
      name: 'Maria Silva',
      dob: '1990-05-10',
    },
  },
  {
    id: '1',
    dateTime: '2024-07-21T08:00',
    status: 'scheduled',
    patient: {
      name: 'Aaaaaaaaaaaaaaaaaaa',
      dob: '1975-12-15',
    },
  },
  {
    id: '2',
    dateTime: '2024-07-20T10:00',
    status: 'scheduled',
    patient: {
      name: 'João Santos',
      dob: '1985-08-22',
    },
  },
  {
    id: '3',
    dateTime: '2024-07-01T11:00',
    status: 'scheduled',
    patient: {
      name: 'Ana Costa',
      dob: '1975-12-15',
    },
  },
];


const AppointmentsPage = () => {
  const [appointmentsData, setAppointmentsData] = useState(appointments);

  const handleUpdate = (updatedAppointment, updatedValues) => {
    setAppointmentsData((prev) =>
      prev.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? { ...appointment, ...updatedValues }
          : appointment
      )
    );
  };

  return (
    <Box>
      <WithSubnavigation />
      <Box p="8">
        <Heading mb="8">Vaccine Appointment Consultation</Heading>
        <AppointmentList
          appointmentsData={appointmentsData}
          handleUpdate={handleUpdate}
        />
      </Box>
    </Box>
  );
};

export default AppointmentsPage;
