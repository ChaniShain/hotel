import { Chat } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { CSSProperties, ChangeEvent, useState } from 'react';
import '../App.css'
import CommentIcon from '@mui/icons-material/Comment';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';




export const Home = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [id, setId] = useState('');

  const handleId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };
  const handleIconButtonClick = () => {
    if (isInputOpen) {
      setIsInputOpen(false);
    } else {
      setIsInputOpen(true);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInputOpen(false)
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
          isDone: false
        });

        console.log(response.data);
        alert("תודה! קיבלנו את פניתך ונטפל בהקדם");

      } catch (error) {
        console.log(error);
      }
    }
    else
      alert("אינך רשום במערכת")
  };
  // 
  const images = [
    { src: img1, text: "הצוות המסור שלנו תמיד זמין לספק שירות בזמן אמת, להבטיח שהייה חלקה ומהנה עבור האורחים שלנו" },
    { src: img2, text: "חוויה קולינרית יחודית, מאת טובי השפים" },
    { src: img3, text: " בריכה וג'קוזי ועוד שלל פינוקים" },
    { src: img4, text: "חדרי המלון שלנו נוחים וחדשניים" },
  ];
  const [isHovered, setIsHovered] = useState([false, false, false, false]);

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

  // 

  return (<div className='background'><div className='hotelImg'>
    <Box sx={{backgroundColor:"blue"}}>
    <div

      style={{
        
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        color: 'white'
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
            marginRight: '20px'
          }}
        >

          <TextField sx={{ display: 'flex', width: '200px', marginTop: '1px' }}
            id="outlined-basic"
            value={id}
            onChange={handleId}
            label="תעודת זהות/דרכון"
            variant="outlined" />

          <FormControl sx={{ zIndex: '2', m: 1, width: '200px', marginLeft: "2px", marginBottom: '20px' }}>
            <InputLabel id="demo-simple-select-label">נושא תקלה</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={category}
              onChange={handleChange}
              label="נושא תקלה"
            >

              <MenuItem value={'cleaner'}>ניקיון</MenuItem>
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
              sx={{ ml: 2, bottom: '1px', marginTop: '110px' }}
            >
              שלח
            </Button >
          </Box>
        </Box>
      )}
<Box sx={{backgroundColor:"blue"}}>
      <IconButton
        style={{
          color: 'white',
          // color: 'ActiveBorder',
          width: '64px',
          height: '64px',
          position: 'absolute',
          bottom: '12px',
          right: '16px',
        }}
        onClick={handleIconButtonClick}
      >

        <CommentIcon sx={{ fontSize: 50, position: 'absolute' }} />
      </IconButton>
      </Box>
    </div></Box>
  </div>

    <div style={{ display: "flex", flexWrap: "wrap" ,marginTop:"203px" }}>
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            // marginBottom: "320px",
            marginTop: "20px",
            // marginLeft: "200px",
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
    </div>;

  </div>);

}

