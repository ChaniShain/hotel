import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Alert,
  AlertTitle,
  styled,
} from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Admin } from './admin';

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '36px',
  marginTop: "33px",
});
export const EditUser= () => {
  const [idSearch, setIdSearch] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [showNextForm, setShowNextForm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleJobChange = (e: SelectChangeEvent<string>) => {
    setJob(e.target.value);
  };
  const handleIdSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdSearch(e.target.value);
  };
  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };


  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('token');
    console.log(token);

    try {
      const response = await axios.get(`http://localhost:3000/user/${idSearch}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("response.data");
      console.log(response.data);
      if (response.data) {
        console.log(response.data.user._id)
        setId(response.data.user._id);
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
        setPassword(response.data.user.password);
        setRole(response.data.user.roles[0]);
        setJob(response.data.user.job)
        setShowNextForm(true); 
        setError("");
      } else {
        setError("העובד לא קיים");
        // alert("המשתמש לא נמצא");
      }
    } catch (error) {
      console.log(error);
      setShowNextForm(false); 
      setError(" אינך רשום במערכת");
      setId("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setRole("");
    }
    console.log('Submitted!', {
      id: id,
    });
  };

  const handleNextFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('token');
    console.log(token);

    try {
      const response = await axios.put(`http://localhost:3000/user/${id}`, {
        _id: id,
        password: password,
        job: job,
        firstName: firstName,
        lastName: lastName,
        roles: [role]
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      alert("פרטי עובד שונו בהצלחה");
      console.log('Submitted!', {
        id: id,
        password: password,
        firstName: firstName,
        lastName: lastName,
        roles: role,
        job:job
      });
    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('token');
    console.log(token);

    try {
      const response = await axios.delete(`http://localhost:3000/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      alert("עובד נמחק בהצלחה");
      console.log('Deleted!', {
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <Admin  />
      <form onSubmit={handleSubmit}>
      <FormContainer >
      {error && (
          <Alert severity="error" sx={{width:"380px"}}>
            <AlertTitle>שגיאה</AlertTitle>
            {error}
          </Alert>
        )}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <TextField
              label="תעודת זהות"
              value={idSearch}
              onChange={handleIdSearchChange}
              fullWidth
              margin="normal"
            />
            <Grid style={{ display: 'flex', justifyContent: 'center' }}>

              <Button type="submit" variant="contained" style={{ backgroundColor: '#131054' }}>
                חפש עובד
              </Button>
            </Grid>
          </Grid>
        </Grid>
        </FormContainer>
      </form>
      {showNextForm && (
        <form onSubmit={handleNextFormSubmit}>
          
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <TextField
                label="תעודת זהות"
                value={id}
                onChange={handleIdChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="סיסמא"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="שם פרטי"
                value={firstName}
                onChange={handleFirstNameChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="שם משפחה"
                value={lastName}
                onChange={handleLastNameChange}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="job-select">תפקיד</InputLabel>
                <Select
                  id="job-select"
                  value={job}
                  onChange={handleJobChange}
                  label="תפקיד"
                >
                  <MenuItem value="cleaner">מנקה</MenuItem>
                  <MenuItem value="electrician">חשמלאי</MenuItem>
                  <MenuItem value="serviceman">איש תחזוקה</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="role-select">הרשאה</InputLabel>
                <Select
                  id="role-select"
                  value={role}
                  onChange={handleRoleChange}
                  label="הרשאה"
                >
                  <MenuItem value="user">משתמש</MenuItem>
                  <MenuItem value="admin">מנהל</MenuItem>
                </Select>
              </FormControl>

              <Button type="submit" variant="contained" style={{ backgroundColor: '#131054', marginLeft: "230px" }}>
                שמור  שינויים
              </Button>


              <Button type="submit" variant="contained" style={{ backgroundColor: '#131054', marginLeft: "80px" }} onClick={handleDelete}>
                מחק עובד
              </Button>
            </Grid></Grid>
            <br />
        </form>
       
      )}

    </>
  );
};
