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
  DialogContent,
  DialogContentText,
  Dialog,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Admin } from './admin';
import serverConfig from '../../../config';

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '36px',
  marginTop: "33px",
});
export const EditUser = () => {
  const [idSearch, setIdSearch] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [showNextForm, setShowNextForm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isDialog1Open, setIsDialog1Open] = useState(false);

  const handleJobChange = (e: SelectChangeEvent<string>) => {
    setJob(e.target.value);
  };
  const handleIdSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdSearch(e.target.value);
  };
  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
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
      const response = await axios.get(`${serverConfig.serverUrl}/user/${idSearch}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data) {
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
      }
    } catch (error) {
      console.log(error);
      setShowNextForm(false);
      setError("עובד לא קיים");
      setId("");
      setFirstName("");
      setLastName("");
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
      const response = await axios.put(`${serverConfig.serverUrl}/user/${id}`, {
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
      setIsDialog1Open(true);
      setIdSearch('');
      setId('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setRole('');
      setJob('')

    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('token');
    console.log(token);

    try {
      const response = await axios.delete(`${serverConfig.serverUrl}/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      // alert("עובד נמחק בהצלחה");
      setIsDialog1Open(true);
      setIdSearch('');
      setId('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setRole('');
      setJob('')
      console.log('Deleted!', {
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={isDialog1Open} onClose={() => setIsDialog1Open(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DialogContent style={{ textAlign: 'center' }}>
          <DialogContentText>
            פרטי עובד שונו בהצלחה
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="center">
            <Button onClick={() => setIsDialog1Open(false)} color="primary" style={{ color: '#131054' }} >
              סגור
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      <div className="background" style={{ height: '100%', minHeight: '89.7vh', }}>
        <Admin />
        <form onSubmit={handleSubmit}>
          <FormContainer >
            {error && (
              <Alert severity="error" sx={{ width: "380px" }}>
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
                  sx={{ backgroundColor: "white" }}

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
                  sx={{ backgroundColor: "white" }}

                />

                <TextField
                  label="שם פרטי"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  fullWidth
                  margin="normal"
                  sx={{ backgroundColor: "white" }}

                />
                <TextField
                  label="שם משפחה"
                  value={lastName}
                  onChange={handleLastNameChange}
                  fullWidth
                  margin="normal"
                  sx={{ backgroundColor: "white" }}

                />
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="job-select">תפקיד</InputLabel>
                  <Select
                    id="job-select"
                    value={job}
                    onChange={handleJobChange}
                    label="תפקיד"
                    sx={{ backgroundColor: "white" }}

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
                    sx={{ backgroundColor: "white" }}

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
      </div>
    </>
  );
};
