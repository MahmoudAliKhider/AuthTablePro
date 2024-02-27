import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Input, Text, FormControl, InputRightElement, Img, Flex, InputGroup, Stack } from '@chakra-ui/react';
import { handleGoogleAuth, handleRegisterConn } from '../api/apiConn';
import { IoLogoGoogle } from "react-icons/io";
import { LuPartyPopper } from "react-icons/lu";
import { RiUser6Line } from "react-icons/ri";
import { SlKey } from "react-icons/sl";
import { CiMail } from "react-icons/ci";

import img from "../assets/task.png";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await handleRegisterConn(name, email, password);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleSignUp = async () => {
    try {
      await handleGoogleAuth();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box bg='#B4B1C6' w='100%' p={4} >
      <Box bg="white" borderRadius="20px" margin="60px" p="30px">
        <Img src={img} width="80px" ml="20px" />
        <Flex mt="20px" mb="4%" >
          <Box width={{ base: "100%", md: "50%" }} ml="8%" mt="2%">
            <Flex gap={5} marginLeft="10%" fontStyle="normal" fontSize="3xl" fontWeight="300" fontFamily="Roboto">
              <LuPartyPopper size="40px" />
              <Text > Join Us!!</Text>
            </Flex>

            <Flex direction="column" gap={4} marginTop="20px">
              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <RiUser6Line color="gray.300" />
                </InputRightElement>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name"
                  borderRadius="20px"
                />
              </InputGroup>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <CiMail color="gray.300" />
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
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password'
                    borderRadius="20px"
                  />
                </FormControl>
              </InputGroup>

              <Flex justifyContent="space-between" marginLeft="20px">

                <Button

                  bg="#322D55"
                  color="white"
                  p="20px"
                  pl="30px"
                  pr="30px"
                  borderRadius="20px"
                  fontWeight="200"
                  fontFamily="Roboto"
                  onClick={handleRegister}
                >sign up</Button>
              </Flex>
              <Flex mt="4%" gap={3} ml="20px" direction={{ base: 'column', md: 'row' }}>
                <Text
                  fontSize="14px" fontWeight="300" fontFamily="Roboto"
                >already have an account? Login using these,</Text>
                <Stack
                  border="1px solid black"
                  p="5px"
                  borderRadius="20px"
                  cursor="pointer"
                  alignItems="center"
                >
                  <IoLogoGoogle onClick={handleGoogleSignUp} />
                </Stack>
                <Link to={"/login"}>
                  <Text color="blue"> login </Text>
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SignUp;
