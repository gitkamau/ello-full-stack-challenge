import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import {Menu} from '@mui/material';
import useStyles from '../assets/css/headerStyles';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const classes = useStyles();
  const location = useLocation();

  const handleLogout = () => {
    console.log('Logging out...');
  };
  return (
    <AppBar position="static" style={{ backgroundColor: '#5ACCCC', color: '#FFFFFF' }}  className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" className={classes.menuIcon}>
          <Menu />
        </IconButton>
        {location.pathname === '/' && (
          <Typography variant="h6" component="div" className={classes.appName}>
            Ello Assessment
          </Typography>
        )}
        <Button color="inherit" style={{ backgroundColor: '#FABD33', color: '#FFFFFF' }} className={classes.logoutButton} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

