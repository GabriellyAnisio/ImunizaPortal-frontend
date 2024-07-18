import {
  Box,
  Heading,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import WithSubnavigation from '../components/Navbar'; 
import AppointmentSubmit from '../components/AppointmentForm';

const AppointmentForm = () => {
  return (
    <Box>
      <WithSubnavigation/>
      <Box p={8} maxWidth="md" mx="auto">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Scheduling form
        </Heading>
        <Box shadow="base" rounded="lg" p={6}>
        <AppointmentSubmit/>
        </Box>
      </Box>
    </Box> 
  );
};

export default AppointmentForm;
