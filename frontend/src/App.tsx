
import { Login } from "@mui/icons-material";

import {AppBar, Button, FormControl, IconButton, Paper, Snackbar,Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container } from "@mui/system";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MappingBedCreate from "./components/MappingBed";
import LogIn from "./components/LogIn";
import PatientCreate from "./components/PatientCreate";
import HomePage from "./components/home";

export default function App() {
return (
  
  <Router>
              <Routes>
                <Route path="/LogIn" element={<LogIn />} />
                <Route path="/mappingbedcreate" element={<MappingBedCreate />} />
                <Route path="/" element={<HomePage />} />
              </Routes>
  </Router>
  
  );
}