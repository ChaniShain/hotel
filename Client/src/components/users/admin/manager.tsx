

import { Box, Button, Container, Slider, ThemeProvider, Typography } from "@mui/material"
import { BarChart } from '@mui/x-charts/BarChart';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from "react";
import { axisClasses } from "@mui/x-charts";
import { Admin } from "./admin";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import serverConfig from '../../../config';

// import Papa from 'papaparse';
import Papa, { ParseResult } from "papaparse"
type Data = {
  id: any
  num: any
}

type Values = {
  data: Data[]
}
export const Manager = () => {

  const token = Cookies.get('token');
  const [usersList, setUsersList] = useState<string[]>([]);
  const [_idList, set_idList] = useState<string[]>([]);
  const [isDoneList, setIsDoneList] = useState<number[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [data_idList, setData_idList] = useState<any[]>([]);
  const [dataIsDoneList, setDataIsDoneList] = useState<number[]>([]);
  const [flag, setFlag] = useState(false);

  let taskArray: any[][] = [];


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${serverConfig.serverUrl}/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const newUsersList: string[] = [];
        const new_idList: string[] = [];

        for (let user of response.data.user) {
          if (user.roles[0] !== "admin") {
            newUsersList.push(user._id + "\n" + user.firstName + " " + user.lastName);
            new_idList.push(user._id);
          }
        }
        setUsersList(newUsersList);
        set_idList(new_idList);
        setIsDoneList(new Array<number>(new_idList.length).fill(0));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {

    if (usersList.length > 0 && _idList.length > 0 && isDoneList.length > 0) {

      handleChange(null, 0);
    }
  }, [usersList, _idList, isDoneList]);



  const handleExportCSV = async () => {
    await handleDownload();

    const dataRows = data_idList.map((id, index) => ({


      ID: id,
      "today": taskArray[0][index],
      'this week': taskArray[1][index],
      'this mounth': taskArray[2][index],
      'last 3 month': taskArray[3][index],
      'last 6 month': taskArray[4][index],

    }));
    const csv = Papa.unparse({
      fields: ['ID', 'today', 'this week', 'this mounth', 'last 3 month', 'last 6 month'],

      data: dataRows,
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    setIsDataLoaded(true);
  };

  function valuetext(value: number) {
    return `${value}`;
  }

  const handleDownload = async () => {
    try {
      const response = await axios.get(`${serverConfig.serverUrl}/task/allByTime`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const taskData = response.data.task;

      // Convert the nested structure into an array of objects
      const tasksArray = Object.keys(taskData).map((key) => ({
        timeCategory: key,
        tasks: taskData[key],
      }));

      // Stringify the array
      const jsonString = JSON.stringify(tasksArray, null, 2);
      let finalArray: any[] = [];
      tasksArray.forEach((category) => {
        console.log(`Time Category: ${category.timeCategory}`);
        const array = new Array<number>(_idList.length).fill(0);
        category.tasks.forEach((task: { _id: any; job: any; location: any; description: any; isDone: any; DoneBy: any; }) => {

          for (let j = 0; j < _idList.length; j++) {
            if (_idList[j] === task.DoneBy) {
              array[j]++;

            }
          }
        });
        finalArray.push(array)
      });
      taskArray = finalArray;

    } catch (error) {
      console.error('Error ', error);

    }
  }


  const handleChange = async (event: any, newValue: any) => {
    console.log(newValue);
    try {
      const response = await axios.get(`${serverConfig.serverUrl}/task/byTime/${newValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedIsDoneList = new Array<number>(_idList.length).fill(0);
      for (let i = 0; i < response.data.task.length; i++) {
        for (let j = 0; j < _idList.length; j++) {
          if (_idList[j] === response.data.task[i].DoneBy) {
            updatedIsDoneList[j]++;

          }
        }
      }
      setDataIsDoneList(updatedIsDoneList)
      setData_idList(usersList)
      setFlag(true)


    }
    catch (error) {
      console.error('Error ', error);
    }

  };
  const marks = [
    {
      value: 0,
      label: 'היום',
    },
    {
      value: 25,
      label: 'השבוע',
    },
    {
      value: 50,
      label: 'החודש',
    },
    {
      value: 75,
      label: ' 3 חודשים'
    },
    {
      value: 100,
      label: '6 חודשים',
    },

  ];

  return (
    <>
      <div className="background" style={{ height: '100%', minHeight: '89.7vh', }}>
        <Admin />
        {flag ? (


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
          />

        )
          : null}

        <Box sx={{ width: 500, marginLeft: '10%', marginTop: '2%' }}>
          <Slider
            aria-label="Always visible"
            defaultValue={0}
            getAriaValueText={valuetext}
            step={25}
            marks={marks}
            onChange={handleChange}
            sx={{ color: "#02B2AF" }}
          // valueLabelDisplay="on"
          />
        </Box>
        {isDataLoaded ? (
          <Button sx={{ color: '#02B2AF', marginTop: '4%', marginLeft: '22%' }} onClick={handleExportCSV}>שמירת קובץ הנתונים
            <FileDownloadIcon />
          </Button>
        ) : null}
      </div>
    </>
  )

}
