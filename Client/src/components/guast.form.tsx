
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, ThemeProvider, Box, Card, CardContent, Typography, CardActions, Checkbox, Divider, Input, FormLabel, Grid, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
// import { Carousel, ThemeProvider } from 'react-bootstrap';
import '../App.css';
import serverConfig from '../config';

interface RoomData {
  _id: string;
  type: string;
  EntryDate: Date[];
  ReleaseDate: Date[];
}

export const AddGuest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startDateSelect, endDateSelect, room, roomSelect } = location.state || {};
  console.log("startDateSelect", startDateSelect)
  console.log("endDateSelect", endDateSelect)

  let localroom: any = room;
  const startMoment = moment(startDateSelect, 'YYYY-MM-DD');

  const endMoment = moment(endDateSelect, 'YYYY-MM-DD');
  const formattedStartMoment = startMoment.format('YYYY-MM-DD');
  const formattedEndMoment = endMoment.format('YYYY-MM-DD');
  let nightNum = endMoment.diff(startMoment, 'days');
  if (nightNum == 0)
    nightNum = 1;
  let sum = 0;
  for (let index = 0; index < room.length; index++) {
    sum += room[index].price * nightNum;

  }
  const payment = sum;
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [credit, setCredit] = useState<string>('');
  const [creditDate, setCreditDate] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const update = async () => {
    try {
      for (let index = 0; index < roomSelect.length; index++) {

        for (const r of roomSelect[index]) {
          const response = await axios.get(`${serverConfig.serverUrl}/room/${r._id}`);
          let data = response.data.room;
          for (let j = 0; j < data.length; j++) {
            for (let i = 0; i < data[j].temporaryEntryDate.length; i++) {
              if (moment(data[j].temporaryEntryDate[i]).isSame(moment(startDateSelect)) &&
                moment(data[j].temporaryReleaseDate[i]).isSame(moment(endDateSelect))) {

                let updatedTemporaryEntryDate = data[j].temporaryEntryDate.filter((date: any) => {
                  const momentDate = moment(date).format("YYYY-MM-DD");
                  const momentStartDate = moment(startDateSelect).format("YYYY-MM-DD");
                  return momentDate !== momentStartDate;
                });

                let updatedTemporaryReleaseDate = data[j].temporaryReleaseDate.filter((date: any) => {
                  const momentDate = moment(date).format("YYYY-MM-DD");
                  const momentEndtDate = moment(endDateSelect).format("YYYY-MM-DD");
                  return momentDate !== momentEndtDate;
                });

                try {
                  let updateRoomResponse = await axios.put(
                    `${serverConfig.serverUrl}/room/temporary/${data[j]._id}`,
                    {
                      _id: data[j]._id,
                      type: data[j].type,
                      EntryDate: data[j].EntryDate,
                      ReleaseDate: data[j].ReleaseDate,
                      temporaryEntryDate: updatedTemporaryEntryDate,
                      temporaryReleaseDate: updatedTemporaryReleaseDate,
                    }
                  );
                } catch (error) { }

              }

            }
          }


        }
      }

    }
    catch (error) {
      console.log(error);
    }
  }
  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, '');

    setId(input);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };



  const handleCardNumberChange = (e: any) => {

    const input = e.target.value.replace(/[^0-9]/g, '');
    let formattedInput = '';

    for (let i = 0; i < input.length; i++) {
      if (i === 4 || i === 8 || i === 12) {
        formattedInput += ' ';
      }
      formattedInput += input.charAt(i);

    }
    if (formattedInput.length <= 19) {
      setCredit(formattedInput.trim());
    }
  }
  const handleExpirationDateChange = (e: any) => {
    console.log(e.target.value)
    const input = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
    let formattedInput = '';
    for (let i = 0; i < input.length; i++) {
      if (i === 2)
        formattedInput += '/';
      formattedInput += input.charAt(i);

    }

    setCreditDate(formattedInput);

  }

  const handleCvcChange = (e: any) => {
    const input = e.target.value.replace(/\D/g, '');
    if (/^\d{0,3}$/.test(input)) {
      setCvc(input);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id || !credit || !creditDate || !cvc) {
      alert("אחד או יותר מהנתונים חסרים")
      return;
    } else {
      let rooms_id = [];
      try {
        for (let index = 0; index < roomSelect.length; index++) {
          let flag = false;
          for (let r of roomSelect[index]) {

            const response = await axios.get(`${serverConfig.serverUrl}/room/${r._id}`);
            let data = response.data.room[0];
            for (let i = 0; i < data.temporaryEntryDate.length; i++) {

              if (moment(data.temporaryEntryDate[i]).isSame(moment(startDateSelect)) &&
                moment(data.temporaryReleaseDate[i]).isSame(moment(endDateSelect))) {
                let updatedTemporaryEntryDate = data.temporaryEntryDate.filter((date: any) => {
                  const momentDate = moment(date).format("YYYY-MM-DD");
                  const momentStartDate = moment(startDateSelect).format("YYYY-MM-DD");
                  return momentDate !== momentStartDate;
                });

                let updatedTemporaryReleaseDate = data.temporaryReleaseDate.filter((date: any) => {
                  const momentDate = moment(date).format("YYYY-MM-DD");
                  const momentEndtDate = moment(endDateSelect).format("YYYY-MM-DD");
                  return momentDate !== momentEndtDate;
                });


                if (flag == false && data.type == room[index]._id) {
                  flag = true;
                  rooms_id.push(data._id);

                  try {
                    let updateRoomResponse = await axios.put(
                      `${serverConfig.serverUrl}/room/${data._id}`,
                      {
                        _id: data._id,
                        type: data.type,
                        EntryDate: [startDateSelect],
                        ReleaseDate: [endDateSelect],
                        temporaryEntryDate: updatedTemporaryEntryDate,
                        temporaryReleaseDate: updatedTemporaryReleaseDate,
                      }
                    );

                    if (index == roomSelect.length - 1) {
                      try {
                        const addGuestResponse = await axios.post(`${serverConfig.serverUrl}/guest`, {
                          id: id,
                          name: name,
                          roomNum: rooms_id,
                          nightNum: nightNum,
                          payment: payment,
                          credit: credit,
                          EntryDate: startDateSelect,
                          ReleaseDate: endDateSelect,
                        });

                        setIsDialogOpen(true);
                        setFormSubmitted(true);
                        setName("");
                        setCredit("");
                        setCreditDate("");
                        setCvc("");
                        setId("");
                      } catch (error) {
                        console.log(error);
                      }
                    }
                  }
                  catch (error) { }

                }
                else {

                  try {
                    let updateRoomResponse = await axios.put(
                      `${serverConfig.serverUrl}/room/temporary/${data._id}`,
                      {
                        _id: data._id,
                        type: data.type,
                        EntryDate: data.EntryDate,
                        ReleaseDate: data.ReleaseDate,
                        temporaryEntryDate: updatedTemporaryEntryDate,
                        temporaryReleaseDate: updatedTemporaryReleaseDate,
                      }
                    );
                  }

                  catch (error) { }
                }
              }
            }
          }
        }

      }
      catch (error) {
        console.log(error);
      }
    }
  }



  return (
    <div className="background" style={{ height: '100%', minHeight: '89.7vh', }}>
      <>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DialogContent style={{ textAlign: 'center' }}>
            <DialogContentText>
              ההזמנה התבצעה בהצלחה, מחכים לך ,צוות המלון
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="center">
              <Button onClick={() => setIsDialogOpen(false)} color="primary" style={{ color: '#131054' }} >
                סגור
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: "space-between", }} >

          <Card>

            <CardContent>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                פרטי הזמנה
              </Typography>
              <br />
              <Grid container spacing={2} width={'30vw'}>

                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" component={'span'} >
                    מתאריך {formattedStartMoment} <br />
                    לתאריך {formattedEndMoment}
                    <br />
                    מספר לילות: {nightNum}
                    <br />
                  </Typography>
                  <Typography variant="body2" component={'span'} >
                    סך הכל  לתשלום: {payment} ש"ח
                    <br />
                  </Typography>
                </Grid>
                {room?.map((r: any, Rindex: number) => (

                  <Grid item xs={12} sx={{ textAlign: 'center' }} key={Rindex}>

                    <hr />
                    <Typography component={'span'} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <Typography component={'span'} variant="h5">
                        {r.name}<br />

                      </Typography >

                      {r.description}<br />
                      מספר מיטות: {r.beds}<br />
                      מחיר ללילה: {r.price} ש"ח
                    </Typography>
                  </Grid>))}
              </Grid>
            </CardContent>

          </Card>

          <Card sx={{ marginBottom: 'auto', overflow: 'auto', marginTop: "35px" }}>
            {!formSubmitted && (
              <form >
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="שם"
                        variant="outlined"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="תעודת זהות"
                        value={id}
                        onChange={handleIdChange}
                        variant="outlined"

                      />
                    </Grid>

                  </Grid></CardContent>
                <CardContent>
                  <Grid container spacing={2}>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="מספר אשראי"
                        value={credit}
                        onChange={handleCardNumberChange}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="תאריך תפוגה"
                        variant="outlined"
                        value={creditDate}
                        onChange={handleExpirationDateChange}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="CVC"
                        variant="outlined"
                        value={cvc}
                        onChange={handleCvcChange}
                      />
                    </Grid>
                    <Grid item xs={6} >
                      <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} sx={{
                        backgroundColor: '#131054',
                        '&:hover': {
                          backgroundColor: '#fff',
                          color: '#131054',
                        },
                      }} >
                        שמור
                      </Button>
                    </Grid>
                  </Grid>

                </CardContent>

              </form>
            )}
          </Card>
          <br />
        </Box>
      </>
    </div>
  );
};

