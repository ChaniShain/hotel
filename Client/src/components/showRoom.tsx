

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Container, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import './showRoom.css';
import { Height } from '@mui/icons-material';
import { AddGuest } from './guast.form';
import { useNavigate } from 'react-router-dom';
interface Room {
  _id: string;
  imageObjectURL: any[];
}


export default function ShowRoom({ rooms, onRoomSelect }: any) {
  console.log("roomsinshow", rooms)
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [roomstype, setRoomsType] = useState<Room[]>([]);
  const [IsOrder, setIsOrder] = useState<boolean>(false);

  const [roomSelected, setRoomSelected] = useState(false);

  const [selectedRoomIndex, setSelectedRoomIndex] = React.useState(-1); // משתנה מצב
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(-1); // משתנה מצב לכפתורים
  const [selectedRooms, setSelectedRooms] = useState(Array(rooms.length).fill(null));
  const [selectedRoomKey, setselectedRoomKey] = useState(Array(rooms.length).fill(null));

  const handleOrder = (room: any, selectRoom: number, index: any) => {
    if (selectedRoomIndex !== -1) {
      const updatedSelectedRooms = [...selectedRooms]; // העתקת המערך הנבחרים
      console.log("updatedSelectedRooms",updatedSelectedRooms)
      updatedSelectedRooms[selectedRoomIndex] = room; // שינוי החדר הנבחר במערך
      console.log("updatedSelectedRooms",updatedSelectedRooms)

      setSelectedRooms(updatedSelectedRooms); // עדכן את המערך הנבחרים
      // const updatedselectedRoomKey=[...selectedRoomKey];
      // updatedselectedRoomKey[selectedRoomIndex] = room; 
    }
    console.log("selectRoom", selectedRooms)
    console.log(room, index);
    setSelectedRoomIndex(selectRoom); // שינוי צבע המסגרת של החדר
    setSelectedButtonIndex(index); // שינוי צבע הכפתור

    const selectedCard = document.querySelector(`#room-card-${index}`);
    if (selectedCard) {
      selectedCard.classList.add('selected-room');
    }
    // 
    setIsOrder(true);
    // room.classList.add('selected-room');

  }



  useEffect(() => {
  
    console.log("🔍", rooms)
  }, [roomstype])



  return (
    <>

      {rooms.map((room: any, index: number) => (
        <div key={index}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <Button variant="contained"
              key={index}
              onClick={() => {
                setSelectedRoomIndex(index);
                setSelectedButtonIndex(-1);
              }}
              style={{

                backgroundColor:selectedRooms[index] ? 'pink' : '#131054',
                margin: '10px', width: 'calc(33.33% - 10px)', flex: '1',
              }}
            >
              בחר חדר {index + 1}
            </Button>
           
          </Box>

        </div>

      ))}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      > <Button
      variant="contained"
      style={{ backgroundColor: '#131054', marginTop: '20px' }}
      onClick={() => onRoomSelect(selectedRooms)}
      disabled={selectedRooms.some(room => room === null)} // כאן אנחנו מפעילים את הכפתור אם יש ערך NaN במערך
   >
      סיום הזמנה
    </Button>
        {selectedRoomIndex !== -1 && (
          // <Card sx={{ display: 'flex', justifyContent: 'center', my: 6, width: "40vw", backgroundColor: "rgb(215, 234, 255)" }} key={rooms[selectedRoomIndex]._id}>
          <Box sx={{ display: 'flex', flexDirection: 'column', my: 2 }}>
            {rooms[selectedRoomIndex]?.map((r: any, Rindex: number) => (
              <Card key={r._id} sx={{ display: 'flex', justifyContent: 'center', my: 6, width: "40vw", backgroundColor: selectedButtonIndex === Rindex || r._id === selectedRooms[selectedRoomIndex]?._id ? 'pink' : "rgb(215, 234, 255)", }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', my: 2 }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: 25, fontWeight: "2px", textAlign: "center" }} color="text.secondary" gutterBottom>
                      {r.name}
                    </Typography>

                    <Typography sx={{ mb: 1.5, width: "25vw", textAlign: 'center' }} color="text.secondary">
                      {r.description}
                    </Typography>
                    <Typography variant="body2">
                      מספר מיטות: {r.beds}
                      <br />
                    </Typography>
                    <Typography variant="body2">
                      מחיר ללילה: {r.price} ש"ח
                      <br />
                    </Typography>
                  </CardContent>

                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: selectedRooms[selectedRoomIndex]?._id == r._id ? 'pink' : '#131054',
                    }}
                    onClick={() => {
                      handleOrder(r, selectedRoomIndex, Rindex);
                    }}
                  >
                    הזמן חדר
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
          // </Card>
        )}


      </Box>
    </>
  );
}



