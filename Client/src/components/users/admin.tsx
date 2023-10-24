
// export const Admin = () => {
//     return <div>Admin</div>
// }

import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';

export const Admin = () => {

  const navigate = useNavigate();


  const isAdmin = Cookies.get('isAdmin');
  if (isAdmin == "false") {
    return < Navigate to="/user" replace />
  }

  return <div style={{ display: "flex", justifyContent: "center", marginTop: "20vh" }}>

    <Button variant="contained" onClick={() => navigate('/addUser')} style={{ marginRight: "35px", backgroundColor: '#131054' }}>הוספת עובד</Button>
    <Button variant="contained" style={{ backgroundColor: '#131054' }} onClick={() => navigate('/user2')}>עריכת/מחיקת עובד</Button>
    <Button variant="contained" style={{ backgroundColor: '#131054', marginLeft:"35px"}} onClick={() => navigate('/manager')}>ניהול</Button>

  </div>
};