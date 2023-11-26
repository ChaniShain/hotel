import { BorderBottom, Chat } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Chip, Dialog, DialogActions, DialogContent, DialogContentText, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider, Typography, makeStyles } from '@mui/material';
import axios from 'axios';
import { CSSProperties, ChangeEvent, useEffect, useRef, useState } from 'react';
import '../App.css'
import CommentIcon from '@mui/icons-material/Comment';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import hotel_twice from '../assets/hotel_twice.png';
import { createTheme } from '@mui/material/styles';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

// import {  ThemeProvider } from "@mui/material"

export const Home = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [id, setId] = useState('');
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const chatRef = useRef<HTMLDivElement | null>(null);
  const [isDialog1Open, setIsDialog1Open] = useState(false);
  const [isDialog2Open, setIsDialog2Open] = useState(false);

  // const closeChat = () => {
  //   setIsInputOpen(false);
  //   setCategory('');
  //   setId('');
  //   setLocation('');
  //   setMessage('');
  // };
  const navigate = useNavigate();

  const handleOrderRoom = () => {
    navigate(`/rooms`);

  }

  // const handleClickOutside = (event: { target: any; }) => { 

  //   if (isInputOpen) {
  //     const isInsideChat = chatRef.current && chatRef.current.contains(event.target as Node);
  //     const isInsideSelect = selectRef.current && selectRef.current.contains(event.target as Node);

  //     if ((!isInsideChat && isInsideSelect)) {
  //       closeChat(); 
  //     }
  //   }



  // };
  // useEffect(() => {

  //   if (isInputOpen) {

  //     document.addEventListener('click', handleClickOutside);
  //   } else {
  //     document.removeEventListener('click', handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [isInputOpen]);


  // 
  const [scrollY, setScrollY] = useState(0);
  const targetScrollPosition = 80;
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let isScrollNearTarget = (scrollY >= targetScrollPosition && scrollY < 1800);
  console.log(isScrollNearTarget)


  let iconStyle = {
    fontSize: isScrollNearTarget ? '30px' : '50px',
    color: isScrollNearTarget ? '#131054' : 'white',

  };

  const handleId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);

  };
  const handleIconButtonClick = () => {
    if (isInputOpen) {
      setIsInputOpen(false);
      setCategory('');
      setId('');
      setLocation('');
      setMessage('');
    } else {
      setIsInputOpen(true);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInputOpen(false)
    setCategory('');
    setId('');
    setLocation('');
    setMessage('');
    let isGuest;
    try {
      isGuest = await axios.get(`http://localhost:3000/guest/${id}`, {

      });

      console.log(isGuest.data);

    } catch (error) {
      console.log(error);
    }
    if (isGuest?.data.guest !== null && id) {
      try {
        const response = await axios.post(`http://localhost:3000/task`, {
          job: category,
          location: location,
          description: message,
          isDone: false,
          isMove:false,
          moveBy:"",
        });

        console.log(response.data);
        setIsDialog1Open(true);
        // alert("תודה! קיבלנו את פניתך ונטפל בהקדם");

      } catch (error) {
        console.log(error);
      }
    }
    else
      setIsDialog2Open(true)
    // alert("אינך רשום במערכת")
  };
  // 
  const images = [
    { src: img1, text: "הצוות המסור שלנו תמיד זמין לספק שירות בזמן אמת, להבטיח שהייה חלקה ומהנה עבור האורחים שלנו" },
    { src: img2, text: "חוויה קולינרית יחודית, מאת טובי השפים" },
    { src: img3, text: " בריכה וג'קוזי ועוד שלל פינוקים" },
    { src: img4, text: "חדרי המלון שלנו נוחים וחדשניים" },
  ];
  const [isHovered, setIsHovered] = useState([false, false, false, false]);
  const [isIconHighlighted, setIsIconHighlighted] = useState(false);

  const handleIconCloseClick = () => {
    setIsIconHighlighted(true);

    setTimeout(() => {
      setIsIconHighlighted(false);
      handleIconButtonClick();
    }, 180);

  };
  const handleMouseEnter = (index: number) => {
    setIsHovered((prevState) => {
      const newIsHovered = [...prevState];
      newIsHovered[index] = true;
      return newIsHovered;
    });
  };

  const handleMouseLeave = (index: number) => {
    setIsHovered((prevState) => {
      const newIsHovered = [...prevState];
      newIsHovered[index] = false;
      return newIsHovered;
    });
  };

  const overlayStyle = (index: number): CSSProperties => ({
    position: "absolute",
    cursor: "default",
    // zIndex:1,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: isHovered[index] ? "block" : "none",
  });

  const captionStyle = {

    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontSize: "20px",
    // fontWeight: "bold",
    textAlign: "center",

  };

  // const theme = createTheme({
  //   typography: {
  //     fontFamily: 'Rubik, sans-serif',
  //   },
  // });


  return (<>
    <Dialog open={isDialog1Open} onClose={() => setIsDialog1Open(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <DialogContent style={{ textAlign: 'center' }}>
        <DialogContentText>
          תודה! קיבלנו את פניתך ונטפל בהקדם
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
          אינך רשום במערכת כאורח שלנו
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

    <div className='background'><div className='hotelImg'>
      <Box sx={{ backgroundColor: '#131054' }} ref={chatRef}>
        <div
          style={{

            position: 'fixed',
            bottom: '16px',
            right: '16px',
            color: isScrollNearTarget ? '#131054' : 'white',
            zIndex: isInputOpen ? 10 : 3,
          }}

        >לדיווח על תקלה

          {isInputOpen && (
            <Box
              sx={{
                opacity: '95%',
                backgroundColor: 'white',
                height: 'auto',
                border: '1px solid #ccc',
                borderRadius: 4,
                p: 2,
                // overflow: 'hidden',
                marginTop: '40px',
                position: 'fixed',
                bottom: '100px',
                right: '16px',
                pointerEvents: 'auto',
                marginRight: '20px',
                zIndex: '3',
                justifyContent: 'space-between',
              }}
            >

              <CloseIcon style={{
                color: '#131054',
                width: '0.2s',
                transform: isIconHighlighted ? 'scale(1.7)' : 'scale(1)',
                transition: 'transform 0.2s, color 0.2s',
              }} onClick={handleIconCloseClick} />
              <TextField sx={{ display: 'flex', width: '200px', marginTop: '9px' }}
                id="outlined-basic"
                value={id}
                onChange={handleId}
                label="תעודת זהות/דרכון"
                variant="outlined" />


              <FormControl sx={{ zIndex: '2', m: 1, width: '200px', marginLeft: "2px", marginBottom: '20px' }}  >

                <InputLabel id="demo-simple-select-label" >נושא תקלה</InputLabel>
                <Select
                  variant="outlined"
                  // labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={category}
                  onChange={handleChange}
                  label="נושא תקלה"
                  ref={selectRef}

                >

                  <MenuItem value={'cleaner'} >ניקיון</MenuItem>
                  <MenuItem value={'electrician'}>חשמל</MenuItem>
                  <MenuItem value={'serviceman'}>תחזוקה</MenuItem>
                </Select>
              </FormControl>


              <TextField sx={{ display: 'flex', width: '200px', }}
                id="outlined-basic"
                label="מיקום התקלה"
                variant="outlined"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />

              <Box sx={{ display: 'flex', mt: 3, pointerEvents: 'auto' }}>

                <TextField sx={{ display: 'flex', width: '200px' }}
                  id="outlined-multiline-static"
                  label="תאור התקלה"
                  multiline
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}

                />
                <Button onClick={handleAddTask}
                  variant="contained"
                  color="primary"
                  startIcon={<Chat />}
                  sx={{
                    backgroundColor: '#131054', '&:hover': {
                      backgroundColor: '#fff',
                      color: '#131054',
                    }, ml: 2, bottom: '1px', marginTop: '110px'
                  }}
                >
                  שלח
                </Button >
              </Box>
            </Box>
          )}
          <Box sx={{ backgroundColor: "blue" }}>
            <IconButton
              style={{
                color: 'white',

                width: '64px',
                height: '64px',
                position: 'absolute',
                bottom: '12px',
                right: '16px',

              }}
              onClick={handleIconButtonClick}
            >

              <CommentIcon sx={{ fontSize: 50, position: 'absolute' }} style={iconStyle} />
            </IconButton>
          </Box>
        </div></Box>
    </div>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "203px", zIndex: '1', }}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              // marginBottom: "320px",
              marginTop: "20px",
              zIndex: '1',
              marginLeft: index % 2 === 0 ? "260px" : "30px",
              marginRight: index % 2 === 0 ? "30px" : "260px",
              position: "relative",
              width: "30vw",
              height: "35vh",
              overflow: "hidden",
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <img src={image.src} alt="Image" style={{ width: "100%", height: "100%" }} />
            <div style={overlayStyle(index)}>
              <Typography variant="subtitle1" sx={captionStyle}>
                {image.text}
              </Typography>
            </div>
          </Box>
        ))}
      </div><br /><br />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',

      }}>
        <Typography variant="h4" sx={{ color: '#131054' }}>Diamond מלון</Typography>

        <hr />
        <Box sx={{ marginTop: '8px' }}>
          <hr />
          <Button variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#131054',
              '&:hover': {
                backgroundColor: '#fff',
                color: '#131054',
              },
            }}
            onClick={handleOrderRoom}
          >
            הזמן חדר
          </Button>  <hr />
        </Box>
      </Box>





      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Grid container spacing={{ xs: 2, md: 4 }} direction="row-reverse" >
        <Grid item xs={2} md={5}>

          <img src={hotel_twice} height={'390px'} />

        </Grid>

        <Grid item xs={2} md={6}>
          <Typography variant="h4" sx={{ color: '#131054', textAlign: 'right', marginTop: '10px' }}> Diamond מלון</Typography>
          <hr />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'right', marginTop: '80px' }}>

            {/* <Typography variant="h4" sx={{ color: '#131054' , textAlign: 'start' }}> Diamond מלון</Typography> */}
            <Typography variant='h6' sx={{ color: '#131054', textAlign: 'right' }}>.אנחנו במלון דיאמונד שמנו לנו כמטרה להיות המובילים בענף האירוח<br />
              המלון שלנו ממוקם על שפת הכינרת ומנוהל על ידי מיטב המומחים<br />
              .המציבים סטנדרטים חדשים בענף המלונאות בארץ<br />
              .צוות המלון מושתת על אנשים איכותיים ודינמיים בעלי ניסיון עשיר וידע מקצועי רב <br />
              .צוות המלון מרגיש אחריות מלאה לנופש שלך ולכן רמת השירות שלנו היא מהגבוהות בישראל<br />
              .מזמינים אתכם להתארח ולהנות מחופשה מפנקת ואיכותית ובסטנדרטים בין לאומיים<br />
            </Typography>

          </Box>
        </Grid>

      </Grid>

      <Box className="rectangle" sx={{ backgroundColor: '#131054', p: 2, textAlign: 'center', height: '35vh', marginTop: '170px' }}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          <br />
          <Grid container spacing={{ xs: 4, md: 4 }} direction="row-reverse" >
            <Grid item xs={3} md={3}>
              <Typography >
                <AccessTimeIcon fontSize="large" /><br /><br />
                <strong>שעת הגעה החל מ:</strong> 14:00 <br />
                <strong>שעת עזיבה:</strong> 12:00<br />
              </Typography>
            </Grid>
            <Grid item xs={3} md={3}>
              <Typography >
                <SmokeFreeIcon fontSize="large" /><br /><br />
                <strong> :מדיניות ללא עישון</strong><br /> ,ברחבי המלון וחדריו<br />במלון יש אזור עישון יעודי
              </Typography>
            </Grid>
            <Grid item xs={3} md={3}>
              <Typography >
                <LocalParkingIcon fontSize="large" /><br /><br />
                <strong> :הסדרי חנייה </strong><br /> חניה חיצונית בתשלום של 75 ₪ ליום <br />(על בסיס מקום פנוי בלבד)<br />
              </Typography>
            </Grid>
            <Grid item xs={3} md={3}>
              <Typography >
                <PetsIcon fontSize="large" /><br /><br />
                <strong> :בעלי חיים</strong><br /> כלבי נחיה, חילוץ והצלה: כן<br /> חיות מחמד: כן <br />
              </Typography>
            </Grid>
          </Grid>
        </Typography>
      </Box>
    </div>
  </>
  );

}

