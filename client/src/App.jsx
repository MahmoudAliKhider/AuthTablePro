// app.jsx
import React, { useEffect } from 'react';
import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Pages/Login';
import Signup from './Pages/Signup';
import TableTask from './Pages/TableTask';

const App = () => {

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/table" element={<TableTask />} />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
