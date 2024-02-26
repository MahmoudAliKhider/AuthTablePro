import React from 'react';
import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Signup from './Pages/Signup';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
