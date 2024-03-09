
import "./init"
import { Cell } from './cell';
import axios from 'axios';
import { InputLabel, Select, MenuItem, SelectChangeEvent, FormControl, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton } from '@mui/material';
import { ChangeEvent, Key, SetStateAction, useEffect, useState } from 'react';
import ShowRoom from './showRoom';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';
import serverConfig from '../config';

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
    const [roomSelect, setRoomSelect] = useState<any[]>([]);
    const [startDateSelect, setStartDateSelect] = useState<string | undefined>(undefined);
    const [endDateSelect, setEndDateSelect] = useState<string | undefined>(undefined);
    const [numRooms, setNumRooms] = useState(1);
    const [isDialog1Open, setIsDialog1Open] = useState(false);
    const [isDialog2Open, setIsDialog2Open] = useState(false);
    const [isTabFocused, setIsTabFocused] = useState(true);


    interface FormData {
        babiesNumber: string;
        childrenNumber: string;
        adultsNumber: string;
    }

    const [formsData, setFormsData] = useState<FormData[]>([{ babiesNumber: '0', childrenNumber: '0', adultsNumber: '0' }]);

    // If the user has left the screen and 15 minutes have passed
    // deleting the dates of the rooms selected for presentation
    useEffect(() => {
        let timeout: any;

        const handleVisibilityChange = () => {
            //if The user is not viewing the page 
            if (document.hidden) {
                setIsTabFocused(false);
                timeout = setTimeout(async () => {
                    // if 15 seconds have passed loop over the rooms and remove the dates
                    try {
                        for (let index = 0; index < roomSelect.length; index++) {
                            for (const r of roomSelect[index]) {
                                const response = await axios.get(`${serverConfig.serverUrl}/room/${r._id}`);
                                let data = response.data.room;

                                // loop over the dates and remove the dates 
                                for (let j = 0; j < data.length; j++) {
                                    for (let i = 0; i < data[j].temporaryEntryDate.length; i++) {
                                        // Deleting the date that is equal to the date selected in the current process
                                        if (moment(data[j].temporaryEntryDate[i]).isSame(moment(startDateSelect)) &&
                                            moment(data[j].temporaryReleaseDate[i]).isSame(moment(endDateSelect))) {
                                            // new arrays without the date selected in the current process
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
                                            // Update the room 
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
                    setShowNextForm(false);
                }, 15 * 60 * 1000);  // 15 minutes 

            } else {
                // If the user comes back before the timeout, clear the timeout
                setIsTabFocused(true);
                clearTimeout(timeout);
            }
        };
        // Listen for changes in document visibility
        document.addEventListener('visibilitychange', handleVisibilityChange);
        // Cleanup: remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [roomSelect]);

    // 
    const handleRoomSelect = (room: any) => {
        console.log("רגע לפני", room)
        console.log("ועוד אחד לפני", roomSelect)

        navigate(`/guest.form`, { state: { startDateSelect, endDateSelect, room, roomSelect } });

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
        setStartDateSelect(moment(startDate)?.format("YYYY-MM-DDTHH:mm:ss.SSSZ"));
        setEndDateSelect(moment(endDate)?.format("YYYY-MM-DDTHH:mm:ss.SSSZ"));
        console.log(startDateSelect, "--", endDateSelect)
    };

    const handleDeleteRoom = (index: any) => {

        const updatedFormsData = formsData.filter((_, i) => i !== index);
        setFormsData(updatedFormsData);
    }

    const handleAddRoom = () => {
        let bedsNum = 0;
        formsData.forEach(form => {
            bedsNum += parseInt(form.adultsNumber) + parseInt(form.childrenNumber);
        });
        // console.log("bedsNum", bedsNum);
        setNumRooms(numRooms + 1);
        setFormsData([...formsData, { babiesNumber: '0', childrenNumber: '0', adultsNumber: '0' }]);

    }

    const handleSearchRooms2 = async () => {
        await handleSearchRooms();
    }

    let roomAvailability: Record<string, boolean> = {};

    const handleSearchRooms = async () => {

        let countBedsNum = 0;
        let isShow = true;
        let updatedRooms: any[] = [];
        let allRoomUpdates: any[] = [];
        // for every room
        for (let form of formsData) {
            let bedsNum = 0;
            bedsNum += parseInt(form.adultsNumber) + parseInt(form.childrenNumber);
            countBedsNum += bedsNum;
            // if the bed's num over 4
            if (bedsNum >= 4) {
                setIsDialog1Open(true);
                return;
            } else {

                try {
                    // server call to get the all information about the rooms
                    const response = await axios.get(`${serverConfig.serverUrl}/room_type`, {});
                    // filter the rooms by the bed's num
                    const result = response.data.room_type.filter(
                        (item: { beds: number; }) => item.beds >= bedsNum
                    );
                    let availableRoom = [];
                    let roomsUpdates: any[] = [];
                    let roomPromises: any[] = [];


                    for (let item of result) {
                        let isAvailable = false;
                        // get all rooms from the type who filtered
                        if (!roomAvailability[item._id]) {
                            let promise = await axios.get(
                                `${serverConfig.serverUrl}/room/type/${item._id}`
                            );
                            console.log("promise-try", promise);
                            let itemType: any[] = [];
                            promise.data.rooms.forEach((item: {
                                temporaryEntryDate: any;
                                temporaryReleaseDate: any; EntryDate: string | any[]; ReleaseDate: string | any[]; _id: string; type: any;
                            }) => {

                                let flag = false;
                                // check temporary DATES
                                for (let j = 0; j < item.temporaryEntryDate.length - 1; j++) {
                                    if (
                                        moment(item.temporaryReleaseDate[j]).isBefore(startDateSelect) &&
                                        moment(item.temporaryEntryDate[j + 1]).isAfter(endDateSelect)) {
                                        flag = true;
                                    }
                                }
                                let len = item.temporaryReleaseDate.length - 1;
                                if (
                                    moment(item.temporaryReleaseDate[len]).isBefore(startDateSelect) ||
                                    moment(item.temporaryEntryDate[0]).isAfter(endDateSelect)
                                )
                                    flag = true;
                                if (flag) {

                                    flag = false;
                                    for (let i = 0; i < item.EntryDate.length - 1; i++) {
                                        if (
                                            moment(item.ReleaseDate[i]).isBefore(startDateSelect) &&
                                            moment(item.EntryDate[i + 1]).isAfter(endDateSelect)

                                        )
                                            flag = true;

                                    }
                                    let len = item.ReleaseDate.length - 1;
                                    if (
                                        moment(item.ReleaseDate[len]).isBefore(startDateSelect) ||
                                        moment(item.EntryDate[0]).isAfter(endDateSelect)

                                    )
                                        flag = true;
                                    // if the current room stands in the date range, put it in the available room list
                                    if (flag) {

                                        isAvailable = true;
                                        roomPromises.push(promise);

                                        console.log(itemType, itemType[itemType.length - 1])

                                        if (itemType.length == 0 || itemType[itemType.length - 1] !== item.type) {
                                            itemType.push(item.type)

                                            try {

                                                const temporaryUpdate = async () => {
                                                    let updateRoomResponse = await axios.put(
                                                        `${serverConfig.serverUrl}/room/AddTemporary/${item._id}`,
                                                        {
                                                            _id: item._id,
                                                            type: item.type,
                                                            EntryDate: item.EntryDate,
                                                            ReleaseDate: item.ReleaseDate,
                                                            temporaryEntryDate: [startDateSelect],
                                                            temporaryReleaseDate: [endDateSelect],
                                                        }
                                                    );

                                                    roomAvailability[item._id] = true;
                                                    roomsUpdates.push(item);

                                                };

                                                temporaryUpdate();


                                            } catch (error) {
                                                console.error(error);
                                            }

                                            return;
                                        }
                                    }
                                }
                                else {
                                    return;
                                }
                            });

                        }
                        if (isAvailable) {

                            availableRoom.push(item);

                        }
                    }


                    for (let i = 0; i < roomsUpdates.length; i++) {

                        allRoomUpdates.push(roomsUpdates)
                    }


                    const roomsResponses = await Promise.all(roomPromises);

                    // if is no available room- error massage
                    if (availableRoom.length === 0) {
                        console.log("now")
                        setIsDialog2Open(true);
                        isShow = false;
                        break;
                    }
                    else {
                        updatedRooms = [...updatedRooms, availableRoom];
                    }

                } catch (error) {
                    console.log(error);
                }
            }
            bedsNum = 0;
        }

        if (isShow == true) {
            setRooms(updatedRooms);
            setRoomSelect(allRoomUpdates);
            setShowNextForm(true);
        }
    };


    const renderRoomForm = (index: number) => {

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
                    <div style={{ marginTop: '20px' }}>

                        # חדר {numOfRooms}

                        <IconButton color="info" onClick={() => handleDeleteRoom(index)} aria-label="add an alarm">
                            <ClearIcon sx={{ color: "#131054" }} />
                        </IconButton>
                    </div>
                </div>


            </div>

        );

    };

    // 
    return (
        <>
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
                    <DialogContentText>  ,אין חדרים פנויים בתאריך הדרוש </DialogContentText>


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



