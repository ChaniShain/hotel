
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box, Card, CardContent, Typography, CardActions, Checkbox, Divider, Input, FormLabel, Grid } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useParams } from 'react-router-dom';
import moment from 'moment';
import { Carousel } from 'react-bootstrap';

interface RoomData {
  _id: string;
  type: string;
  EntryDate: Date[];
  ReleaseDate: Date[];
}

export const AddGuest = () => {
  const location = useLocation();
  const { startDateSelect, endDateSelect, room } = location.state || {};
  const startMoment = moment(startDateSelect, 'YYYY-MM-DD');

  const endMoment = moment(endDateSelect, 'YYYY-MM-DD');
  const nightNum = endMoment.diff(startMoment, 'days');
  const payment = nightNum * room.price;

  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [roomNum, setRoomNum] = useState<RoomData>();
  const [credit, setCredit] = useState<string>('');

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRoomNumChange = (roomNum: RoomData) => {
    setRoomNum(roomNum);

  };


  const handleCardNumberChange = (e: any) => {
    const input = e.target.value.length;
    setCredit(e.target.value);
    if (input == 4 || input == 9 || input == 14) {
      if (!(e.nativeEvent.inputType === 'deleteContentBackward'))
        e.target.value += " ";
      setCredit(e.target.value);
    }
  }

  const handleExpirationDateChange = (e: any) => {


    if (e.target.value.length == 2) {
      if (!(e.nativeEvent.inputType === 'deleteContentBackward'))
        e.target.value += " / ";

    }

  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/room/type/${room._id}`);
      let isAvailable = false;
      console.log("yy")
      // let roomNum2;

      for (const item of response.data.rooms) {
        let flag = true;
        for (let i = 0; i < item.EntryDate.length; i++) {
          if (
            moment(item.EntryDate[i]).isBefore(endDateSelect) &&
            moment(item.ReleaseDate[i]).isAfter(endDateSelect)
          ) {
            flag = false;
            break;
          }
        }

        if (flag === true) {
          console.log("true", item._id);
          handleRoomNumChange(item);
          isAvailable = true;
          setRoomNum(item);
          break;
        }
      }

      console.log("roomNum", roomNum);

      if (isAvailable && roomNum) {
        console.log("OK");
        console.log(startDateSelect, "startDateSelect")
        try {
          const updateRoomResponse = await axios.put(`http://localhost:3000/room/${roomNum._id}`, {
            _id: roomNum._id,
            type: roomNum.type,
            EntryDate: [startDateSelect],
            ReleaseDate: [endDateSelect],
          });


          try {
            const addGuestResponse = await axios.post(`http://localhost:3000/guest`, {
              _id: id,
              name: name,
              // roomNum: roomNum._id,
              nightNum: nightNum,
              payment: payment,
              credit: credit,
              EntryDate: moment(startDateSelect, 'YYYY-MM-DD'),
              ReleaseDate: moment(endDateSelect, 'YYYY-MM-DD'),
            });

            console.log(addGuestResponse.data);
            alert("ההזמנה התבצעה בהצלחה, מחכים לך ,צוות המלון");
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("roomNum updated:", roomNum);
  }, [roomNum]);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
              פרטי הזמנה
            </Typography>
            <br />
            <Grid container spacing={2} width={'30vw'}>

              <Grid item xs={6} sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  מתאריך {startDateSelect} <br />
                  לתאריך {endDateSelect}
                  <br />
                  מספר לילות: {nightNum}
                  <br />
                </Typography>
                <Typography variant="body2">
                  לתשלום: {payment} ש"ח
                  <br />
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

                  {room.name}<br />
                  {room.description}<br />
                  מספר מיטות: {room.beds}<br />
                  מחיר ללילה: {room.price} ש"ח
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <br />
        <br />
        <Card>
          <form onSubmit={handleSubmit}>
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
                    inputProps={{

                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                    }}

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
                    inputProps={{
                      maxLength: 19,
                      inputMode: 'numeric',
                      pattern: '[0-9 ]*',
                    }}

                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="תאריך תפוגה"
                    variant="outlined"
                    inputProps={{
                      maxLength: 7,
                      inputMode: 'numeric',
                      pattern: '[0-9 /]*',
                    }}
                    onChange={handleExpirationDateChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    variant="outlined"
                    inputProps={{
                      maxLength: 3,
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                    }}
                  />
                </Grid>
                <Grid item xs={6} >
                  <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} >
                    שמור
                  </Button>
                </Grid>
              </Grid>

            </CardContent>

          </form></Card>
        <br />
      </Box>
    </>

  );
};

