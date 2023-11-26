
// export const Admin = () => {
//     return <div>Admin</div>
// }

import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useEffect } from 'react';
export const Admin = () => {

  const navigate = useNavigate();


  const isAdmin = Cookies.get('isAdmin');
  
  if (isAdmin == "false") {
    return < Navigate to="/user" replace />
  }
 
  const iconList = [<SignalCellularAltIcon/>, <PersonAddIcon/>, <ManageAccountsIcon/>,<FormatListBulletedIcon/>];
  const linkList=["manager","addUser","edituser","adminTasks"];
  console.log()
  useEffect(() => {
    if ( location.pathname === '/admin') {
      // עבר אל ניווט המנהל
      navigate("/adminTasks");
   
    }
  }, [ navigate, location.pathname]);
  // if (!linkList.includes(location.pathname.slice(1)) ) {
  //   console.log("true")
  //   navigate("/manager");
  // }
  return <div style={{ display: "flex", justifyContent: "center", }}>
    <Drawer
      sx={{
       
        zIndex: 3,
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,

          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <List sx={{ marginTop:'20vh',}}>
        {['ניהול', 'הוספת עובד', 'עריכת/מחיקת עובד', 'משימות שנשלחו'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navigate(`/${linkList[index]}`)}>
            <ListItemIcon>
             { iconList[index]}
             
          {/* {React.createElement(iconList[index])} */}
        </ListItemIcon>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  

  </div>

};