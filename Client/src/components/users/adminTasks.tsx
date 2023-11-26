import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Admin } from "./admin";
import { AdminSingleTodo } from './adminSingleTodo'
import { SingleTodo } from "./singleTodo";


export const AdminTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/task/isMove', {
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

    fetchTasks();
  }, []);
  return (
    <>
      <Admin />

      <div className="background" style={{ height: '100%', minHeight: '89.7vh', }}>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <h2>שלום {id}</h2> */}
          <h2> משימות שנשלחו למנהל  </h2><br />
          {/* <h2>משימות: </h2> */}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <TableContainer component={Paper} sx={{ width: 'auto' }} >
            <Table sx={{ width: 'auto' }} aria-label="simple table">
              <TableHead sx={{ width: 'auto' }}>
                <TableRow>
                  <TableCell sx={{ width: '18vw' }}>תאור</TableCell>
                  <TableCell sx={{ width: '10vw' }}>מקום</TableCell>
                  <TableCell sx={{ width: '8vw' }}>נשלח מעובד</TableCell>
                  <TableCell sx={{ width: '2vw' }}> טופל</TableCell>

                  {/* <TableCell sx={{ width: '8vw' }}>העבר למנהל</TableCell> */}

                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task, index) => (
                  <AdminSingleTodo todo={task} key={task._id} todos={tasks} id={"Admin"} setTodos={setTasks} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </div>
      </div>
    </>

  )


}