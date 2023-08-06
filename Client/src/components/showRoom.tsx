
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
  imageObjectURL: string;
}

export default function ShowRoom({ rooms, onRoomSelect }: any) {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [roomstype, setRoomsType] = useState<Room[]>([]);
  const [IsOrder, setIsOrder] = useState<boolean>(false);

  const handlePrevImage = () => {
    setCurrentImage((prevImage) => (prevImage > 0 ? prevImage - 1 : imageUrls.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage < imageUrls.length - 1 ? prevImage + 1 : 0));
  };

  const handleOrder = () => (
    setIsOrder(true)
  )

  useEffect(() => {
    const fetchData = async () => {
      let newRooms: Room[] = []; 

      for (const room of rooms) {
        try {

          const response = await axios.get(`http://localhost:3000/images/${room._id}`, {
            responseType: 'blob',
          });
          const blob = new Blob([response.data], { type: 'image/jpeg' });
          const imageObjectURL = URL.createObjectURL(blob);

          console.log(imageObjectURL);
          let newRoom: Room = {
            _id: room._id,
            imageObjectURL: imageObjectURL,
          };
          // console.log("newRoom", newRoom);
          for (let i = 0; i < roomstype.length; i++) {
            // if(roomstype[i]._id==newRoom._id)
            // roomstype[i].imageObjectURL
            // const element = array[index];
          }
          newRooms.push(newRoom); 
          console.log("newRooms", newRooms)
        } catch (error) {
          console.log(error);
          return null;
        }
      }

      setRoomsType(newRooms); 
    };

    fetchData();
  }, []);


  

  useEffect(() => {
    // console.log("roomstype", roomstype)
  }, [roomstype])



  return (
    <>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
      {rooms.map((room: any, index: number) => (

        <Card sx={{ display: 'flex' ,justifyContent:'center' ,my: 6,width:"40vw",backgroundColor:"rgb(215, 234, 255)"}} key={room.id}>
          <Box sx={{ display: 'flex', flexDirection: 'column' ,my: 2}}>
          {/* <Box key={room.id} sx={{ my: 2 }}> */}
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: 25 ,fontWeight:"2px" ,textAlign:"center"}} color="text.secondary" gutterBottom>
                {room.name}
              </Typography>
              <div className="carousel-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <Carousel >
                  {roomstype[index] && (
                    <Carousel.Item key={index} >
                      <img
                        className="d-block w-100"
                        src={roomstype[index].imageObjectURL}
                        alt={`Image ${index + 1}`}
                        style={{ marginBottom: '0' }}
                      />
                    </Carousel.Item>
                  )}

                </Carousel>

                {/* <Carousel>
                  {roomstype
                    .filter((roomItem: Room) => roomItem._id === room._id)
                    .map((roomItem: Room, roomIndex: number) => (
                      <Carousel.Item key={roomIndex}>
                        <img
                          className="d-block w-100"
                          src={roomItem.imageObjectURL}
                          alt={`Image ${roomIndex + 1}`}
                          style={{ marginBottom: '0' }}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel> */}
             
              </div>
              <Typography sx={{ mb: 1.5 ,width:"25vw",textAlign:'center'}} color="text.secondary">
                {room.description}
              </Typography>
              <Typography variant="body2">
                מספר מיטות: {room.beds}
                <br />
              </Typography>
              <Typography variant="body2">
                מחיר ללילה: {room.price} ש"ח
                <br />
              </Typography>
            </CardContent>
          
            <Button type="submit" variant="contained"  style={{ backgroundColor: '#131054' }} onClick={() => onRoomSelect(room)}>
              הזמן חדר
            </Button>
         
          </Box>
        </Card>
      )
      )}

</Box>
    </>
  );
}
