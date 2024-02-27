import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  IconButton,
  Checkbox
} from '@chakra-ui/react';
import { ImSearch } from 'react-icons/im';
import { IoFilter } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import axiosInstance from '../api/index';
import { GrEdit } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";

const TableTask = () => {
  const [clients, setClients] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    surname: '',
    email: '',
    location: '',
    status: 'Pending',
  });
  const [selectedRows, setSelectedRows] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          'http://localhost:3001/api/v1/client/clients'
        );
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



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

      const response = await axiosInstance.get(
        'http://localhost:3001/api/v1/client/clients'
      );
      setClients(response.data);

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

  // select side
  const handleSelectAllRows = () => {
    const allIds = clients.map((client) => client._id);
    const newSelectedRows = selectedRows.length === allIds.length ? [] : allIds;

    setSelectedRows(newSelectedRows);
  };

  const handleSelectRow = (selectedId) => {
    const newSelectedRows = selectedRows.includes(selectedId)
      ? selectedRows.filter((id) => id !== selectedId)
      : [...selectedRows, selectedId];

    setSelectedRows(newSelectedRows);
    console.log('Selected Rows:', newSelectedRows);
  };


  return (
    <Box bg="#F8FAFF" overflowX="auto">
      <Flex>
        <Box bg="#fff" borderRadius="20px" width="92%" m="5%" ml="7%" overflowX="auto">
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
            {/* header Table */}
            <Box
              bg="#0EB0BF"
              p='10px'
              borderTopRightRadius="20px"
              borderTopLeftRadius="20px"
              color="white"
              overflowX="auto"
              m="10px"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text ml="20px">{selectedRows.length} selected</Text>
                <Flex>
                  <Button
                    bg="#26B8C5"
                    color="#E7F7F9"
                    fontWeight="bold"
                    fontSize="13px"
                    mr="2"
                    pt="10px"
                    pb="10px"
                    borderRadius="15px"
                  >
                    <GrEdit size="18px" />
                    _edit
                  </Button>

                  <Button
                    color="red"
                    bg="#E7F7F9"
                    fontWeight="bold"
                    fontSize="13px"
                    mr="2"
                    pt="10px"
                    pb="10px"
                    borderRadius="15px"
                  >
                    <MdDeleteOutline size="18px" />
                    delete
                  </Button>
                </Flex>
              </Flex>
            </Box>

            {/* Table */}
            <Table size="sm" maxWidth="100%">
              <Thead>
                <Tr>
                  <Th>
                    <Checkbox
                      isChecked={selectedRows.length === clients.length}
                      onChange={handleSelectAllRows}
                      colorScheme="teal"
                    />
                  </Th>
                  <Th>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Name  <FaAngleDown color="#0EB0BF" />
                    </span>
                  </Th>
                  <Th>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Surname <FaAngleDown color="#0EB0BF" />
                    </span>
                  </Th>
                  <Th>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      ID Number <FaAngleDown color="#0EB0BF" />
                    </span>
                  </Th>
                  <Th>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Email <FaAngleDown color="#0EB0BF" />
                    </span>
                  </Th>
                  <Th>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Location <FaAngleDown color="#0EB0BF" />
                    </span>
                  </Th>
                  <Th>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      date Added <FaAngleDown color="#0EB0BF" />
                    </span>
                  </Th>
                  <Th>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Status <FaAngleDown color="#0EB0BF" />
                    </span>
                  </Th>

                </Tr>
              </Thead>
              <Tbody>

                {/* Add */}
                {isAdding && (
                  <Tr>
                    <Td >
                      <Input
                        name="name"
                        placeholder="Name"
                        value={newClient.name}
                        onChange={handleInputChange}
                        width="150px"
                      />
                    </Td>
                    <Td>
                      <Input
                        name="surname"
                        placeholder="Surname"
                        value={newClient.surname}
                        onChange={handleInputChange}
                        width="150px"
                      />
                    </Td>
                    <Td>
                      <Input
                        name="email"
                        placeholder="Email"
                        value={newClient.email}
                        onChange={handleInputChange}
                        width="150px"
                      />
                    </Td>
                    <Td>
                      <Input
                        name="location"
                        placeholder="Location"
                        value={newClient.location}
                        onChange={handleInputChange}
                        width="150px"
                      />
                    </Td>
                    <Td>
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
                    </Td>
                    <Td >
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
                    </Td>
                  </Tr>
                )}

                {/* body table */}
                {clients.map((client) => (
                  <Tr
                    key={client._id}
                    bg={selectedRows.includes(client._id) ? '#E7F7F9' : 'inherit'}
                  >
                    <Td>
                      <Flex gap={2}>
                        <Checkbox
                          isChecked={selectedRows.includes(client._id)}
                          onChange={() => handleSelectRow(client._id)}
                          colorScheme="teal"
                        />

                        <Box
                          borderRadius="50%"
                          width="35px"
                          height="35px"
                          textAlign="center"
                          lineHeight="30px"
                          bg="#F7FAFD"
                          border="1px solid #F7FAFD"
                        >
                          <Text fontWeight="bold" color="#0EB0BF" textTransform="uppercase">
                            {client.name.slice(0, 1) + client.surname.slice(0, 1)}
                          </Text>
                        </Box>
                      </Flex>
                    </Td>

                    <Td>{client.name}</Td>
                    <Td>{client.surname}</Td>
                    <Td>{client._id.slice(0, 5)}</Td>
                    <Td>{client.email}</Td>
                    <Td>{client.location}</Td>
                    <Td>
                      {new Date(client.dateAdded).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Td>
                    <Td>{client.status}</Td>
                  </Tr>
                ))}

              </Tbody>
            </Table>

          </Box>

        </Box>
      </Flex>
    </Box>
  );
};

export default TableTask;
