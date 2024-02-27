import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Input, Text, FormControl, InputRightElement, Img, Flex, InputGroup, Stack } from '@chakra-ui/react';
import { handleLoginConn, handleGoogleAuth } from '../api/apiConn';
import { IoLogoGoogle } from "react-icons/io";
import { LuPartyPopper } from "react-icons/lu";
import { RiUser6Line } from "react-icons/ri";
import { SlKey } from "react-icons/sl";
import {
    Alert,
    AlertIcon,
    AlertTitle,
} from '@chakra-ui/react';

import img from "../assets/task.png";
import Rimg from '../assets/LoginTask.png';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleLogin = async () => {
        try {
            await handleLoginConn(email, password);
            navigate('/table');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setShowErrorAlert(true);
            } else {
                alert('An error occurred during login');
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await handleGoogleAuth();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Box bg='#B4B1C6' w='100%' p={4} >
            {showErrorAlert && (
                <Alert status='error'>
                    <AlertIcon />
                    Incorrect Email or Password!
                </Alert>
            )}
                <Box bg="white" borderRadius="20px" margin="50px" p="30px">
                    <Img src={img} width="80px" ml="20px" />
                    <Flex mt="20px" mb="1%" direction={{ base: 'column', md: 'row' }}  >
                        <Box width={{ base: "100%", md: "40%" }} ml="8%" mt="2%" >
                            <Flex gap={5} marginLeft="10%" fontStyle="normal" fontSize="3xl" fontWeight="300" fontFamily="Roboto">
                                <LuPartyPopper size="40px" />
                                <Text > You're back!!</Text>
                            </Flex>

                            <Flex direction="column" gap={4} marginTop="20px">
                                <InputGroup>
                                    <InputRightElement pointerEvents="none">
                                        <RiUser6Line color="gray.300" />
                                    </InputRightElement>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email"
                                        borderRadius="20px"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputRightElement pointerEvents="none">
                                        <SlKey color="gray.300" />
                                    </InputRightElement>
                                    <FormControl>
                                        <Input type="password"
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                            placeholder='password'
                                            borderRadius="20px"
                                        />
                                    </FormControl>
                                </InputGroup>

                                <Flex justifyContent="space-between" marginLeft="20px">
                                    <Text fontSize="14px" fontWeight="300" fontFamily="Roboto">oops, forgot password?</Text>
                                    <Button
                                        onClick={handleLogin}
                                        bg="#322D55"
                                        color="white"
                                        p="20px"
                                        pl="30px"
                                        pr="30px"
                                        borderRadius="20px"
                                        fontWeight="200"
                                        fontFamily="Roboto"
                                    >sign in</Button>
                                </Flex>
                                <Flex mt="3%" gap={3} ml="20px">
                                    <Text
                                        fontSize="14px" fontWeight="300" fontFamily="Roboto"
                                    >got no accout? Register using these,</Text>
                                    <Stack
                                        border="1px solid black"
                                        p="5px"
                                        borderRadius="20px"
                                        cursor="pointer"
                                        alignItems="center"

                                    >
                                        <IoLogoGoogle onClick={handleGoogleLogin} />
                                    </Stack>
                                    <Link to={"/signup"}>
                                        <Text color="blue"> signup </Text>
                                    </Link>
                                </Flex>
                            </Flex>

                        </Box>
                        <Box width="50%" height="30%" ml="10%">
                            <Img src={Rimg} width="85%" />
                        </Box>
                    </Flex>

                </Box>
            </Box>
        </>
    );
};

export default Login;
