import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components/layout';
import { About } from './components/about';
import { Gallery } from './components/gallery';
import { Home } from './components/home';
import { Rooms } from './components/rooms';
import { LoginForm } from './components/users/loginForm';
import { Admin } from './components/users/admin';
import { User } from './components/users/user';
import { Button, Container, IconButton, Typography, Tooltip, MenuItem, Box, Menu, Select, TextField, SelectChangeEvent, FormControl, InputLabel, Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CommentIcon from '@mui/icons-material/Comment';
import Chat from '@mui/icons-material/Chat';
import { blue, red } from '@mui/material/colors';
import { Protect } from './components/users/protect';
import { AddUser } from './components/users/addUser';
import { EditUser } from './components/users/editUser';
import { useState } from 'react';
import axios from 'axios';
import img from './assets/hotel.jpg';
import logo from './assets/LOGO2.png';
import { AddGuest } from './components/guast.form';
import './appRoutes.css';


import { Manager } from './components/users/manager';
import { ProtectAdmin } from './components/users/protectAdmin';
import { NotFound } from './components/notFound';
import { AdminTasks } from './components/users/adminTasks';


const pages = ['Home', 'About', 'Gallery', 'Rooms'];

const routeTranslations: { [key: string]: string } = {
  'Home': 'בית',
  'About': 'אודות',
  'Gallery': 'גלריה',
  'Rooms': 'חדרים',

};
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const AppRoutes = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleMenuClick = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
  };



  return (
    <Router >
      <AppBar position="sticky" sx={{ bgcolor: "#131054" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',//
                textDecoration: 'none',
                backgroundImage: logo
              }}
            >
              {/* {logo} */}


            </Typography>


            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '10%' }}>
                <Link to="/">
                  <img
                    src={logo}
                    style={{ width: '90%', height: '90%', textDecoration: 'none' }}
                  />
                </Link>
              </Box>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={`/${page.toLowerCase()}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'revert-layer', fontSize: '17px', }}
                >
                  {/* {page} */}
                  {routeTranslations[page]}
                </Button>
              ))}
            </Box>
            {/*  */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/login"
              sx={{
                marginLeft: 'auto', // מיקום מצד ימין
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                fontFamily: 'revert-layer',
                fontSize: '17px'
              }}
            >Login
              {/* תוכן הרכיב */}
            </Typography>
            {/*  */}
            <Box sx={{ flexGrow: 0 }}>
              {/* <Tooltip title="Open settings"> */}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* login.. */}
                {/* <Avatar src="/static/images/avatar/2.jpg" component={Link}
                  to="/login"      {avatarContent}/> */}
                {/* <Avatar   sx={{ bgcolor: 'rgb(215, 234, 255) ',color: "#131054", textDecoration: 'none' }}
                  component={Link}
                  
                  to="/login" 
                >
                
                </Avatar> */}

                {/* <Avatar sx={{ bgcolor:'white' }}>N</Avatar> */}
              </IconButton>
              {/* </Tooltip> */}
              {/* <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }} */}
              {/* // open={Boolean(anchorElUser)}
                // onClose={handleCloseUserMenu}
              > */}
              {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))} */}
              {/* </Menu> */}
            </Box>
          </Toolbar>
        </Container>

      </AppBar>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/login" element={<LoginForm/> } />
          <Route path="/admin" element={<ProtectAdmin ><Admin/></ProtectAdmin>} />
          <Route path="/user" element={<Protect ><User/></Protect>} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/AddUser" element={<ProtectAdmin><AddUser /></ProtectAdmin>} />
       
          <Route path="/adminTasks" element={<ProtectAdmin><AdminTasks /></ProtectAdmin>} />

          <Route path="/edituser" element={<EditUser/>} />
          <Route path="/manager" element={<ProtectAdmin><Manager   /></ProtectAdmin>} />
          <Route path="/guest.form" element={<AddGuest  />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>

  );
}


export default AppRoutes;







