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
import { Link as RouterLink } from "react-router-dom";


function ResponsiveAppBar_01() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  return (
    <AppBar position="static" sx={{ bgcolor: "#024142" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalHospitalIcon fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/HomePage1"
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
            href="/PatientCreate"
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
            บันทึกผู้ป่วย
          </Typography>
          <Typography
            noWrap
            component="a"
            href="/TriagePageCreate"
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
            บันทึกการคัดแยกผู้ป่วย
          </Typography>
          <Typography
            noWrap
            component="a"
            href="/mappingbedcreate"
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
            บันทึกการใช้งานเตียง
          </Typography>
          <Typography
            noWrap
            component="a"
            href="/mappingbedcreate"
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
            เพิ่มข้อมูลการเข้าเยี่ยม
          </Typography>
        </Toolbar>
        <Button sx = {{backgroundColor: "#003D2E"}}  variant="contained" component={RouterLink} to="/">
             LOGOUT
           </Button>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar_01;
