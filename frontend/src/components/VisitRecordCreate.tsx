import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Alert, FormControl, MenuItem, Select, SelectChangeEvent, Snackbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { VisitorTypeInterface, VisitRecordInterface } from '../interfaces/IVisitRecord';
import { Link as RouterLink } from "react-router-dom";
import { Search } from '@mui/icons-material';
import ResponsiveAppBar from './Bar_01';

export default function VisitRecordCreate() {
  const [Added_Time, setAdded_Time] = React.useState<Dayjs | null>(dayjs());
  const [VisitorName, setVisitorName] = React.useState<String>("");
  const [VisitorContact, setVisitorContact] = React.useState<String>("");

  //save entity
  const [VisitorTypeID, setVisitorTypeID] = React.useState('');
  const [MapBedID, setMapBedID] = React.useState('');

  //data from fetch
  const [VisitorTypes, setVisitorTypes] = React.useState<VisitorTypeInterface[]>([]);

  //fetch data from other
  const [VisitRecords, setVisitRecords] = useState<Partial<VisitRecordInterface>>({});
  const [Map_Beds, setMapBeds] = React.useState<any[]>([]);
  const [Triages, setTriages] = React.useState<any[]>([]);
  const [PatientName, setPatientName] = React.useState('');
  const [VisitRecord, setVisitRecord] = React.useState<Partial<VisitRecordInterface>>();

  const [triageID, setTriageID] = React.useState('');

  const [userName, setUserName] = React.useState('');

  const userID = parseInt(localStorage.getItem("uid") + "");

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  //onchange
  const onChangeVisitorType = (event: SelectChangeEvent) => {
    setVisitorTypeID(event.target.value as string);
  };

  const onChangeMapBed = (event: SelectChangeEvent) => {
    setMapBedID(event.target.value as string);
    getTriageID();
    patna();
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  async function submit() {
    //Data ที่จะนำไปบันทึกลงใน Table VisitRecord
    let data = {
      Visitor_Name: VisitorName,
      Visitor_Contact: VisitorContact,
      Added_time: Added_Time,
      UserID: userID,
      VisitorTypeID: VisitorTypeID,
      Map_BedID: MapBedID,
    };
    console.log(data);

    const apiUrl = "http://localhost:8080/CreateVisitRecord";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          getMapBeds();
          getVisitorType();
          setSuccess(true);
        } else {
          setError(true);
        }
      });

    //reset

    setVisitorName("");
    setVisitorContact("");
    setVisitorTypeID("");
    setMapBedID("");
    setPatientName("");
    setAdded_Time(dayjs());
  }
  //function Search
  function patname() {
    getTriageID();
    const apiUrl1 = `http://localhost:8080/GetTriage/${triageID}`;
    const requestOptions1 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl1, requestOptions1)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setPatientName(res.data.Patient.Patient_Name);
        }
      });
  }

  const patna = async () => {
    getTriageID();
    const apiUrl1 = `http://localhost:8080/GetMapBed/${MapBedID}`;
    const requestOptions1 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl1, requestOptions1)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setPatientName(res.data.Triage.Patient.Patient_Name);
        }
      });
  }

  //load data to combobox

  const getVisitorType = async () => {
    const apiUrl = "http://localhost:8080/ListVisitorTypes";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setVisitorTypes(res.data);
        }
      });
  };

  const getTriageID = async () => {
    const apiUrl = `http://localhost:8080/GetMapBed/${MapBedID}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data.Triage_ID);
          setTriageID(res.data.Triage_ID);
          // setPatientName(res.data.Patient.Patient_NAME)
        }
      });
  };

  const getMapBeds = async () => {
    const apiUrl = "http://localhost:8080/GetListMapBeds";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMapBeds(res.data)
        }
      });
  };

  const getTriages = async () => {
    const apiUrl = "http://localhost:8080/GetListTriages";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTriages(res.data);
        }
      });
  };

  const getUser = async () => {
    const apiUrl = `http://localhost:8080/user${userID}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUserName(res.data.Name);
        };
      });
  };

  //========function useEffect ========
  React.useEffect(() => {
    getVisitorType();
    getMapBeds();
    getTriages();
    getTriageID();
    getUser();
    patna();

  }, [MapBedID]);

  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        {/*<Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />*/}
        {/*paper*/}
        <Paper>
          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="success">
              บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              บันทึกข้อมูลไม่สำเร็จ
            </Alert>
          </Snackbar>
          <Box
            display="flex"
            sx={{
              marginTop: 2,
            }}
          >
            <Box sx={{ width: 3000, paddingX: 30, paddingY: 1 }}>
              <Typography
                component="h2"
                variant="h4"
                color="#558b2f"
                gutterBottom
                align="center"
                fontFamily="Arial"
              >
                <hr color="Green" />
                <b>ระบบเพิ่มข้อมูลการเข้าเยี่ยมคนไข้ใน</b>
                <hr color="Green" />
              </Typography>
            </Box>
          </Box>
          {/* <Box
            display={"flex"}
            sx={{
              marginTop: 1,
              paddingY: 1,
              paddingX: 1,
            }}>
            <Typography
             component="h2"
             variant="h4"
             color= "#558b2f"
             gutterBottom
             //align="center"
             fontFamily="Arial"
             align="right"
           >
             <hr color="Green"/>
             <b>ระบบเพิ่มข้อมูลการเข้าเยี่ยมผู้ป่วย</b>
             <hr color="Green"/>
           </Typography>
          </Box> */}
          <hr />
          <Grid container spacing={1}
            sx={{
              marginY: 2,
              paddingX: 1,
            }}
          >
            <Grid item xs={2}>
              <Typography variant="inherit" align="right">
                ชื่อผู้เข้าเยี่ยม
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="VisitorName"
                value={VisitorName}
                type="string"
                variant="outlined"
                onChange={(event) => setVisitorName(event.target.value)}
              />
            </Grid>

            <Grid item xs={2}>
              <Typography variant="inherit" align="right">
                ประเภทผู้เข้าเยี่ยม
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Select
                  id="VisitorType_Name"
                  value={VisitorTypeID}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={onChangeVisitorType}
                >
                  <MenuItem value="">
                    กรุณาเลือกประเภทผู้เข้าเยี่ยม
                  </MenuItem>
                  {/* {VisitorTypes.map((item: VisitorTypeInterface)=> (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem> */}
                  {VisitorTypes.map(visitortype => (
                    <MenuItem value={visitortype.ID} key={visitortype.ID}>
                      {visitortype.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2}>
              <Typography variant="inherit" align="right">
                เบอร์โทรติดต่อ
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                value={VisitorContact}
                id="VisitorContact"
                type="string"
                variant="outlined"
                onChange={(event) => setVisitorContact(event.target.value)}
              />
            </Grid>

            <Grid item xs={2}>
              <Typography variant="inherit" align="right">
                เตียง
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth >
                <Select
                  id="Bed"
                  value={MapBedID}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={onChangeMapBed}
                >
                  <MenuItem value="">
                    กรุณาเลือกเตียง
                  </MenuItem>
                  {Map_Beds.map(mapbed => (
                    <MenuItem value={mapbed.ID} key={mapbed.ID}>
                      {mapbed.Bed.Bed_Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>

            </Grid>
            <Grid item xs={2}>
              <Typography variant="inherit" align="right">
                ชื่อผู้คนไข้ใน
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="Patient__Name"
                value={PatientName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={6}>

            </Grid>
            <Grid item xs={2}>
              <Typography variant="inherit" align="right">
                บันทึกเวลาเข้า
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="เวลาเข้า"
                  value={Added_Time}
                  onChange={(newValue) => {
                    setAdded_Time(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button sx={{ backgroundColor: "#C70039" ,marginY:3,marginX:3}}
                component={RouterLink} to="/HomePage1" variant="contained">
                ย้อนกลับ
              </Button>
              <Button
                onClick={submit}
                variant="contained"
                sx={{ float: "right" ,marginY:3,marginX:3}}
   
                color="success"
              >
                บันทึก
              </Button>
            </Grid>
          </Grid>
        </Paper>


      </Container>
    </React.Fragment>
  );
}

function convertType(VisitorTypeID: string) {
  throw new Error('Function not implemented.');
}
