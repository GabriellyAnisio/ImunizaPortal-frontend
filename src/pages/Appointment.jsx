import React from 'react';
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentForm = () => {
  const [birthdate, setBirthdate] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: e.target.name.value,
      birthdate,
      appointmentDateTime: `${selectedDate}`,
    });
  };


  return (
    <ChakraProvider>
      <Box p={8} maxWidth="md" mx="auto">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Scheduling form
        </Heading>
        <Box shadow="base" rounded="lg" p={6}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Name */}
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" placeholder="Enter name" />
              </FormControl>

              {/* Birthdate */}
              <FormControl id="birthdate" isRequired>
                <FormLabel>Birthdate</FormLabel>
                <DatePicker
                  selected={birthdate}
                  onChange={(date) => setBirthdate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date of birth"
                />
              </FormControl>

              {/* Schedule day and time */}
              <FormControl id="appointmentDateTime" isRequired>
                <FormLabel>Schedule day and time</FormLabel>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  dateFormat="dd/MM/yyyy HH:mm"
                  placeholderText="Select the day and time"
                />
              </FormControl>

              {/* Submit button */}
              <Button type="submit" colorScheme="blue" size="lg">
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default AppointmentForm;
