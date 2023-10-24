

import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem, GridCellParams, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, IconButton, Menu, MenuItem, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';


interface Row {
  _id: string;
  password: string;
  job: string;
  firstName: string;
  lastName: string;
  roles: string;
}

export const User2: React.FC = () => {

  const [selectedUser, setSelectedUser] = useState<Row | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [rows, setRows] = useState<any[]>([]);
  let open = Boolean(false);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);

  const handleEditClick = (id: GridRowId) => () => {
   console.log("handleEditClick")
   
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    // console.log(r)
  };

  
  const handleDeleteClick = (id: GridRowId) => () => {
    console.log("handleDeleteClick")
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    console.log("handleCancelClick")

    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
   
    const editedRow = rows.find((row) => row.id === id);
    
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    console.log("handleRowEditStop")

    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
     
    }
  };


  const processRowUpdate = (newRow: GridRowModel) => {
    console.log("processRowUpdate")

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowSelectionChange = (newSelection: GridRowSelectionModel) => {
    console.log("handleRowSelectionChange")
   
    setSelectedRowId(newSelection.length === 1 ? String(newSelection[0]) : null);
    setRowSelectionModel(newSelection);

    const newModesModel: GridRowModesModel = {};
    newSelection.forEach((selectedRowId) => {

      newModesModel[selectedRowId] = { mode: GridRowModes.Edit };
    });
    setRowModesModel({ ...rowModesModel, ...newModesModel });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 70, editable: true },
    { field: 'firstName', headerName: 'firstName', width: 150, editable: true },
    { field: 'lastName', headerName: 'lastName', width: 150, editable: true },
    { field: 'password', headerName: 'password', width: 150, editable: true },
    { field: 'job', headerName: 'job', width: 100, editable: true },
    { field: 'roles', headerName: 'roles', width: 150, editable: true },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
      
        const selectedRowIdToEdit = selectedRowId || rowSelectionModel[0];

        // if (selectedRowIdToEdit === id) {
          if (rowModesModel[id]?.mode === GridRowModes.Edit ) {
        
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },


  ];

  const handleSaveClick = (id: GridRowId) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    console.log("handleSaveClick",rowModesModel)
    //   setRowModesModel({
    //   ...rowModesModel,
    //   [id]: { mode: GridRowModes.View, ignoreModifications: true },
    // });

    // let updatedRow = rows.find((row) => row._id === id);
    // // updatedRow = {
    // //   ...updatedRow,
    // //   // השדות שצריך לעדכן
    // //   lastName: ,  // דוגמה: השדה lastName משתנה ל "YY"
    // // };
    // console.log(updatedRow.lastName)
    
    // // כעת יש לשמור את updatedRow בשרת באמצעות axios או באופן כלשהו אחר
    
    // // לאחר השמירה, תוכלי לעדכן את המערך rows עם השורה המעודכנת
    // setRows(rows.map((row) => (row._id === id ? updatedRow : row)));
    
    // // ולשנות את מצב השורה ל-View
    // setRowModesModel({
    //   ...rowModesModel,
    //   [id]: { mode: GridRowModes.View, ignoreModifications: true },
    // });


    // console.log(updatedRow.lastName)
    // setRowModesModel({
    //   ...rowModesModel,
    //   [id]: { mode: GridRowModes.View, ignoreModifications: true },
    // });

    // try {
    //   const response = await axios.put(`http://localhost:3000/user/${id}`, {
    //     _id: updatedRow._id,
    //     password: updatedRow.password,
    //     job: updatedRow.job,
    //     firstName:updatedRow.firstName,
    //     lastName:updatedRow.lastName,
    //     roles: [updatedRow.role]
    //   }, {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });
    //   console.log(response.data);
    //   alert("פרטי עובד שונו בהצלחה");
    //   console.log('Submitted!', {
    //     id: id,
    //     password: password,
    //     firstName: firstName,
    //     lastName: lastName,
    //     roles: role,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // if (updatedRow) {
    //   const updatedRows = rows.map((row) => (row.id === id ? updatedRow : row));
    //   setRows(updatedRows);
  
   
      
      
      // setSelectedRowId(null);
      
    //   setRowSelectionModel((prevSelectionModel) =>
    //   prevSelectionModel.filter((selectedRowId) => selectedRowId !== id)
    // );
    // setSelectedRowId(null);
    // }
    // setRowSelectionModel([])
  };

  useEffect(() => {
    const token = Cookies.get('token');
    console.log(token);


    const fetchData = async () => {
      console.log("😅")
      try {
        const response = await axios.get(`http://localhost:3000/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data)
        if (Array.isArray(response.data.user)) {
          setRows(response.data.user);

        } else {
          console.error('Data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!open){
      fetchData();
      open=true;
    }
  }, [open]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <div style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: 'Menu', padding: '20px', marginTop: '2%' }}>
        <Paper elevation={3} style={{ width: 'auto', padding: '20px' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            getRowId={(row) => row._id}
            rowModesModel={rowModesModel}

            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onRowModesModelChange={handleRowModesModelChange}

            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={handleRowSelectionChange}


            // onRowSelectionModelChange={(newRowSelectionModel) => {
            //   setRowSelectionModel(newRowSelectionModel);
            //   setSelectedRowId(newRowSelectionModel.length === 1 ? String(newRowSelectionModel[0]) : null);
            // }}


            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Paper>
      </div>


    </div>
  );
}