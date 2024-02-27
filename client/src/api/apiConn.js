import axios from 'axios';

export const handleLoginConn = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/auth/login', { email, password });
    const { token } = response.data;

    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const handleRegisterConn = async (name, email, password) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/auth/signup', { name, email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const handleGoogleAuth = async () => {
  try {
    window.location.assign('http://localhost:3001/api/v1/auth/google');
  } catch (error) {
    console.error('Error during Google authentication:', error);
    throw error;
  }
};

export const getClientData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/v1/client/clients');
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

