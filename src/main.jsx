import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import AppRoutes from './routes.jsx';
import { ModalProvider } from './context/ModalContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
