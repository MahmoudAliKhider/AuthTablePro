import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  IconButton
} from '@chakra-ui/react';
import { ImSearch } from 'react-icons/im';
import { IoFilter } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import axiosInstance from '../api/index';
import { MdOutlineCancel } from "react-icons/md";

import TableComponent from '../components/TableComponent';

const TableTask = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    surname: '',
    email: '',
    location: '',
    status: 'Pending',
  });

  const handleAddNew = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewClient({
      name: '',
      surname: '',
      email: '',
      location: '',
      status: 'Pending',
    });
  };

  const handleSaveNew = async () => {
    try {
      await axiosInstance.post(
        'http://localhost:3001/api/v1/client/clients',
        newClient
      );
      window.location.reload();
      setIsAdding(false);
      setNewClient({
        name: '',
        surname: '',
        email: '',
        location: '',
        status: 'Pending',
      });
    } catch (error) {
      console.error('Error saving new client:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  return (
    <Box bg="#F8FAFF" overflowX="auto">
      <Flex>
        <Box bg="#fff" borderRadius="20px" width="77%" m="5%" ml="12%" overflowX="auto">
          <Flex justify="space-between" align="center" p="4">
            <InputGroup mr={3} bg="#F7FAFD" borderRadius="18px" border="1px solid #F1EBED">
              <InputLeftElement pointerEvents="none" justifyContent="space-between" ml="10px" mt="4px">
                <ImSearch />
              </InputLeftElement>
              <FormControl borderRadius="18px" ml="10px">
                <Input
                  placeholder='search user'
                  border="none"
                  borderLeftRadius="none"
                  p="23px"
                  color="#DDE3E6"
                />
              </FormControl>
            </InputGroup>
            <Flex>
              {!isAdding && (
                <Button
                  mr="2"
                  color="#0EB0BF"
                  bg="#E7F7F9"
                  fontWeight="bold"
                  pt="23px"
                  pb="23px"
                  borderRadius="15px"
                  fontSize="12px"
                  onClick={handleAddNew}
                >
                  <AddIcon mr="6px" /> Add New
                </Button>
              )}
              <Button
                color="#0EB0BF"
                bg="#E7F7F9"
                fontWeight="bold"
                fontSize="13px"
                mr="2"
                pt="23px"
                pb="23px"
                borderRadius="15px"
              >
                <IoFilter size="18px" />
                Filters
              </Button>
              <Button
                bg="#0EB0BF"
                color="#E7F7F9"
                width="130px"
                pt="13px"
                pb="13px"
                borderRadius="15px"
              >
                Export
              </Button>
            </Flex>
          </Flex>

          <Box >
            {/* Table */}
            <TableComponent />

            {/* Add */}
            {isAdding && (
              <Flex gap={4} mt="10px">
                <Input
                  name="name"
                  placeholder="Name"
                  value={newClient.name}
                  onChange={handleInputChange}
                  width="150px"
                />

                <Input
                  name="surname"
                  placeholder="Surname"
                  value={newClient.surname}
                  onChange={handleInputChange}
                  width="150px"
                />

                <Input
                  name="email"
                  placeholder="Email"
                  value={newClient.email}
                  onChange={handleInputChange}
                  width="150px"
                />

                <Input
                  name="location"
                  placeholder="Location"
                  value={newClient.location}
                  onChange={handleInputChange}
                  width="150px"
                />

                <Select
                  name="status"
                  value={newClient.status}
                  onChange={handleInputChange}
                  width="150px"
                >
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </Select>

                <IconButton
                  icon={<AddIcon />}
                  onClick={handleSaveNew}
                  bg="#0EB0BF"
                  color="white"
                  m="2px"
                />
                <IconButton
                  icon={<MdOutlineCancel />}
                  onClick={handleCancelAdd}
                  bg="#0EB0BF"
                  color="white"
                  m="2px"
                />
              </Flex>
            )}

          </Box>

        </Box>
      </Flex>
    </Box>
  );
};

export default TableTask;
