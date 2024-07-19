import { useState } from 'react';
import { Box, Heading, SimpleGrid, Button } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import AppointmentCard from './AppointmentCard';
import { format } from 'date-fns';

const AppointmentsList = ({ appointmentsData, handleUpdate }) => {
  const [expandedTimes, setExpandedTimes] = useState({});

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
    return new Date(a.dateTime) - new Date(b.dateTime);
  });

  const groupedByDateAndTime = sortedAppointments.reduce((acc, appointment) => {
    const date = format(new Date(appointment.dateTime), 'dd/MM/yyyy');
    const time = format(new Date(appointment.dateTime), 'HH:mm');

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
    <>
      {Object.keys(groupedByDateAndTime).map((date) => (
        <Box key={date} mb="8">
          <Heading as="h3" size="md" mb="4">{date}</Heading>
          {Object.keys(groupedByDateAndTime[date]).sort().map((time) => (
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
    </>
  );
};

export default AppointmentsList;
