
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import DirectionsIcon from '@mui/icons-material/Directions';
import React, { useEffect, useRef, useState } from "react";
import { Input, IconButton, TextField, TableCell, TableRow, Typography, Box, Table, TableBody, TableContainer, TableHead } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import serverConfig from '../../../config';

interface Props {
    todo: any;
    todos: any[];
    id: string | undefined;
    setTodos: React.Dispatch<React.SetStateAction<any[]>>;
}

export const AdminSingleTodo = ({ todo, todos, id, setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.description);
    const token = Cookies.get('token');



    const handleIsDone = async (_id: any) => {
        // the done task delete from the tasks list
        console.log(todo._id)

        setTodos(todos.filter((todo) => todo._id !== _id));
        const today = moment();
        const today2 = today.format("YYYY-MM-DD HH:mm:ss");
        try {
            const response = await axios.put(`${serverConfig.serverUrl}/task/${todo._id}`, {
                job: todo.job,
                location: todo.location,
                description: todo.description,
                isDone: true,
                DoneBy: id,
                date: today2,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }

    };

    const handleIsSend = async (_id: any) => {
        // the done task delete from the tasks list
        console.log(todo._id)
        setTodos(todos.filter((todo) => todo._id !== _id));
        try {
            const response = await axios.put(`${serverConfig.serverUrl}/task/${todo._id}`, {
                job: todo.job,
                location: todo.location,
                description: todo.description,
                isDone: false,
                DoneBy: "",
                isMove: true,
                moveBy: id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);

        } catch (error) {
            console.log(error);
        }



    };



    return (
        <TableRow >
            <TableCell sx={{ width: '18vw' }}>
                <Typography variant="body1">{todo.description}</Typography>
            </TableCell>
            <TableCell sx={{ width: '10vw' }}>
                <Typography variant="body1">
                    {todo.location}
                </Typography>
            </TableCell >
            <TableCell sx={{ width: '8vw' }}>
                {todo.moveBy}

            </TableCell>
            <TableCell sx={{ width: '2vw' }}>
                <IconButton onClick={() => handleIsDone(todo._id)}>
                    <DoneIcon />
                </IconButton>

            </TableCell>

        </TableRow>
    );
}