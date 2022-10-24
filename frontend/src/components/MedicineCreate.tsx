//ดึงส่วนต่าง ๆ ที่จะต้องใช้งาน
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { AppBar, Button, FormControl, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { MEDICINEInterface, WHEREInterface, DOCTORInterface, BASKETInterface } from "../interfaces/MedicineInterface";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


//ฟังค์ชันสำหรับ alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//ฟังค์ชัน สำหรับสร้างตารางหลัก
function BASKETCreate() {

  //ประกาศเพื่อ รับค่าที่ได้จากการเลือก combobox ทั้งหมดเป็นตารางที่ ดึงไปใส่ตารางหลัก 
  const [MEDICINE_ID, setMEDICINE_ID] = useState('');
  const [DOCTOR_ID, setDOCTOR_ID] = useState('');
  const [WHERE_ID, setWHERE_ID] = useState('');
  const [Symptom_ID, setSymptom_ID] = useState('');

  const [Add_time, setDate] = React.useState<Dayjs | null>(null);
  const [BASKET, setBasket] = React.useState<Partial<BASKETInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [press, setPress] = useState('0');
  const [temp, setTemp] = useState('0');
  const [hrate, setHrate] = useState('0');
  const [comm, setComm] = useState("");
  const [med, setMed] = useState("");
  const [userName, setUserName] = useState('');

  const userID = parseInt(localStorage.getItem("uid")+"");

  console.log(userName);




  ///////////////////////////////////////////////////////////////////////////////////////////////////////
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
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof BASKET;        //สงสัยว่าส่วนนี้ต้องเปลี่ยน name หรือเปล่า
    setBasket({
      ...BASKET,
      [name]: event.target.value,
    });
  };
  //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof BASKETCreate;
    const { value } = event.target;
    setBasket({ ...BASKET, [id]: value });
  };

  //สร้างฟังก์ชัน เมื่อเลือก เพศ แล้วให้ setGender(สร้างไว้แล้วข้างบน) 
  const onChangeSymptom = (event: SelectChangeEvent) => {
    setSymptom_ID(event.target.value as string);
    GetSymptomID();

  };
  const onChangeWHERE = (event: SelectChangeEvent) => {
    setWHERE_ID(event.target.value as string);
  };
  const onChangeMEDICINE = (event: SelectChangeEvent) => {
    setMEDICINE_ID(event.target.value as string);
  };
  const onChangeDOCTOR = (event: SelectChangeEvent) => {
    setDOCTOR_ID(event.target.value as string);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  //ฟังก์ชันนี้ สำหรับการกดปุ่ม submit จะทำการสร้างข้อมูลต่าง ๆ เพื่อส่งไปทำการบันทึกที่ backend
  function submit() {
    let data = {
      //Name: user.Name ?? "",                  //ยังไม่ได้ทำ ดึงมาจากระบบlogin
      AMOUNT: typeof BASKET.ID == "string" ? parseInt(BASKET.ID) : 0,           //patient.name คือการดึงค่าจากค่า Name ที่เก็บไว้ข้างใน Patient อีกทีมาใช้
      Add_time: Add_time,
      WHERE_ID: convertType(WHERE_ID),          //GenderID != patient.GenderID บรรทัดนี้ น้ำค่า GenderID ที่ประกาศไว้ด้านบนมาใช้เลย 
      MEDICINE_ID: convertType(MEDICINE_ID),
      User_ID: convertType(userID),
      Symptom_ID:convertType(Symptom_ID),

    };

    console.log(data);
    

    //check data


    const apiUrl = "http://localhost:8080/CreateBasket";
    const requestOptions = {
      method: "POST",
      headers: {
        //Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
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
    setBasket({});
    setDate(null);
    setWHERE_ID("");
    setMEDICINE_ID("");
    setDOCTOR_ID("");
    setSymptom_ID("");


  }
  /////////////////////////////////////////////-_ ส่วนของการโหลดและดึงค่ามาใช้(ใช้กับ Combobox) _-//////////////////////////////////////////////////////////


  const [Symtomp, setSymtomp] = React.useState<any[]>([]); //useStateเรียกทุกตัวมาใช้
  const [triages, setTriages] = useState<any[]>([]);
  console.log(triages);


  const getSymptom = async () => {
    GetSymptomID();
    const apiUrl = "http://localhost:8080/GetListSymptoms";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {

          setSymtomp(res.data);
          // console.log(res.data);
          GetSymptomID();


        } else {
          console.log("else");
        }
      });
  };
  const [WHERE, setWhere] = React.useState<WHEREInterface[]>([]);
  const getWhere = async () => {
    const apiUrl = `http://localhost:8080/ListWhere`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setWhere(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const [MEDICINE, setMedicine] = React.useState<MEDICINEInterface[]>([]);
  const getMedicine = async () => {
    const apiUrl = `http://localhost:8080/ListMedicine`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMedicine(res.data);


        } else {
          console.log("else");
        }
      });
  };

  const GetSymptomID = async () => {
    const apiUrl1 = `http://localhost:8080/GetSymptom/${Symptom_ID}`;
    const requestOptions1 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl1, requestOptions1)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setTemp(res.data.Temperature)
          setPress(res.data.Pressure)
          setHrate(res.data.Heart_rate)
          setComm(res.data.Comment)
          setMed(res.data.Medicine)
          // setPatient_Name(res.data.Patient.Patient_NAME);

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

  //useEffect เป็นการเรียกใช้งานฟังก์ชัน useEffect เมื่อ component นั้นเกิดการเปลี่ยนแปลงค่าของ state ที่เราเล็งเอาไว้ หรือหากไม่กำหนดค่า state ที่เล็งเอาไว้ การทำงานของ useEffect จะทำงานเพียงครั้งเดียวคือก่อน component นั้นจะถูกแสดงขึ้นมา

  useEffect(() => {
    getWhere();
    getMedicine();
    getSymptom();
    GetSymptomID();
    getUser();

  }, [Symptom_ID]);


  //////////////////////////////////////////////////////////////////////////////-_ ส่วนนี้คือส่วนที่กำหนด UI _-////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
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


      <Paper >

        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 1, paddingY: 1 }}>
            <Typography
              color="#558b2f"
              gutterBottom
              //align="center"
              fontFamily="Arial"
            >
              <hr color="Green" />
              <b>ระบบจ่ายยาผู้ป่วยใน</b>
              <hr color="Green" />
            </Typography>
          </Box>
        </Box>
        <Divider />

        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={1}>
            {/* <FormControl fullWidth variant="outlined"> */}
            <p>ผู้ป่วย</p>
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={Symptom_ID}
                onChange={onChangeSymptom}
                inputProps={{
                  name: "Symtomp_ID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกผู้ป่วย
                </option>
                {Symtomp.map((item) => (
                  <option value={item.ID} key={item.ID}>
                    เตียง : {item.Mapb.Bed.Bed_Name} - ชื่อ {item.Mapb.Triage.Patient.Patient_Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <p>อุณหภูมิ</p>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              value={temp}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <p>ความดัน</p>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              value={press}
              InputProps={{
                readOnly: true,

              }}

            />
          </Grid>
          <Grid item xs={4}>
            <p>อัตราการเต้นของหัวใจ</p>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              value={hrate}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <p>อาการ</p>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              value={comm}
              multiline
              rows={4}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <p>ยาที่คนไข้ต้องการใช้</p>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              value={med}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>


        </Grid>


        <Grid container spacing={4} sx={{ padding: 2 }}>

          {/* <Grid  container spacing={2} sx={{padding:2}}> */}

          <Grid item xs={0}>
            {/* <FormControl fullWidth variant="outlined"> */}
            <p>ชื่อยา</p>
          </Grid>
          <Grid item xs={7}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={MEDICINE_ID}
                onChange={onChangeMEDICINE}
                inputProps={{
                  name: "MEDICINE_ID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกยา
                </option>
                {MEDICINE.map((item: MEDICINEInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name} - {item.So} - {item.Unit}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={0}>
            <p>จำนวน</p>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="ID"
                variant="outlined"
                type="string"
                size="medium"
                value={BASKET.ID || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>


        </Grid>

        <Grid container spacing={4} sx={{ padding: 2 }}>

          <Grid item xs={1}>
            {/* <FormControl fullWidth variant="outlined"> */}
            <p>รับยา</p>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={WHERE_ID}
                onChange={onChangeWHERE}
                inputProps={{
                  name: "WHERE_ID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสถานที่
                </option>
                {WHERE.map((item: WHEREInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            {/* <FormControl fullWidth variant="outlined"> */}
            <p>เวลาจ่ายยา</p>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth variant="outlined">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="เลือกเวลาจ่ายยาผู้ป่วยใน"
                  value={Add_time}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>



        </Grid>

        <Grid container spacing={2} sx={{ padding: 2 }}>

          <Grid item xs={1}>
            {/* <FormControl fullWidth variant="outlined"> */}
            <p>ผู้จ่าย</p>
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={userName}
                onChange={onChangeDOCTOR}
                inputProps={{
                  name: "DOCTOR_ID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกผู้จ่ายยา
                </option>
                <option aria-label="None" value={userName}>
                  {userName}
                </option>
                
              </Select>
            </FormControl>
          </Grid>



        </Grid>
        <Grid item xs={12}>
          <Button sx={{ backgroundColor: "#C70039" }} component={RouterLink} to="/HomePage2" variant="contained">
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
        <br />
      </Paper>
    </Container>
  );
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
export default BASKETCreate;