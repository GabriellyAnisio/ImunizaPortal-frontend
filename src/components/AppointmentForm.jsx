import { Input, Button, Box, Stack, FormControl, FormLabel } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '../services/api'; 
import 'react-datepicker/dist/react-datepicker.css';
import { useModal } from '../context/ModalContext'; 

const schema = z.object({
  name: z
    .string()
    .nonempty({ message: 'Name is required' })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, { message: 'Name must only contain letters and spaces' })
    .refine((name) => name.length >= 3, { message: 'Name must be real' }),
  birthdate: z.instanceof(Date, { message: 'Birthdate is required' }),
  dateTime: z.instanceof(Date, { message: 'Schedule day and time is required' }),
});

const AppointmentSubmit = () => {
  const { handleSubmit, control, formState: { errors, isValid }, register } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      birthdate: null,
      dateTime: null,
    },
  });

  const { openModal } = useModal();

  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      birthDate: data.birthdate.toISOString().split('T')[0],
      dateTime: data.dateTime.toISOString(), 
    };

    try {
      await axios.post('/api/appointment', formData);
      openModal('Appointment created successfully!');
    } catch (error) {
      openModal(`Error creating appointment: ${error.message}`);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {/* Name */}
          <FormControl id="name" isRequired isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input 
              type="text" 
              placeholder="Enter name" 
              {...register('name')} 
            />
            {errors.name && <Box color="red.500">{errors.name.message}</Box>}
          </FormControl>

          {/* Birthdate */}
          <FormControl id="birthdate" isRequired isInvalid={!!errors.birthdate}>
            <FormLabel>Birthdate</FormLabel>
            <Controller
              name="birthdate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date of birth"
                  showYearDropdown
                  yearDropdownItemNumber={50}
                  scrollableYearDropdown
                />
              )}
            />
            {errors.birthdate && <Box color="red.500">{errors.birthdate.message}</Box>}
          </FormControl>

          {/* Schedule day and time */}
          <FormControl id="dateTime" isRequired isInvalid={!!errors.dateTime}>
            <FormLabel>Schedule day and time</FormLabel>
            <Controller
              name="dateTime"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  dateFormat="dd/MM/yyyy HH:mm"
                  placeholderText="Select the day and time"
                />
              )}
            />
            {errors.dateTime && <Box color="red.500">{errors.dateTime.message}</Box>}
          </FormControl>

          {/* Submit button */}
          <Button type="submit" colorScheme="blue" size="lg" isDisabled={!isValid}>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AppointmentSubmit;
