


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { SingleTodo } from './singleTodo';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const User = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any[]>([]);
  const [category, setCategory] = useState();
  const token = Cookies.get('token');

  const fetchTasks = async (category: any) => {
    console.log("try", category)
    try {
      const response = await axios.get(`http://localhost:3000/task/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.task);
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
      const response = await axios.get(`http://localhost:3000/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.user.job);
      setCategory(response.data.user.job)
      fetchTasks(response.data.user.job);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <h2>שלום {id}</h2> */}
        <h2> משימות עובד  {id}</h2><br />
        {/* <h2>משימות: </h2> */}
        </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <TableContainer component={Paper} sx={{ width: '30vw' }} >
              <Table sx={{ width: '30vw' }} aria-label="simple table">
                <TableHead sx={{ width: '30vw' }}>
                  <TableRow>
                    <TableCell sx={{ width: '2vw' }}>תאור</TableCell>
                    <TableCell sx={{ width: '2vw' }}>מקום</TableCell>
                    <TableCell sx={{ width: '2vw' }}>נעשה</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task, index) => (
                    <SingleTodo todo={task} key={task._id} todos={tasks} setTodos={setTasks} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </div>
        </div>
        );
};

