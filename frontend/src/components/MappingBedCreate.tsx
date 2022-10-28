import * as React from 'react';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { AppBar, Button, FormControl, IconButton, Paper, Snackbar, Toolbar, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from '@mui/material/TextField';
import { ZoneInterface, BedInterface, MappingBedInterface } from "../interfaces/MapBedUI";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ResponsiveAppBar from './Bar_01';
import { Link as RouterLink } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MappingBedCreate() {
  //=======================================================================================================================================
  //รับค่าที่ได้จากการเลือก combobox ทั้งหมดเป็นตารางที่ ดึงไปใส่ตารางหลัก 

  // TODO บันทึกลงตารางหลัก
  const [triageID, setTriageID] = useState('');
  const [zoneID, setZoneID] = useState('');
  const [bedID, setBedID] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [comments, setComments] = useState('');
  // const [userID,setUserID] = useState('');

  // data ที่ได้มาจากการ fethch
  const [MapBeds, setMapbeds] = useState<Partial<MappingBedInterface>>({});
  const [Zones, setZones] = useState<ZoneInterface[]>([]);
  const [Beds, setBeds] = useState<BedInterface[]>([]);

  // data ที่ได้มาจากการ fethch ตารางเพื่อน และ search function
  const [triages, setTriages] = useState<any[]>([]);
  const [IPD_Name, setIPD_Name] = useState<any[]>([]);
  const [Disease_Name, setDisease_Name] = useState<any[]>([]);

  const [userName, setUserName] = useState('');

  // console.log(userName);

  /*
        ได้ 
        Disease_Type_Name       -->   ตาราง Disease_Type
        Gender_Name             -->   ตาราง Gender_Name
  */
  const [DiseaseType, setDiseaseType] = useState<any[]>([]);
  const [GenderType, setGenderType] = useState<any[]>([]);

  // Check save
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const userID = parseInt(localStorage.getItem("uid") + "");
  console.log(triages);

  //=======================================================================================================================================
  //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof MappingBedCreate;
    const { value } = event.target;
    setMapbeds({ ...MapBeds, [id]: value });
    setComments(value);
  };

  const onChangeTriage = (event: SelectChangeEvent) => {
    setTriageID(event.target.value as string);

  };

  const onChangeZone = (event: SelectChangeEvent) => {
    setZoneID(event.target.value as string);
  };

  const onChangeBed = (event: SelectChangeEvent) => {
    setBedID(event.target.value as string);
  };

  //=======================================================================================================================================
  //function Submit
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
    // Data ที่จะนำไปบันทึกลงใน Table Map_Bed
    let data = {
      Triage_ID: triageID,
      Bed_ID: bedID,
      Admidtime: date,
      MapBed_Comment: comments,
      User_ID: userID,
    };
    // Data ที่จะนำไป PATCH เพื่อเปลี่ยนค่า Bed_State เมื่อเตียงนั้นมีการใช้งาน
    let dataUpdateBedState = {
      id: bedID,
      Bed_State: 1,
    };
    // Data ที่จะนำไป PATCH เพื่อเปลี่ยนค่า Triage_State เมื่อผู้ป่วยถูกแมพกับเตียงแล้ว
    let dataUpdateTriageState = {
      id: triageID,
      Triage_State: 1,
    };

    console.log(dataUpdateBedState);
    console.log(dataUpdateTriageState);
    console.log(data);

    const apiUrl = "http://localhost:8080/CreateMapBed";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          UpdateBedstate();
          UpdateTriagestate();
          getTriages();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          setSuccess(true);
        } else {
          setError(true);
        }
      });

    const UpdateBedstate = async () => {
      const apiUrl = "http://localhost:8080/UpdateBedstate";
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataUpdateBedState),
      };
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) { }
        });
    };
    const UpdateTriagestate = async () => {
      const apiUrl = "http://localhost:8080/UpdateTriagestate";
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataUpdateTriageState),
      };
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) { }
        });
    };


    // reset All after Submit
    setTriageID("");
    setBedID("");
    setDate(null);
    setZoneID("");
    setDisease_Name([]);
    setDiseaseType([])
    setIPD_Name([]);
    setGenderType([]);
    setComments("")
    setGenderType([]);
    setTriages([]);
    //==================================     
  }

  //=======================================================================================================================================
  //function Search
  function search() {
    const apiUrl1 = `http://localhost:8080/GetTriage/${triageID}`;
    const requestOptions1 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl1, requestOptions1)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          //console.log(res.data);
          setIPD_Name(res.data.InpantientDepartment.InpantientDepartment_NAME);
          setDisease_Name(res.data.Disease.Disease_NAME)
          setDiseaseType(res.data.Disease.DiseaseType.DiseaseType_NAME)
          setGenderType(res.data.Patient.Gender.Gender_Name)
        }
      });
  }

  //=======================================================================================================================================
  //function fethch data จาก backend
  const getMappigBed = async () => {
    const apiUrl = "http://localhost:8080/GetListMapBeds";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);

          // setFiltertriages(res.data)
        } else {
          console.log("error");

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
          setTriages(res.data)
        }
      });
  };

  const getZone = async () => {
    const apiUrl = "http://localhost:8080/GetListZones";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setZones(res.data);
        }
      });
  };

  const getBed = async () => {
    const apiUrl = `http://localhost:8080/Bed/${zoneID}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setBeds(res.data);
        } else {
          setBeds([]);
        }
      });
  };

  const getUser = async () => {
    const apiUrl = `http://localhost:8080/user/${userID}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUserName(res.data.Name);
        }
      });
  };

  //========function useEffect ========
  useEffect(() => {
    getTriages();
    getZone();
    getMappigBed();
    getUser();
  }, []);

  useEffect(() => {
    getBed();
  }, [zoneID]);

  //=======================================================================================================================================
  //Uer inter face
  //=======================================================================================================================================

  return (
    <Paper elevation={0}>
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
      <ResponsiveAppBar />

      <Container maxWidth="md">

        <Box
          display={"flex"}
          sx={{
            marginTop: 2,
            marginX: 2,
          }}
        >
          <Box sx={{ paddingX: 18, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h4"
              color="#558b2f"
              gutterBottom
              //align="center"
              fontFamily="Arial"
            >
              <hr color="Green" />
              <b>ระบบบันทึกการใช้งานเตียงคนไข้ใน</b>
              <hr color="Green" />
            </Typography>

          </Box>
        </Box>

        <hr />
        <Box>
          <FormControl fullWidth>
            <img src="https://i.postimg.cc/PfLM3mwd/03.png" />
          </FormControl>
        </Box>
        <hr />

        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <p>ชื่อคนไข้ที่ต้องการเตียง</p>
            <TableContainer component={Paper} className="">
              <Table className="" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width="20%">
                      ลำดับการคัดแยก
                    </TableCell>
                    <TableCell align="center" width="80%">
                      ชื่อผู้ป่วย
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {triages.map(triage => (
                    <TableRow key={triage.ID}>
                      <TableCell align="center">{triage.ID}</TableCell>
                      <TableCell align="center">{triage.Patient.Patient_Name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={10}>
            <p>ชื่อผู้ป่วย</p>
            <FormControl fullWidth >
              <Select
                id="Patient_Name"
                value={triageID}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={onChangeTriage}
              >
                <MenuItem value="">
                  กรุณาเลือกผู้ป่วย
                </MenuItem>
                {triages.map(triage => (
                  <MenuItem value={triage.ID} key={triage.ID}>
                    {triage.Patient.Patient_Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} >

            <Button
              onClick={search}
              variant="contained"
              color="primary"
              sx={{ marginTop: 8 }}
            >
              ค้นหา
            </Button>

          </Grid>
          <Grid item xs={4}>
            <p>เพศ</p>
            <TextField
              fullWidth
              id="GenderType"
              value={GenderType}
              InputProps={{
                readOnly: true,
              }}
            />

          </Grid>
          <Grid item xs={4}>
            <p>ประเภทโรค</p>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              value={DiseaseType}
              InputProps={{
                readOnly: true,

              }}
            />

          </Grid>
          <Grid item xs={4}>
            <p>โรค</p>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              value={Disease_Name}
              InputProps={{
                readOnly: true,

              }}
            />

          </Grid>
          <Grid item xs={12}>
            <p>แผนก</p>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              value={IPD_Name}
              InputProps={{
                readOnly: true,

              }}
            />
          </Grid>
          <Grid item xs={4}>
            <p>โซน</p>
            <FormControl fullWidth>
              <Select
                id="demo-select-small"
                value={zoneID}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={onChangeZone}
              >
                <MenuItem value="">
                  กรุณาเลือกโซน
                </MenuItem>
                {Zones.map(zone => (
                  <MenuItem value={zone.ID} key={zone.ID}>{zone.Zone_Name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <p>เตียง</p>
            <FormControl fullWidth>
              <Select
                id="beds"
                value={bedID}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={onChangeBed}
              >
                <MenuItem value="">
                  กรุณาเลือกเตียง
                </MenuItem>
                {Beds.map(bed => (
                  <MenuItem value={bed.ID} key={bed.ID}>
                    {bed.Bed_Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={4}>
            <p>วันที่เข้ารับการรักษา</p>
            <FormControl fullWidth variant="outlined">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={date}
                  onChange={(newValue) => { setDate(newValue); }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <p>หมายเหตุ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="MapBed_Comment"
                variant="outlined"
                type="string"
                size="medium"
                value={comments}
                defaultValue=""
                onChange={handleInputChange}
              />
            </FormControl>

          </Grid>
          <Grid item xs={12}>
            <p>ผู้บันทึก</p>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              value={userName}
              InputProps={{
                readOnly: true,

              }}
            />

          </Grid>
          <Grid item xs={12}>
            <Button sx={{ backgroundColor: "#C70039" }}
              component={RouterLink}
              to="/HomePage1"
              variant="contained">
              ย้อนกลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="success"
            >
              <b>บันทึก</b>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}
export default MappingBedCreate;