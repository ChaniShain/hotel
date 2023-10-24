
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import DirectionsIcon from '@mui/icons-material/Directions';
import React, { useEffect, useRef, useState } from "react";
import { Input, IconButton, TextField, TableCell, TableRow, Typography, Box, Table, TableBody, TableContainer, TableHead } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';
import Cookies from 'js-cookie';
// import "./styles.css"
interface Props {
    todo: any;
    todos: any[];
    id:string | undefined;
    setTodos: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SingleTodo = ({ todo, todos, id,setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.description);
    const token = Cookies.get('token');


    const handleIsDone = async (_id: any) => {
        // the done task delete from the tasks list
        console.log(todo._id)
        setTodos(todos.filter((todo) => todo._id !== _id));
        try {
            const response = await axios.put(`http://localhost:3000/task/${todo._id}`, {
                job: todo.job,
                location: todo.location,
                description: todo.description,
                isDone: true,
                DoneBy: id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            alert("משימה התעדכנה בהצלחה");

        } catch (error) {
            console.log(error);
        }

    };

    const handleDelete = async (_id: number) => {
        console.log("***")
        setTodos(todos.filter((todo) => todo._id !== _id));
        try {
            const response = await axios.delete(`http://localhost:3000/task/${todo._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            alert("משימה נמחקה בהצלחה");

        } catch (error) {
            console.log(error);
        }
    };

    // const handleEdit = (e: React.FormEvent, _id: number) => {
    //     e.preventDefault();
    //     setTodos(
    //         todos.map((todo) =>
    //             todo._id === _id ? { ...todo, todo: editTodo } : todo
    //         )
    //     );
    //     setEdit(false);
    // };


    return (
        <TableRow >
            <TableCell sx={{ width: '18vw' }}>
                <Typography variant="body1">{todo.description}</Typography>
            </TableCell>
            <TableCell sx={{ width: '18vw' }}>
                <Typography variant="body1">
                    {todo.location}
                </Typography>
            </TableCell >
            <TableCell sx={{ width: '2vw' }}>
                <IconButton onClick={() => handleIsDone(todo._id)}>
                    <DoneIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}