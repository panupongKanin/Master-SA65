import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme } from '@mui/system';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { FormControl } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";


function ResponsiveAppBar_02() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };



  return (
    <AppBar position="static" sx={{ bgcolor: "#024142" }} >
      <Container maxWidth="xl">
        <Toolbar >
          <LocalHospitalIcon fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/HomePage2"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              //letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HOME
          </Typography>
          <Typography
            noWrap
            component="a"
            href="/SymptomCreate"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              //fontFamily: 'monospace',
              fontWeight: 700,
              //letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ติดตามอาการคนไข้
          </Typography>
          <Typography

            noWrap
            component="a"
            href="/Manage"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              //fontFamily: 'monospace',
              fontWeight: 700,
              //letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            เพิ่มโภชนาการ
          </Typography>
          <Typography

            noWrap
            component="a"
            href="/BASKETCreate"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              //fontFamily: 'monospace',
              fontWeight: 700,
              //letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}

          >
            การจ่ายยา
          </Typography>
          <Typography
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          />
          <Button sx = {{backgroundColor: "#003D2E"}}  variant="contained" onClick={logout} >
             LOGOUT
           </Button>
      
        </Toolbar>
        
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar_02;
