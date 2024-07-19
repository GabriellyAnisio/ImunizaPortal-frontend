import { useState, useEffect } from 'react';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import WithSubnavigation from '../components/Navbar'; 
import AppointmentList from '../components/AppointmentList';
import axios from '../services/api.js'; 
import { format } from 'date-fns';

const AppointmentsPage = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const data = await axios('/api/appointment');
      console.log(data.items);

      const appointments = data.items.map(item => {
        const localDateTime = (item.dateTime);
        return {
          id: item.id,
          dateTime: localDateTime,
          status: item.status,
          patient: {
            id: item.patient.id,
            name: item.patient.name,
            dob: format(new Date(item.patient.birthDate), 'dd/MM/yyyy')
          }
        };
      });

      setAppointmentsData(appointments);
    } catch (error) {
      setError(error.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (updatedAppointment, updatedValues) => {
    setAppointmentsData((prev) =>
      prev.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? { ...appointment, ...updatedValues }
          : appointment
      )
    );
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

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
