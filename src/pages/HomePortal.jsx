import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react'
  import { useNavigate } from 'react-router-dom';
  import Logo from '../assets/LogoIcon.png';
  import Cover from '../assets/cover.avif';
  
  export default function SplitScreen() {
    const navigate = useNavigate();

    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Image
                boxSize={'50'}
                src= { Logo }
            />
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}>
                Imuniza 
              </Text>
              <br />{' '}
              <Text color={'blue.400'} as={'span'}>
                Portal
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Schedule your Covid-19 vaccine. Protect yourself and protect those you love most.          </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => navigate('/submit-appointment')}
                >
                Submit Appointment
              </Button>
              <Button 
              rounded={'full'}
              onClick={() => navigate('/appointments')}
              >
              View Appointments
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Cover Image'}
            objectFit={'cover'}
            src={
              Cover
            }
          />
        </Flex>
      </Stack>
    )
  }