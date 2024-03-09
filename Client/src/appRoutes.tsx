import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components/layout';
import { About } from './components/about';
import { Gallery } from './components/gallery';
import { Home } from './components/home';
import { Rooms } from './components/rooms';
import { LoginForm } from './components/users/loginForm';
import { Admin } from './components/users/admin/admin';
import { User } from './components/users/user/user';
import { Button, Container, IconButton, Typography, Tooltip, MenuItem, Box, Menu, Select, TextField, SelectChangeEvent, FormControl, InputLabel, Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Protect } from './components/users/protect';
import { AddUser } from './components/users/admin/addUser';
import { EditUser } from './components/users/admin/editUser';
import { useState } from 'react';
import logo from './assets/LOGO2.png';
import { AddGuest } from './components/guast.form';
import './appRoutes.css';
import { Manager } from './components/users/admin/manager';
import { ProtectAdmin } from './components/users/admin/protectAdmin';
import { NotFound } from './components/notFound';
import { AdminTasks } from './components/users/admin/adminTasks';


const pages = ['Home', 'About', 'Gallery', 'Rooms'];

const routeTranslations: { [key: string]: string } = {
  'Home': 'בית',
  'About': 'אודות',
  'Gallery': 'גלריה',
  'Rooms': 'חדרים',

};

export const AppRoutes = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

 
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
                  {routeTranslations[page]}
                </Button>
              ))}
            </Box>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/login"
              sx={{
                marginLeft: 'auto',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                fontFamily: 'revert-layer',
                fontSize: '17px'
              }}
            >Login
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              </IconButton>
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
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<ProtectAdmin ><Admin /></ProtectAdmin>} />
          <Route path="/user" element={<Protect ><User /></Protect>} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/AddUser" element={<ProtectAdmin><AddUser /></ProtectAdmin>} />
          <Route path="/adminTasks" element={<ProtectAdmin><AdminTasks /></ProtectAdmin>} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/manager" element={<ProtectAdmin><Manager /></ProtectAdmin>} />
          <Route path="/guest.form" element={<AddGuest />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>

  );
}


export default AppRoutes;







