import * as React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import style from '../style.module.css'

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className={style.app_bar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to="/" className={style.LINKS}>Assignments</Link>            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ECE 
          </Typography>
          <Button color="inherit">
            <Link to="/add-subject" className={style.LINKS}>ADD</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
