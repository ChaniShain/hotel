
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
    setTodos: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SingleTodo = ({ todo, todos, setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.description);
    const token = Cookies.get('token');


    

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

    const handleEdit = (e: React.FormEvent, _id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) =>
                todo._id === _id ? { ...todo, todo: editTodo } : todo
            )
        );
        setEdit(false);
    };


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
                <IconButton onClick={() => handleDelete(todo._id)}>
                    <DoneIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}