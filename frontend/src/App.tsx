
import { Login } from "@mui/icons-material";

import {AppBar, Button, FormControl, IconButton, Paper, Snackbar,Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container } from "@mui/system";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MappingBedCreate from "./components/MappingBed";
import LogIn from "./components/LogIn";
import PatientCreate from "./components/PatientCreate";
import HomePage_01 from "./components/home_01";
import HomePage_02 from "./components/home_02";
import TriagePageCreate from "./components/TriagesPage";

export default function App() {
return (
  
  <Router>
              <Routes>
                <Route path="/oo" element={<LogIn />} />

                <Route path="/" element={<HomePage_01 />} />
                <Route path="/PatientCreate" element={<PatientCreate />} />
                <Route path="/TriagePageCreate" element={<TriagePageCreate />} />
                <Route path="/mappingbedcreate" element={<MappingBedCreate />} />

                
                <Route path="/" element={<TriagePageCreate />} />
              </Routes>
  </Router>
  
  );
}