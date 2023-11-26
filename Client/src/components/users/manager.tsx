// import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Button, Container, ThemeProvider, Typography } from "@mui/material"
import { BarChart } from '@mui/x-charts/BarChart';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from "react";
import { axisClasses } from "@mui/x-charts";
import { Admin } from "./admin";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import Papa from 'papaparse';
import Papa, { ParseResult } from "papaparse"
type Data = {
  id: any
 num:any
}

type Values = {
  data: Data[]
}
export const Manager = () => {

  const token = Cookies.get('token');
  let usersList: string[] = [];
  let _idList: string[] = [];
  let isDoneList: number[] = [];
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  
  const [data_idList, setData_idList] = useState<any[]>([]);
  const [dataIsDoneList, setDataIsDoneList] = useState<number[]>([]);
  // const [values, setValues] = useState<Values | undefined>()
  const [flag, setFlag] = useState(false);


  const chartSetting = {
    yAxis: [
      {
        label: 'מספר משימות שבוצעו',
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };
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

  useEffect(() => {
    const csvFilePath = 'C:/חני תכנות/Project/exported_data.csv';

    const fetchData = async () => {
      try {
        const response = await fetch(csvFilePath);
        const csvData = await response.text();

        Papa.parse(csvData, {
          header: true,
          complete: (result) => {
            console.log(result.data);
            // הנתונים מהקובץ CSV נמצאים ב-result.data
          },
        });
      } catch (error) {
        console.error('Error fetching CSV file:', error);
      }
    };

    fetchData();
  }, []); // השגרה זו תופעל פעם אחת לאחר הרכבת הרכיב



  const handleExportCSV = () => {
    const dataRows = data_idList.map((id, index) => ({
      ID: id,
      NUM: dataIsDoneList[index],
    }));
    const csv = Papa.unparse({
      fields: ['ID', 'NUM'],
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
  return (
    <>
    <Admin   />
    { flag ? (
   
   
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
        {isDataLoaded ? (
        <Button sx={{ color: '#02B2AF', marginTop:'5%', marginLeft:'25%'}} onClick={handleExportCSV}>שמירת קובץ הנתונים
        {/* <Icon>FileDownloadIcon</Icon> */}
        <FileDownloadIcon/>
        </Button>
      ) : null}
      </>
  )

}