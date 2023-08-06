
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate , } from 'react-router-dom';
import { TextField, Button, IconButton, InputAdornment, Box } from '@mui/material';
import { styled } from '@mui/system';

import { Visibility, VisibilityOff } from '@mui/icons-material';

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '36px',
  marginTop: "33px",
});

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
        alert("something wrong!");
      }
      (true);
    } catch (error) {
      console.error(error);
    }

 
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer >

        <Box maxWidth="300px" >
          <TextField
            label="ID"
            value={id}
            onChange={(event) => setId(event.target.value)}
            fullWidth
          />
          <Box sx={{ marginBottom: '16px' }} />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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

