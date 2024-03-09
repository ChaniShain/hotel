import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { SingleTodo } from './singleTodo';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import serverConfig from '../../../config';


export const User = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any[]>([]);
  const [category, setCategory] = useState();
  const [name, setName] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const token = Cookies.get('token');

  const fetchTasks = async (category: any) => {
    try {
      const response = await axios.get(`${serverConfig.serverUrl}/task/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.task);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUserJob();

      const intervalId = setInterval(() => {
        fetchTasks(category);
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [id, navigate, category]);

  const fetchUserJob = async () => {
    try {
      const response = await axios.get(`${serverConfig.serverUrl}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName(response.data.user.firstName + " " + response.data.user.lastName);
      setCategory(response.data.user.job)
      fetchTasks(response.data.user.job);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="background" style={{ height: '100%', minHeight: '89.7vh', }}>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2> משימות עובד   {name}</h2><br />
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", marginRight: "200px" }}>

        <TableContainer component={Paper} sx={{ width: 'auto', height: 'auto', marginLeft: "260px" }} >
          <Table sx={{ width: 'auto', height: 'auto' }} aria-label="simple table">
            <TableHead sx={{ width: 'auto' }}>
              <TableRow>
                <TableCell sx={{ width: '18vw' }}>תאור</TableCell>
                <TableCell sx={{ width: '10vw' }}>מקום</TableCell>
                <TableCell sx={{ width: '2vw' }}>בוצע</TableCell>
                <TableCell sx={{ width: '8vw' }}>העבר למנהל</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <SingleTodo todo={task} key={task._id} todos={tasks} id={id} setTodos={setTasks} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    </div>
  );
};

