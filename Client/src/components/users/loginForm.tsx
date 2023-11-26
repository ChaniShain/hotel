
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate , } from 'react-router-dom';
import { TextField, Button, IconButton, InputAdornment, Box, Alert, AlertTitle } from '@mui/material';
import { styled } from '@mui/system';

import { Visibility, VisibilityOff } from '@mui/icons-material';

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '36px',
  marginTop: "33px",
});

export const LoginForm= () => {
  // props.setAvatarContent("f");
    const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        _id: id,
        password: password,

      });
      const token: string = response.data.access_token;
      Cookies.set('token', token, { expires: 1 });

      try {
        console.log(token);
        const isAdmin = await axios.post('http://localhost:3000/auth/decode', response.data);
        Cookies.set('isAdmin', isAdmin.data, { expires: 1 });
        if (isAdmin.data)
          navigate('/admin');
        else navigate(`/user/${id}`);
    

      }
      catch (error) {
        // alert("something wrong!");
        setError(" אינך רשום במערכת");
      }
      (true);
    } catch (error) {
      // alert("something wrong!");
      setError("אינך רשום במערכת");

      console.error(error);
    }

 
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer >
      {error && (
          <Alert severity="error" sx={{width:"380px"}}>
            <AlertTitle>שגיאה</AlertTitle>
            {error}
          </Alert>
        )}
        <Box maxWidth="300px" >
          <TextField
            label="ID"
            value={id}
            onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setId(event.target.value)}
            fullWidth
          />
          <Box sx={{ marginBottom: '16px' }} />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setPassword(event.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button variant="contained" type="submit" style={{ backgroundColor: '#131054' }} >
          Submit
        </Button>
      </FormContainer>
    </form>
  );
};

