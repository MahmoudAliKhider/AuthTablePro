import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Checkbox,
    Image,
    Input,
    Select
} from '@chakra-ui/react';

import axiosInstance from '../api/index';
import { GrEdit } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";

import Verified from '../assets/accept.png';
import Pending from "../assets/Pending.png";
import Rejected from "../assets/Rejected.png";

const TableComponent = () => {
    const [clients, setClients] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingRowId, setEditingRowId] = useState(null);
    const [newClient, setNewClient] = useState({
        name: '',
        surname: '',
        email: '',
        location: '',
        status: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:3001/api/v1/client/clients');
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (rowData) => {
        setEditingRowId(rowData._id);
        setIsEditing(true);
        setNewClient(rowData);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axiosInstance.put(
                `http://localhost:3001/api/v1/client/clients/${editingRowId}`,
                {
                    name: newClient.name,
                    surname: newClient.surname,
                    email: newClient.email,
                    location: newClient.location,
                    status: newClient.status,
                }
            );

            console.log('Edit Response:', response.data);
            const updatedResponse = await axiosInstance.get('http://localhost:3001/api/v1/client/clients');
            setClients(updatedResponse.data);

            setIsEditing(false);
            setEditingRowId(null);
            setNewClient({
                name: '',
                surname: '',
                email: '',
                location: '',
                status: '',
            });
        } catch (error) {
            console.error('Error editing client:', error);
        }
    };

    const handleDelete = async () => {
        try {

            const response = await axiosInstance.delete(
                `http://localhost:3001/api/v1/client/clients/${selectedRows[0]}`
            );

            console.log('Delete Response:', response.data);
            window.location.reload();
            const updatedResponse = await axiosInstance.get('http://localhost:3001/api/v1/client/clients');
            setClients(updatedResponse.data);

        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingRowId(null);
        setNewClient({
            name: '',
            surname: '',
            email: '',
            location: '',
            status: '',
        });
    };

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
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    const statusImages = {
        Verified: Verified,
        Pending: Pending,
        Rejected: Rejected,
    };


    return (

        <Box>
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
                    <Text ml="20px" fontSize={{ base: '12px', md: '16px', lg: '18px' }}>{selectedRows.length} selected</Text>
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
                            onClick={() => handleEdit(clients.find((client) => client._id === selectedRows[0]))}
                            isDisabled={isEditing || selectedRows.length !== 1}
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
                            onClick={handleDelete}
                        >
                            <MdDeleteOutline size="18px" />
                            delete
                        </Button>
                    </Flex>
                </Flex>
            </Box>

            {/* table */}
            <Table size="sm" maxWidth="100%">
                <Thead>
                    <Tr>
                        <Th display={{ base: 'none', md: 'table-cell' }} width="90px">
                            <Checkbox
                                isChecked={selectedRows.length === clients.length}
                                onChange={handleSelectAllRows}
                                colorScheme="teal"
                            />
                        </Th>
                        <Th display={{ base: 'none', md: 'table-cell' }} width="130px">
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                Name  <FaAngleDown color="#0EB0BF" />
                            </span>
                        </Th>
                        <Th display={{ base: 'none', md: 'table-cell' }} width="130px">
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                Surname <FaAngleDown color="#0EB0BF" />
                            </span>
                        </Th>
                        <Th display={{ base: 'none', md: 'table-cell' }} width="130px">
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                ID Number <FaAngleDown color="#0EB0BF" />
                            </span>
                        </Th>
                        <Th display={{ base: 'none', md: 'table-cell' }} width="170px">
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                Email
                            </span>
                        </Th >
                        <Th display={{ base: 'none', md: 'table-cell' }} width="140px">
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                Location
                            </span>
                        </Th>
                        <Th display={{ base: 'none', md: 'table-cell' }} width="150px">
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                date Added
                            </span>
                        </Th >
                        <Th display={{ base: 'none', md: 'table-cell' }} width="190px">
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                Status <FaAngleDown color="#0EB0BF" />
                            </span>
                        </Th>

                    </Tr>
                </Thead>
                <Tbody>
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
                            <Td>
                                <Image src={statusImages[client.status]} alt={client.status} boxSize="30px" />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {/* Eddit */}
            <Flex>
                {isEditing && (
                    <Flex gap={4} mt="10px" >
                        <Input
                            name="name"
                            placeholder="Name"
                            value={newClient.name}
                            onChange={handleInputChange}
                            width={{ base: '100%', md: '150px' }}
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
                                onClick={handleSaveEdit}

                            >
                                Save
                            </Button>

                            {isEditing && (
                                <Button
                                    color="red"
                                    bg="#E7F7F9"
                                    fontWeight="bold"
                                    fontSize="13px"
                                    mr="2"
                                    pt="10px"
                                    pb="10px"
                                    borderRadius="15px"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                )}
            </Flex>

        </Box>
    )
}

export default TableComponent