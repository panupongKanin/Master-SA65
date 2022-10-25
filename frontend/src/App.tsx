
import { Login } from "@mui/icons-material";

import { AppBar, Button, FormControl, IconButton, Paper, Snackbar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container } from "@mui/system";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MappingBedCreate from "./components/MappingBedCreate";
import LogIn from "./components/LogIn";
import PatientCreate from "./components/PatientCreate";
import HomePage_01 from "./components/home_01";
import HomePage_02 from "./components/home_02";
import TriagePageCreate from "./components/TriagesPage";
import Manage from "./components/Manage";
import SymptomCreate from "./components/SymptomCreate";
import tttt from "./components/tttt";
import BasicGrid from "./components/tttt";
import BASKETCreate from "./components/MedicineCreate";
import VisitRecordCreate from "./components/VisitRecordCreate";

export default function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/HomePage1" element={<HomePage_01 />} />
        <Route path="/HomePage2" element={<HomePage_02 />} />
        <Route path="/PatientCreate" element={<PatientCreate />} />
        <Route path="/TriagePageCreate" element={<TriagePageCreate />} />
        <Route path="/MappingBedCreate" element={<MappingBedCreate />} />
        <Route path="/Manage" element={<Manage />} />
        <Route path="/SymptomCreate" element={<SymptomCreate />} />
        <Route path="/BASKETCreate" element={<BASKETCreate />} />
        <Route path="/VisitRecordCreate" element={<VisitRecordCreate />} />
        
        


      </Routes>
    </Router>

  );
}