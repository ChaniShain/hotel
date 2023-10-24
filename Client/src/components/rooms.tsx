
import "./init"
import { Cell } from './cell';
import axios from 'axios';
import { InputLabel, Select, MenuItem, SelectChangeEvent, FormControl, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import { ChangeEvent, Key, SetStateAction, useEffect, useState } from 'react';
import ShowRoom from './showRoom';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const Rooms = () => {
    interface Room {
        _id: string;
        name: string;
        beds: number;
        description: string;
    }
    const navigate = useNavigate();

    const [isDateSelected, setIsDateSelected] = useState(false);
    const [showNextForm, setShowNextForm] = useState<boolean>(false);
    const [rooms, setRooms] = useState<Room[][]>([[]]);
    const [startDateSelect, setStartDateSelect] = useState<string | undefined>(undefined);
    const [endDateSelect, setEndDateSelect] = useState<string | undefined>(undefined);
    const [numRooms, setNumRooms] = useState(1);
    const [isDialog1Open, setIsDialog1Open] = useState(false);
    const [isDialog2Open, setIsDialog2Open] = useState(false);
    const [isTabFocused, setIsTabFocused] = useState(true);

    
    useEffect(() => {
        let timeout: number | undefined;
    
        const handleVisibilityChange = () => {
          if (document.hidden) {
            setIsTabFocused(false);
            timeout = setTimeout(() => {
              // המשתמש עזב את המסך ועברו 15 שניות
              console.log("המשתמש עזב את המסך ועברו 15 שניות");
              setShowNextForm(false);
            }, 15000); // 15 שניות
          } else {
            setIsTabFocused(true);
            clearTimeout(timeout); // במידה והמשתמש חוזר לעמוד לפני שעברו 15 שניות, אנחנו מבטלים את ה-timeout
          }
        };
    
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
      }, []);
      
    interface FormData {
        babiesNumber: string;
        childrenNumber: string;
        adultsNumber: string;
    }

    const [formsData, setFormsData] = useState<FormData[]>([{ babiesNumber: '0', childrenNumber: '0', adultsNumber: '0' }]);

    const handleRoomSelect = (room: any) => {
        navigate(`/guest.form`, { state: { startDateSelect, endDateSelect, room } });

    };

    const handleAdultsChange = (e: SelectChangeEvent<string | unknown>, index: number) => {
        const updatedFormsData = [...formsData];
        updatedFormsData[index].adultsNumber = e.target.value as string;
        setFormsData(updatedFormsData);
    };

    const handleChildrenChange = (e: SelectChangeEvent<string | unknown>, index: number) => {
        const updatedFormsData = [...formsData];
        updatedFormsData[index].childrenNumber = e.target.value as string;
        setFormsData(updatedFormsData);
    };

    const handleBabiesChange = (e: SelectChangeEvent<string | unknown>, index: number) => {
        const updatedFormsData = [...formsData];
        updatedFormsData[index].babiesNumber = e.target.value as string;
        setFormsData(updatedFormsData);
    };

    const handleDatesChange = ({ startDate, endDate }: { startDate: moment.Moment | null; endDate: moment.Moment | null }) => {
        setIsDateSelected(startDate !== null && endDate !== null);
        setStartDateSelect(startDate?.format('YYYY-MM-DD'));
        setEndDateSelect(endDate?.format('YYYY-MM-DD'));
    };

    const handleAddRoom = () => {
        let bedsNum = 0;
        formsData.forEach(form => {
            bedsNum += parseInt(form.adultsNumber) + parseInt(form.childrenNumber);
        });
        console.log("bedsNum", bedsNum);
        setNumRooms(numRooms + 1);
        setFormsData([...formsData, { babiesNumber: '0', childrenNumber: '0', adultsNumber: '0' }]);

    }

    const handleSearchRooms2 = async () => {
        await handleSearchRooms();
    }

    let roomAvailability: Record<string, boolean> = {};
    const handleSearchRooms = async () => {

        console.log("🚀 ~ file: rooms.tsx:84 ~ handleSearchRooms ~ roomAvailability:", roomAvailability)
        let countBedsNum = 0;
        let isShow = true;
        let updatedRooms: any[] = [];
        // let isOrder
        let IsSuggestion: string[] = [];
        for (let form of formsData) {

            let bedsNum = 0;
            bedsNum += parseInt(form.adultsNumber) + parseInt(form.childrenNumber);
            countBedsNum += bedsNum;
            if (bedsNum >= 4) {
                setIsDialog1Open(true);

                // alert("אורח יקר, התפוסה המבוקשת אינה מתאימה לשהייה בחדר אחד. אנא בצעו חיפוש מחדש בשני חדרים נפרדים.");
                return;
            } else {
                try {
                    // server call to get the all information about the rooms
                    const response = await axios.get(`http://localhost:3000/room_type`, {});
                    // filter the rooms by the bed's num
                    const result = response.data.room_type.filter(
                        (item: { beds: number }) => item.beds >= bedsNum
                    );
                    let availableRoom: Room[] = [];
                    let roomPromises: any[] = [];
                    for (let item of result) {
                        let isAvailable = false;
                        // get all rooms from the type who filtered
                        if (!roomAvailability[item._id]) {

                            let promise = await axios.get(
                                `http://localhost:3000/room/type/${item._id}`
                            );
                            // Checking whether the room is available in the selected date range
                            promise.data.rooms.forEach((item: any) => {
                                let flag = true;
                                for (let i = 0; i < item.EntryDate.length; i++) {
                                    if (
                                        moment(item.EntryDate[i])
                                            .isBefore(endDateSelect) &&
                                        moment(item.ReleaseDate[i]).isAfter(endDateSelect)
                                    ) {

                                        flag = false;
                                        break;
                                    }
                                }
                            //   if the current room stand in The date range put it in the available room list
                                if (flag) {
                                    
                                    IsSuggestion.push(item._id);
                                    isAvailable = true;
                                    roomPromises.push(promise);
                                    roomAvailability[item._id] = true;
                                    
                                    return;
                                }
                            });
                        }
                        if (isAvailable) availableRoom.push(item);
                    }
                    const roomsResponses = await Promise.all(roomPromises);
                    // if there are no rooms available
                    if (availableRoom.length == 0) {
                        setIsDialog2Open(true);
                        isShow = false;
                        break;
                    }
                    updatedRooms = [...updatedRooms, availableRoom];
                } catch (error) {
                    console.log(error);
                }
            }
            bedsNum = 0;
        }
        if (isShow == true) {
            setRooms(updatedRooms);
            setShowNextForm(true);
        }

    };

    // 
    const renderRoomForm = (index: number) => {
        // console.log(index)
        console.log("formsData", formsData)
        const form = formsData[index];
        if (!form) {
            return null;
        }
        const numOfRooms = index + 1;

        return (

            <div key={index}>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControl style={{ width: '150px', margin: '10px' }}>
                        <InputLabel id={`demo-simple-select-label-${index}`}>תינוקות (0-2)</InputLabel>
                        <Select
                            value={formsData[index].babiesNumber}
                            onChange={(e) => handleBabiesChange(e, index)}
                            //   value={formsData.babiesNumber} onChange={(e) => handleBabiesChange2(e, index)}
                            // value={babiesNumber} onChange={handleBabiesChange}
                            labelId={`demo-simple-select-label-${index}`}
                            id={`demo-simple-select-${index}`} label="תינוקות (0-2)">
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{ width: '150px', margin: '10px' }}>
                        <InputLabel id={`demo-simple-select-label-children-${index}`}>ילדים (2-12)</InputLabel>
                        <Select
                            value={formsData[index].childrenNumber}
                            onChange={(e) => handleChildrenChange(e, index)}
                            //  value={childrenNumber} onChange={handleChildrenChange}
                            labelId={`demo-simple-select-label-children-${index}`}
                            id={`demo-simple-select-children-${index}`} label="ילדים (2-12)">
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{ width: '150px', margin: '10px' }}>
                        <InputLabel id={`demo-simple-select-label-adults-${index}`}>מבוגרים</InputLabel>
                        <Select
                            value={formsData[index].adultsNumber}
                            onChange={(e) => handleAdultsChange(e, index)}
                            // value={adultsNumber} onChange={handleAdultsChange}
                            labelId={`demo-simple-select-label-adults-${index}`}
                            id={`demo-simple-select-adults-${index}`} label="מבוגרים">
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>
                    <div style={{ marginTop: '30px' }}>

                        # חדר {numOfRooms}
                    </div>
                </div>

                {/* {showNextForm ? <ShowRoom rooms={rooms} onRoomSelect={handleRoomSelect} /> : null} */}

            </div>

        );

    };

    // 
    return (
        <>
            {/* כאן נציין את ה-DIALOG וכיצד להציגו */}
            <Dialog open={isDialog1Open} onClose={() => setIsDialog1Open(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DialogContent style={{ textAlign: 'center' }}>
                    <DialogContentText>
                        אורח יקר, התפוסה המבוקשת אינה מתאימה לשהייה בחדר אחד
                        <br />
                        אנא בצעו חיפוש מחדש בשני חדרים נפרדים
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


            <Dialog open={isDialog2Open} onClose={() => setIsDialog2Open(false)}>
                {/* <DialogTitle>הודעת שגיאה</DialogTitle> */}
                <DialogContent>
                    <DialogContentText>  אין חדרים פנויים בתאריך הדרוש</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent="center">
                        <Button onClick={() => setIsDialog2Open(false)} color="primary" style={{ color: '#131054' }}>
                            סגור
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>


            <div className='room' style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <Cell handleDatesDone={handleDatesChange} />
            </div>
            {isDateSelected && (

                <>
                    {/* <Box display="flex" justifyContent="center"  margin={2} > */}

                    {/* <Box mx={2}></Box>  */}

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '9px' }}>
                        <Button type="submit" variant="contained" style={{ backgroundColor: '#131054' }} onClick={handleAddRoom} >
                            הוסף חדר
                        </Button>
                    </div>
                    {/* </Box> */}
                    <div>
                        {Array.from({ length: numRooms }).map((_, index) => renderRoomForm(index))}
                    </div><hr />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <Button type="submit" variant="contained" size="large" style={{ backgroundColor: '#131054' }} onClick={handleSearchRooms2} >
                            חפש חדר
                        </Button>
                    </div>
                </>)}
            {showNextForm ? <ShowRoom rooms={rooms} onRoomSelect={handleRoomSelect} /> : null}
        </>
    );
};



