
import "./init"
import { Cell } from './cell';
import axios from 'axios';
import { InputLabel, Select, MenuItem, SelectChangeEvent, FormControl, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import { ChangeEvent, Key, SetStateAction, useEffect, useState } from 'react';
import ShowRoom from './showRoom';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const Rooms= () => {
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

    //לא לימחוק
    // useEffect(() => {
    //     let timeout: any;

    //     const handleVisibilityChange = () => {
    //         console.log("roomSelect1", roomSelect)

    //         if (document.hidden) {
    //             setIsTabFocused(false);
    //             timeout = setTimeout(async () => {
    //                 // המשתמש עזב את המסך ועברו 15 שניות
    //                 console.log("המשתמש עזב את המסך ועברו 15 שניות");
    //                 console.log("roomSelect2", roomSelect)


    //                 try {
    //                     console.log("is")
    //                     for (let index = 0; index < roomSelect.length; index++) {
    //                         for (const r of roomSelect[index]) {
    //                             console.log(r)
    //                             const response = await axios.get(`http://localhost:3000/room/${r._id}`);
    //                             let data = response.data.room;

    //                             console.log("🚀 ~ file: guast.form.tsx:116 ~ handleSubmit ~ data:", data)

    //                             for (let j = 0; j < data.length; j++) {
    //                                 for (let i = 0; i < data[j].temporaryEntryDate.length; i++) {
    //                                     console.log(data[j].temporaryEntryDate[i], "", startDateSelect)

    //                                     if (moment(data[j].temporaryEntryDate[i]).isSame(moment(startDateSelect)) &&
    //                                         moment(data[j].temporaryReleaseDate[i]).isSame(moment(endDateSelect))) {
    //                                         console.log("--", data[j]._id);
    //                                         console.log(startDateSelect)
    //                                         // let updatedTemporaryEntryDate = data[j].temporaryEntryDate.filter((date: any) =>moment(date)  !== startDateSelect);
    //                                         // let updatedTemporaryEntryDate = data[j].temporaryEntryDate.filter((date: any) => !moment(date).isSame(moment(startDateSelect)));
    //                                         let updatedTemporaryEntryDate = data[j].temporaryEntryDate.filter((date: any) => {
    //                                             const momentDate = moment(date).format("YYYY-MM-DD");
    //                                             const momentStartDate = moment(startDateSelect).format("YYYY-MM-DD");
    //                                             return momentDate !== momentStartDate;
    //                                         });
    //                                         // let updatedTemporaryReleaseDate = data[j].temporaryReleaseDate.filter((date: any) => moment(date)  !== endDateSelect);

    //                                         let updatedTemporaryReleaseDate = data[j].temporaryReleaseDate.filter((date: any) => {
    //                                             const momentDate = moment(date).format("YYYY-MM-DD");
    //                                             const momentEndtDate = moment(endDateSelect).format("YYYY-MM-DD");
    //                                             return momentDate !== momentEndtDate;
    //                                         });

    //                                         console.log("updatedTemporaryEntryDate", updatedTemporaryEntryDate,)
    //                                         try {
    //                                             let updateRoomResponse = await axios.put(
    //                                                 `http://localhost:3000/room/temporary/${data[j]._id}`,
    //                                                 {
    //                                                     _id: data[j]._id,
    //                                                     type: data[j].type,
    //                                                     EntryDate: data[j].EntryDate,
    //                                                     ReleaseDate: data[j].ReleaseDate,
    //                                                     temporaryEntryDate: updatedTemporaryEntryDate,
    //                                                     temporaryReleaseDate: updatedTemporaryReleaseDate,
    //                                                 }
    //                                             );
    //                                             console.log("updateRoomResponse😁", updateRoomResponse);
    //                                         } catch (error) { }

    //                                     }

    //                                 }
    //                             }


    //                         }
    //                     }

    //                 }
    //                 catch (error) {
    //                     console.log(error);
    //                 }
    //             }, 15000); // 15 שניות
    //             setShowNextForm(false);
    //         } else {
    //             setIsTabFocused(true);
    //             clearTimeout(timeout);
    //         }
    //     };

    //     document.addEventListener('visibilitychange', handleVisibilityChange);

    //     return () => {
    //         document.removeEventListener('visibilitychange', handleVisibilityChange);
    //     };
    // }, [roomSelect]);
    // 

    interface FormData {
        babiesNumber: string;
        childrenNumber: string;
        adultsNumber: string;
    }

    const [formsData, setFormsData] = useState<FormData[]>([{ babiesNumber: '0', childrenNumber: '0', adultsNumber: '0' }]);

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
                    const response = await axios.get(`http://localhost:3000/room_type`, {});
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
                                `http://localhost:3000/room/type/${item._id}`
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
                                                        `http://localhost:3000/room/AddTemporary/${item._id}`,
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
                            // rooms type 
                            availableRoom.push(item);

                        }
                    }

                    console.log(roomsUpdates.length, roomsUpdates, "090")
                    console.log("First object _id:", roomsUpdates.length);
                    // console.log("Second object type:", roomsUpdates[1].type);
                    for (let room of roomsUpdates) {
                        console.log(roomsUpdates.length, roomsUpdates, "092")
                        const roomId = room._id;
                        console.log("🚀 ~ file: rooms2.tsx:329 ~ handleSearchRooms ~ roomId:", roomId)

                    }
                    for (let i = 0; i < roomsUpdates.length; i++) {

                        console.log(roomsUpdates[i])
                        allRoomUpdates.push(roomsUpdates)
                    }
                    // allRoomUpdates = [...allRoomUpdates, ...[...roomsUpdates]]

                    // allRoomUpdates = allRoomUpdates.concat(roomsUpdates);
                    console.log("allRoomUpdates😴", allRoomUpdates)
                    // allRoomUpdates.concat(roomsUpdates);

                    // console.log("availableRoom", availableRoom);
                    const roomsResponses = await Promise.all(roomPromises);

                    // if is no available room- error massage
                    if (availableRoom.length === 0) {
                        console.log("now")
                        setIsDialog2Open(true);
                        isShow = false;
                        break;
                    }
                    else {
                        // updatedRooms.push(availableRoom);
                        updatedRooms = [...updatedRooms, availableRoom];
                    }

                } catch (error) {
                    console.log(error);
                }
            }
            bedsNum = 0;
        }

        if (isShow == true) {
            console.log(updatedRooms, "==")
            setRooms(updatedRooms);
            setRoomSelect(allRoomUpdates);
            setShowNextForm(true);
        }
    };

    // const handleSearchRooms = async () => {
    //     try {
    //         let countBedsNum = 0;
    //         let updatedRooms: any[] = [];
    //         let IsSuggestion: string[] = [];

    //         for (let form of formsData) {
    //             let bedsNum = parseInt(form.adultsNumber) + parseInt(form.childrenNumber);
    //             countBedsNum += bedsNum;

    //             if (bedsNum >= 4) {
    //                 setIsDialog1Open(true);
    //                 return;
    //             } else {
    //                 const response = await axios.get(`http://localhost:3000/room_type`, {});
    //                 const result = response.data.room_type.filter((item: { beds: number }) => item.beds >= bedsNum);

    //                 let availableRoom: Room[] = [];
    //                 let roomPromises: Promise<any>[] = [];

    //                 for (let item of result) {
    //                     let isAvailable = false;

    //                     if (!roomAvailability[item._id]) {
    //                         const promise = axios.get(`http://localhost:3000/room/type/${item._id}`);

    //                         const roomData = await promise;
    //                         console.log("<<", roomData);

    //                         for (let i = 0; i < item.EntryDate?.length - 1; i++) {
    //                             if (
    //                                 moment(item.ReleaseDate[i]).isBefore(startDateSelect) &&
    //                                 moment(item.EntryDate[i + 1]).isAfter(endDateSelect)
    //                             ) {
    //                                 console.log("😍");

    //                                 try {
    //                                     console.log("😍");
    //                                     await axios.put(`http://localhost:3000/room/temporary/${item._id}`, {
    //                                         _id: item._id,
    //                                         type: item.type,
    //                                         EntryDate: item.EntryDate,
    //                                         ReleaseDate: item.ReleaseDate,
    //                                         temporaryEntryDate: [startDateSelect],
    //                                         temporaryReleaseDate: [endDateSelect],
    //                                     });
    //                                 } catch (error) {
    //                                     console.error(error);
    //                                 }
    //                             }
    //                         }
    //                         let len = item.ReleaseDate?.length - 1
    //                         //                                 if (moment(item.ReleaseDate[len]).isBefore(startDateSelect) ||
    //                         //                                     moment(item.EntryDate[0]).isAfter(endDateSelect))
    //                         //                                     flag = true;
    //                         if (moment(item.ReleaseDate[len]).isBefore(startDateSelect) ||
    //                             moment(item.EntryDate[0]).isAfter(endDateSelect)) {
    //                             roomAvailability[item._id] = true;
    //                             isAvailable = true;
    //                             IsSuggestion.push(item._id);
    //                             roomPromises.push(promise);
    //                         }
    //                     }

    //                     if (isAvailable) {
    //                         availableRoom.push(item);
    //                     }
    //                 }

    //                 console.log("availableRoom", availableRoom);
    //                 const roomsResponses = await Promise.allSettled(roomPromises);

    //                 if (availableRoom.length === 0) {
    //                     setIsDialog2Open(true);
    //                 } else {
    //                     updatedRooms = [...updatedRooms, availableRoom];
    //                 }
    //             }
    //         }

    //         if (updatedRooms.length > 0) {
    //             setRooms(updatedRooms);
    //             setShowNextForm(true);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // 

    const renderRoomForm = (index: number) => {
        // console.log(index)
        // console.log("formsData", formsData)
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



