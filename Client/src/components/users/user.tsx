


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
  const [name,setName]=useState<string>("");
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
      setName(response.data.user.firstName+" "+response.data.user.lastName);
      console.log(response.data.user.job);
    
      setCategory(response.data.user.job)
      fetchTasks(response.data.user.job);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div className="background" style={{ height: '100%', minHeight: '89.7vh', }}>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <h2>שלום {id}</h2> */}
          <h2> משימות עובד   {name}</h2><br />
          {/* <h2>משימות: </h2> */}
          </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <TableContainer component={Paper} sx={{ width: 'auto' }} >
                <Table sx={{ width: 'auto' }} aria-label="simple table">
                  <TableHead sx={{ width: 'auto' }}>
                    <TableRow>
                      <TableCell sx={{ width: '18vw' }}>תאור</TableCell>
                      <TableCell sx={{ width: '10vw' }}>מקום</TableCell>
                      <TableCell sx={{ width: '2vw' }}>נעשה</TableCell>
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

