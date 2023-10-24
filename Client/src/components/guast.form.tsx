
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, ThemeProvider, Box, Card, CardContent, Typography, CardActions, Checkbox, Divider, Input, FormLabel, Grid } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
// import { Carousel, ThemeProvider } from 'react-bootstrap';
import { createTheme, } from '@mui/material/styles';
import '../App.css';
import { Height } from '@mui/icons-material';

interface RoomData {
  _id: string;
  type: string;
  EntryDate: Date[];
  ReleaseDate: Date[];
}

export const AddGuest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startDateSelect, endDateSelect, room } = location.state || {};
  // console.log(room[0]._id)
  const startMoment = moment(startDateSelect, 'YYYY-MM-DD');

  const endMoment = moment(endDateSelect, 'YYYY-MM-DD');
  let nightNum = endMoment.diff(startMoment, 'days');
  if (nightNum == 0)
    nightNum = 1;
  let sum = 0;
  for (let index = 0; index < room.length; index++) {
    sum += room[index].price * nightNum;

  }
  // const payment = nightNum * room.price;
  const payment = sum;
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [roomNum, setRoomNum] = useState<RoomData>();
  const [credit, setCredit] = useState<string>('');
  const [creditDate, setCreditDate] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, '');

    setId(input);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRoomNumChange = (roomNum: RoomData) => {
    setRoomNum(roomNum);

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
      if ( i === 2 )
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
    let rnum;
    e.preventDefault();
    if (!id || !credit || !creditDate || !cvc) {
      alert("אחד או יותר מהנתונים חסרים")
      return;
    }else{

    
    try {
      const response = await axios.get(`http://localhost:3000/room/type/${room[0]._id}`);
      let isAvailable = false;
      console.log("yy")
      // let roomNum2;

      for (const item of response.data.rooms) {
        let flag = true;
        for (let i = 0; i < item.EntryDate.length; i++) {
          if (
           ( moment(item.EntryDate[i]).isBefore(endDateSelect) || 
           moment(item.EntryDate[i]).isSame(endDateSelect))
           && (moment(item.ReleaseDate[i]).isAfter(endDateSelect) ||
           moment(item.ReleaseDate[i]).isSame(endDateSelect)
          ||  moment(item.ReleaseDate[i]).isSame(startDateSelect)
           )
           
          
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
          rnum = item;
          break;
        }
      }

      console.log("roomNum", rnum);

      if (isAvailable && rnum) {
        console.log("OK");
        console.log(startDateSelect, "startDateSelect")
        try {
          const updateRoomResponse = await axios.put(`http://localhost:3000/room/${rnum._id}`, {
            _id: rnum._id,
            type: rnum.type,
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

            // console.log(addGuestResponse.data);
            // alert("ההזמנה התבצעה בהצלחה, מחכים לך ,צוות המלון");
            navigate(`/order.finish`);

          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }}
  };

  // useEffect(() => {
  //   console.log("roomNum updated:", roomNum);
  // }, [roomNum]);



  return (
    <div className="background" style={{ height: '100%', minHeight: '89.7vh', }}>

      <>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: "space-between", }} >

          <Card>

            <CardContent>
              <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
                פרטי הזמנה
              </Typography>
              <br />
              <Grid container spacing={2} width={'30vw'}>

                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">
                    מתאריך {startDateSelect} <br />
                    לתאריך {endDateSelect}
                    <br />
                    מספר לילות: {nightNum}
                    <br />
                  </Typography>
                  <Typography variant="body2">
                    סך הכל  לתשלום: {payment} ש"ח
                    <br />
                  </Typography>
                </Grid>
                {room?.map((r: any, Rindex: number) => (

                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    {/* <Divider sx={{ height: '24px', color: '#131054' }} /> */}
                    {/* <Divider sx={{ height: '4px', color: 'black', boxShadow: '0 4px 4px 0 rgba(0,0,0,0.2)', border: 'none' }} /> */}
                    <hr />
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <Typography variant="h6">
                        {r.name}<br />

                      </Typography>

                      {r.description}<br />
                      מספר מיטות: {r.beds}<br />
                      מחיר ללילה: {r.price} ש"ח
                    </Typography>
                  </Grid>))}
              </Grid>
            </CardContent>

          </Card>



          {/* <br />
        <br /> */}
          <Card sx={{ marginBottom: 'auto', overflow: 'auto', marginTop: "35px" }}>
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
                      // inputProps={{
                      //   maxLength: 7,
                      //   inputMode: 'numeric',
                      //   pattern: '[0-9 /]*',
                      // }}
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

            </form></Card>
          <br />
        </Box>
      </>
    </div>


  );
};

