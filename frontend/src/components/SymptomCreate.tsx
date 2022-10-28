import React, { useEffect } from "react";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from '@mui/material/FormControl';
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import { Link as RouterLink } from "react-router-dom";
import ResponsiveAppBar from './Bar_02';

import { MappingBedInterface } from "../interfaces/MapBedUI";
import { LevelInterface, SymptomInterface } from "../interfaces/SymptomUI";
import { Typography } from "@mui/material";


function SymptomCreate() {

  const [date, setDate] = React.useState<Date | null>(null);
  const [temp, setTemp] = React.useState<String>("");
  const [press, setPress] = React.useState<String>("");
  const [hrate, setHrate] = React.useState<String>("");
  const [med, setMed] = React.useState<String>("");
  const [comm, setComm] = React.useState<String>("");

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [symptom, setSymptom] = React.useState<Partial<SymptomInterface>>({});

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

  const [LevelID, setLevelID] = React.useState('');
  const onChangeLevel = (event: SelectChangeEvent) => {
    setLevelID(event.target.value as string);
  };

  const [MapBedID, setMapbedID] = React.useState('');
  const onChangeMapBed = (event: SelectChangeEvent) => {
    setMapbedID(event.target.value as string);
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const submit = () => {
    let data = {
      Check_date: date,
      Temperature: typeof temp == "string" ? parseInt(temp) : 0,
      Pressure: typeof press == "string" ? parseInt(press) : 0,
      Heart_rate: typeof hrate == "string" ? parseInt(hrate) : 0,
      Comment: comm,
      Medicine: med,
      CheckID: userID,
      LevelID: convertType(LevelID),
      MapbID: convertType(MapBedID),
    }
    console.log(data);

    fetch("http://localhost:8080/CreateSymptom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          console.log(data)
          setError(true);
        }
      });
    // reset All after Submit
    setDate(null);
    setTemp("");
    setPress("");
    setHrate("");
    setMed("");
    setComm("");
    setMapbedID("");
    setLevelID("");
    setSymptom({});
  }

  const [mapbeds, setMapbed] = React.useState<any[]>([]);
  const getMapbeds = async () => {
    const apiUrl = "http://localhost:8080/GetListMapBeds";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMapbed(res.data);
        }
      });
  };

  const userID = parseInt(localStorage.getItem("uid") + "");
  const [userName, setUserName] = React.useState('');
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

  const [levels, setLevel] = React.useState<LevelInterface[]>([]);
  const getLevels = async () => {
    const apiUrl = "http://localhost:8080/GetListLevels";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setLevel(res.data);
        }
      });
  };

  useEffect(() => {
    getMapbeds();
    getUser();
    getLevels();
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth="md">
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

        <Snackbar open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >

          <Alert onClose={handleClose} severity="error">
            บันทึกข้อมูลไม่สำเร็จ
          </Alert>
        </Snackbar>
        <Paper>
          <Box display={"flex"}
            sx={{
              marginTop: 2,
              marginX: 2,
            }}>
            <Box sx={{ paddingX: 26, paddingY: 1 }}>
              <Typography
                component="h2"
                variant="h4"
                color="#558b2f"
                gutterBottom
                //align="center"
                fontFamily="Arial"
              >
                <hr color="Green" />
                <b>ระบบติดตามอาการคนไข้</b>
                <hr color="Green" />
              </Typography>
            </Box>
          </Box>
          <hr />
          <Box>
            <FormControl fullWidth>
              <img src="https://i.postimg.cc/C5mwV2vd/05.jpg" />
            </FormControl>
          </Box>
          <hr />
          <Box>
            <Grid container spacing={0} sx={{ marginX: 17 }}>
              <Grid item xs={2.4} >
                <p>เตียงคนไข้</p>
              </Grid>
              <Grid item xs={9.6} >
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={MapBedID}
                    onChange={onChangeMapBed}
                    sx={{ width: 300 }}
                    inputProps={{
                      name: "MapBedID",
                    }}
                  >
                    <option aria-label="None" value="">
                      เตียงคนไข้
                    </option>
                    {mapbeds.map((item: MappingBedInterface) => (
                      <option value={item.ID} key={item.ID}>
                        {item.Bed_ID}
                      </option>
                    ))}
                  </Select>
                </FormControl><p />
              </Grid>
              <Grid item xs={2.4}>
                <p>ผู้ทำการประเมิน </p>
              </Grid>
              <Grid item xs={9.6}>
                <TextField
                  sx={{ width: 300 }}
                  id="outlined-read-only-input"
                  value={userName}
                  InputProps={{
                    readOnly: true,
                  }}
                /><p />
              </Grid>
              <Grid item xs={2.4}>
                <p>อุณหภูมิ</p>
              </Grid>
              <Grid item xs={9.6}>
                <TextField
                  id="temp"
                  label="กรอกอุณหภูมิ"
                  InputProps={{ inputProps: { min: 0 } }}
                  type="number"
                  value={temp}
                  sx={{ width: 300 }}
                  variant="outlined"
                  onChange={(event) => setTemp(event.target.value)}
                /><p />

              </Grid>
              <Grid item xs={2.4}>
                <p>ความดัน</p>
              </Grid>
              <Grid item xs={9.6}>
                <TextField
                  id="pressure"
                  label="กรอกความดัน"
                  sx={{ width: 300 }}
                  InputProps={{ inputProps: { min: 0 } }}
                  type="number"
                  variant="outlined"
                  value={press}
                  onChange={(event) => setPress(event.target.value)}
                /><p />
              </Grid>
              <Grid item xs={2.4}>
                <p>อัตราการเต้นของหัวใจ</p>
              </Grid>
              <Grid item xs={9.6}>
                <TextField
                  id="hrate"
                  label="กรอกอัตราการเต้นของหัวใจ"
                  InputProps={{ inputProps: { min: 0 } }}
                  type="number"
                  value={hrate}
                  variant="outlined"
                  sx={{ width: 300 }}
                  onChange={(event) => setHrate(event.target.value)}
                /><p />
              </Grid>
              <Grid item xs={2.4}>
                <p>ระดับความรุนแรง</p>
              </Grid>
              <Grid item xs={9.6}>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={LevelID}
                    onChange={onChangeLevel}
                    sx={{ width: 300 }}
                    inputProps={{
                      name: "LevelID",
                    }}
                  >
                    <option aria-label="None" value="">
                      ระดับความรุนแรง
                    </option>
                    {levels.map((item: LevelInterface) => (
                      <option value={item.ID} key={item.ID}>
                        {item.Level_name}
                      </option>
                    ))}
                  </Select>
                </FormControl><p />
              </Grid>
              <Grid item xs={2.4}>
                <p>วันที่ทำการประเมิน</p>
              </Grid>
              <Grid item xs={9.6}>
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <DatePicker
                    label={"เดือน/วัน/ปี"}
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider><p />
              </Grid>
              <Grid item xs={2.4}>
                <p>ยาที่จ่าย</p>
              </Grid>
              <Grid item xs={9.6}>
                <TextField
                  id="medicine"
                  type="string"
                  sx={{ width: 300 }}
                  label="กรอกชื่อยา"
                  value={med}
                  variant="outlined"
                  onChange={(event) => setMed(event.target.value)}
                /><p />
              </Grid>
              <Grid item xs={2.4}>
                <p>หมายเหตุ</p>
              </Grid>
              <Grid item xs={9.6}>
                <TextField
                  id="comment"
                  sx={{ width: 300 }}
                  multiline
                  rows={4}
                  value={comm}
                  label="หมายเหตุ"
                  onChange={(event) => setComm(event.target.value)}
                /><p />
              </Grid>
              <Grid item xs={2.4}>
                <Button sx={{ backgroundColor: "#C70039" }} component={RouterLink} to="/HomePage2" variant="contained">
                  ย้อนกลับ
                </Button>
              </Grid>
              <Grid item xs={9.6}>
                <Button
                  sx={{ marginX: 45.5 }}
                  variant="contained"
                  color="success"
                  onClick={submit}>
                  บันทึก
                </Button><p />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default SymptomCreate;