// import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Container, ThemeProvider, Typography } from "@mui/material"
import { BarChart } from '@mui/x-charts/BarChart';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from "react";


export const Manager = () => {
  let a=['bar A', 'bar B', 'bar C'];
  let b=[2, 5, 3];
  const token = Cookies.get('token');
  let usersList: string[] = [];
  let _idList: string[] = [];
  let isDoneList: number[] = [];
  const [data_idList, setData_idList] = useState<string[]>([]);
  const [dataIsDoneList, setDataIsDoneList] = useState<number[]>([]);

  const [flag, setFlag] = useState(false);

  // let isDoneList: number[] = [];
  useEffect(() => {
    // fetchUsers();

    // fetchTasks();
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        for (let user of response.data.user) {
          if (user.roles[0] != "admin") {
            usersList.push(user._id+"\n"+user.firstName + " " + user.lastName);
            _idList.push(user._id);
          }

        }
        // response.data.forEach((user: { firstName: string; lastName: string; }) => {
        //   usersList.push(user.firstName+" "+user.lastName)

        // });
        console.log("_idList",_idList);

        // console.log(usersList);

      } catch (error) {
        console.error('Error fetching data:', error);
      }



      // const fetchTasks = async () => {
      // console.log("try", category)
      try {
        const response = await axios.get(`http://localhost:3000/task/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.task);
        isDoneList = new Array<number>(_idList.length).fill(0);

        for (let i = 0; i < response.data.task.length; i++) {
          // console.log(response.data.task[i])
          for (let j = 0; j < _idList.length; j++) {
            if (_idList[j] === response.data.task[i].DoneBy) {
              isDoneList[j]++;

            }
          }
        }
        setDataIsDoneList(isDoneList)
        setData_idList(usersList)
        setFlag(true);
        console.log("isDoneList",isDoneList)
      } catch (error) {
        console.error(error);
      }
    };

    // };
    fetchUsers();
  }, [flag]);

  return (
    flag ? (
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: data_idList,
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: dataIsDoneList,
          },
        ]}
        width={800}
        height={300}
      />)
      : null
  )

}