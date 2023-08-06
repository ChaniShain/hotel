import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { heIL } from '@mui/x-date-pickers/locales';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import DateRangePicker from '@mui/lab/DateRangePicker';
import "./init"
import { Cell } from './cell';
import axios from 'axios';
import { AddGuest } from './guast.form';

import { InputLabel, Select, MenuItem, SelectChangeEvent, FormControl, Button } from '@mui/material';
// import {  } from 'react-bootstrap';
import { ChangeEvent, SetStateAction, useState } from 'react';
import { Margin } from '@mui/icons-material';
import ShowRoom from './showRoom';
import { useNavigate } from 'react-router-dom';
import { Moment } from 'moment';
import moment from 'moment';

export const Rooms = () => {
    const navigate = useNavigate();
    const [adultsNumber, setAdultsNumber] = useState('0');
    const [childrenNumber, setChildrenNumber] = useState('0');
    const [babiesNumber, setBabiesNumber] = useState('0');
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [showNextForm, setShowNextForm] = useState<boolean>(false);
    const [rooms, setRooms] = useState<any[]>([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [startDateSelect, setStartDateSelect] = useState<string | undefined>(undefined);
    const [endDateSelect, setEndDateSelect] = useState<string | undefined>(undefined);

    // let startDateSelect: string | undefined=undefined;
    // let endDateSelect: string | undefined=undefined;
    // פונקציה לקבלת החדר שנבחר
    const handleRoomSelect = (room: SetStateAction<null>) => {
        setSelectedRoom(room);
        navigate(`/guest.form`, { state: { startDateSelect, endDateSelect, room } });
    };


    const handleAdultsChange = (e: SelectChangeEvent<string>) => {
        setAdultsNumber(e.target.value);
    };

    const handleChildrenChange = (e: SelectChangeEvent<string>) => {
        setChildrenNumber(e.target.value);
    };

    const handleBabiesChange = (e: SelectChangeEvent<string>) => {
        setBabiesNumber(e.target.value);
    };


    const handleDatesChange = ({ startDate, endDate }: { startDate: moment.Moment | null; endDate: moment.Moment | null }) => {
        setIsDateSelected(startDate !== null && endDate !== null);


        setStartDateSelect(startDate?.format('YYYY-MM-DD'));
        setEndDateSelect(endDate?.format('YYYY-MM-DD'));
    };
    const handleAddRoom = async () => {
        
    }
    const handleSearchRooms = async () => {

        const numBeds = parseInt(adultsNumber) + parseInt(childrenNumber)
        if (numBeds > 4)
            alert("עליך להוסיף עוד חדר")
        else {
            try {
                const response = await axios.get(`http://localhost:3000/room_type`, {
                });

                const result = response.data.room_type.filter(
                    (item: { beds: number }) => item.beds >= numBeds
                );

                console.log("result", result);
                let roomPromises: any[] = [];
                let availableRoom=[];
                for (const item of result) {
                    let isAvailable=false;
                    const promise = await axios.get(`http://localhost:3000/room/type/${item._id}`);
                    console.log(promise.data, "promise");
                    promise.data.rooms.forEach((item: any) => {
                        let flag = true;
                        for (let i = 0; i < item.EntryDate.length; i++) {
                            
                            console.log(item.EntryDate[i])
                            if (moment(item.EntryDate[i]).isBefore(endDateSelect) && moment(item.ReleaseDate[i]).isAfter(endDateSelect)) {
                                flag = false;
                                break;
                            }
                            
                        }
                        if(flag==true){
                            console.log("true",item._id)
                            isAvailable=true;
                            roomPromises.push(promise);
                            return;
                        }
                   
                    });
                  if(isAvailable)
                  availableRoom.push(item);
                }
                const roomsResponses = await Promise.all(roomPromises);
                const roomsData = roomsResponses.map((response) => response.data);
             
                console.log("roomsData", roomsData);

               if(availableRoom.length==0)
               alert("אין חדרים פנויים במועד הנבחר")
                setRooms(availableRoom);
                setShowNextForm(true);

            } catch (error) {
                console.log(error);
            }
        }
    };


    return (
        <>

            <div className='room' style={{ display: 'flex', justifyContent: 'center' ,marginTop:'30px'}}>
                <Cell handleDatesDone={handleDatesChange} />
            </div>
            {isDateSelected && (
                <><div style={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControl style={{ width: '150px', margin: '10px' }}>
                        <InputLabel id="demo-simple-select-label">תינוקות (0-2)</InputLabel>
                        <Select value={babiesNumber} onChange={handleBabiesChange}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select" label="תינוקות (0-2)">
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{ width: '150px', margin: '10px' }}>
                        <InputLabel id="demo-simple-select-label">ילדים (2-12)</InputLabel>
                        <Select value={childrenNumber} onChange={handleChildrenChange}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select" label="ילדים (2-12)">
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{ width: '150px', margin: '10px' }}>
                        <InputLabel id="demo-simple-select-label">מבוגרים</InputLabel>
                        <Select value={adultsNumber} onChange={handleAdultsChange}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select" label="מבוגרים">
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                
                {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" style={{ backgroundColor: '#131054' }} onClick={handleAddRoom} >
                            הוסף חדר
                        </Button>
                    </div> */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" style={{ backgroundColor: '#131054' }} onClick={handleSearchRooms} >
                            חפש חדר
                        </Button>
                    </div>
                </>)}

            {showNextForm && <ShowRoom rooms={rooms} onRoomSelect={handleRoomSelect} />}
          
        </>
    );
};



