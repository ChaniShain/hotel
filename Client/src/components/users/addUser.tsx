
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Admin } from './admin';



export const AddUser = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [isDialog1Open, setIsDialog1Open] = useState(false);
  const [isDialog2Open, setIsDialog2Open] = useState(false);

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
  const handleJobChange = (e: SelectChangeEvent<string>) => {
    setJob(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('token');
    console.log(token)

    try {
      const response = await axios.post('http://localhost:3000/user', {
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
      setIsDialog1Open(true);
      setFirstName("");
      setId("");
      setJob("");
      setLastName("");
      setPassword("");
      setRole("");


    } catch (error) {
      setIsDialog2Open(true);


      console.log(error);
    }
    console.log('Submitted!', {
      id: id,
      password: password,
      firstName: firstName,
      lastName: lastName,
      roles: role,
    });
  };

  return (
    <>
    <Admin />
      <Dialog open={isDialog1Open} onClose={() => setIsDialog1Open(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DialogContent style={{ textAlign: 'center' }}>
          <DialogContentText>
            העובד התווסף בהצלחה
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

      <Dialog open={isDialog2Open} onClose={() => setIsDialog2Open(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DialogContent style={{ textAlign: 'center' }}>
          <DialogContentText>
            שגיאה - יתכן כי העובד כבר רשום במערכת
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="center">
            <Button onClick={() => setIsDialog2Open(false)} color="primary" style={{ color: '#131054' }} >
              סגור
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      <form onSubmit={handleSubmit}>
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
            <Grid style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" style={{ backgroundColor: '#131054' }}>
                הוסף עובד
              </Button></Grid>
          </Grid></Grid>
      </form>
    </>
  );
};

