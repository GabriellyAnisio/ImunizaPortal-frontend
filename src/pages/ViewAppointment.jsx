import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Text,
  Stack,
  Select,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import WithSubnavigation from '../components/Navbar'; 

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

const AppointmentCard = ({ appointment, onUpdate }) => {
  const [status, setStatus] = useState(appointment.status);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onUpdate(appointment, { status: newStatus });
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
      <Stack spacing="4">
        <Text><strong>Name:</strong> {appointment.patient.name}</Text>
        <Text><strong>Birthdate:</strong> {appointment.patient.dob}</Text>
        <Text><strong>Schedule Time:</strong> {new Date(appointment.dateTime).toLocaleTimeString()}</Text>
        <Text><strong>Schedule Date:</strong> {new Date(appointment.dateTime).toLocaleDateString()}</Text>
        <Select onChange={handleStatusChange} value={status}>
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

const AppointmentsPage = () => {
  const [appointmentsData, setAppointmentsData] = useState(appointments);
  const [expandedTimes, setExpandedTimes] = useState({});

  const handleUpdate = (updatedAppointment, updatedValues) => {
    setAppointmentsData((prev) =>
      prev.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? { ...appointment, ...updatedValues }
          : appointment
      )
    );
  };

  const handleTimeClick = (date, time) => {
    setExpandedTimes((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [time]: !prev[date]?.[time],
      },
    }));
  };

  const sortedAppointments = [...appointmentsData].sort((a, b) => {
    const dateComparison = new Date(a.dateTime) - new Date(b.dateTime);
    return dateComparison;
  });

  const groupedByDateAndTime = sortedAppointments.reduce((acc, appointment) => {
    const date = new Date(appointment.dateTime).toLocaleDateString();
    const time = new Date(appointment.dateTime).toLocaleTimeString();

    if (!acc[date]) {
      acc[date] = {};
    }
    if (!acc[date][time]) {
      acc[date][time] = [];
    }
    acc[date][time].push(appointment);
    return acc;
  }, {});

  return (
    <Box>
      <WithSubnavigation />
      <Box p="8">
        <Heading mb="8">Vaccine Appointment Consultation</Heading>
        {Object.keys(groupedByDateAndTime).map((date) => (
          <Box key={date} mb="8">
            <Heading as="h3" size="md" mb="4">{date}</Heading>
            {Object.keys(groupedByDateAndTime[date]).map((time) => (
              <Box key={time} mb="4">
                <Button
                  onClick={() => handleTimeClick(date, time)}
                  variant="link"
                  size="lg"
                  mb="2"
                  color="blue.400"
                  rightIcon={expandedTimes[date]?.[time] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                >
                  {time}
                </Button>
                {expandedTimes[date]?.[time] && (
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
                    {groupedByDateAndTime[date][time].map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        onUpdate={handleUpdate}
                      />
                    ))}
                  </SimpleGrid>
                )}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AppointmentsPage;
