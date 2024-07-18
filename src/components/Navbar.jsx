import { Box, Flex, Text, Button, Stack, useColorModeValue, useBreakpointValue, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/LogoIcon.png';

export default function WithSubnavigation() {
  const navigate = useNavigate();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('blue.600', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
            onClick={() => navigate('/')}
            cursor="pointer"
          >
            <Image boxSize={'50'} src={Logo} />
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            color={'white'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            onClick={() => navigate('/appointments')}
          >
            See Appointments
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            onClick={() => navigate('/submit-appointment')}
            _hover={{
              bg: 'blue.300',
            }}>
            Submit Appointment
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={'row'} spacing={4}>
    </Stack>
  );
}
