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
import { PatientInterface,GenderInterface,RIGHTSInterface,Blood_typeInterface,Drug_AllergyInterface} from "../models/UI";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ResponsiveAppBar from './Bar_01';


//ฟังค์ชันสำหรับ alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
 props,
 ref
) {
 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//ฟังค์ชัน สำหรับสร้างตารางหลัก
function PatientCreate() {
   //ประกาศเพื่อ รับค่าที่ได้จากการเลือก combobox ทั้งหมดเป็นตารางที่ ดึงไปใส่ตารางหลัก 
   const [Drug_AllergyID, setDrug_AllergyID] = useState('');
   const [Blood_typeID, setblood_typeID] = useState('');
   const [GenderID, setGenderID] = useState('');
   const [RIGHTSID, setRIGHTSID] = useState('');
  
  const [Date_of_Birth, setDate] = React.useState<Date | null>(null);
  const [patient, setPatient] = React.useState<Partial<PatientInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  //const userID = localStorage.getItem("uid")

  const userID = parseInt(localStorage.getItem("uid")+"");

 
 
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
    const name = event.target.name as keyof typeof patient;        //สงสัยว่าส่วนนี้ต้องเปลี่ยน name หรือเปล่า
    setPatient({
      ...patient,
      [name]: event.target.value,
    });
  };


  //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof PatientCreate;
    const { value } = event.target;
    setPatient({ ...patient, [id]: value });
  };

//สร้างฟังก์ชัน เมื่อเลือก เพศ แล้วให้ setGender(สร้างไว้แล้วข้างบน) 
  const onChangeGender = (event: SelectChangeEvent) => {
    setGenderID(event.target.value as string);
  };
  const onChangeBlood_type = (event: SelectChangeEvent) => {
    setblood_typeID(event.target.value as string);
  };
  const onChangeDrug_Allergy = (event: SelectChangeEvent) => {
    setDrug_AllergyID(event.target.value as string);
  };
  const onChangeRIGHTS = (event: SelectChangeEvent) => {
    setRIGHTSID(event.target.value as string);
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  //ฟังก์ชันนี้ สำหรับการกดปุ่ม submit จะทำการสร้างข้อมูลต่าง ๆ เพื่อส่งไปทำการบันทึกที่ backend
  function submit() {
   let data = {
    
     ID_Card: patient.ID_Card ?? "",           //patient.name คือการดึงค่าจากค่า Name ที่เก็บไว้ข้างใน Patient อีกทีมาใช้
     Patient_Name: patient.Name ?? "",
     Date_of_Birth: Date_of_Birth,
     User_ID: userID,               //ยังไม่ได้ทำ ดึงมาจากระบบlogin
     GenderID: convertType(GenderID),          //GenderID != patient.GenderID บรรทัดนี้ น้ำค่า GenderID ที่ประกาศไว้ด้านบนมาใช้เลย 
     Blood_typeID: convertType(Blood_typeID),
     Drug_AllergyID: convertType(Drug_AllergyID),
     RightsID: convertType(RIGHTSID),
     Addess:patient.Addess ?? "",
     Other: patient.Other ?? "",    
  };

    //check data
    console.log(userID)

   const apiUrl = "http://localhost:8080/CreatePatient";
   const requestOptions = {
     method: "POST",
     headers: { 
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" },
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
     setGenderID("");
     setDate(null);
     setblood_typeID("");
     setDrug_AllergyID("");
     setRIGHTSID("");
     setPatient({});


 }
/////////////////////////////////////////////-_ ส่วนของการโหลดและดึงค่ามาใช้(ใช้กับ Combobox) _-//////////////////////////////////////////////////////////


  const [Blood_type, setblood_type] = React.useState<Blood_typeInterface[]>([]); 
  const getBlood_type = async () => {
    const apiUrl = `http://localhost:8080/ListBlood_type`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setblood_type(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const [Drug_Allergy, setDrug_Allergy] = React.useState<Drug_AllergyInterface[]>([]);
  const getDrug_Allergy= async () => {
    const apiUrl = `http://localhost:8080/ListDrug_Allergy`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setDrug_Allergy(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const [Gender, setGender] = React.useState<GenderInterface[]>([]);
  const getGender= async () => {
    const apiUrl = `http://localhost:8080/ListGender`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGender(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const [RIGHTS, setRIGHTS] = React.useState<RIGHTSInterface[]>([]);
  const getRIGHTS= async () => {
    const apiUrl = `http://localhost:8080/ListRIGHTS`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRIGHTS(res.data);
        } else {
          console.log("else");
        }
      });
  };

    //useEffect เป็นการเรียกใช้งานฟังก์ชัน useEffect เมื่อ component นั้นเกิดการเปลี่ยนแปลงค่าของ state ที่เราเล็งเอาไว้ หรือหากไม่กำหนดค่า state ที่เล็งเอาไว้ การทำงานของ useEffect จะทำงานเพียงครั้งเดียวคือก่อน component นั้นจะถูกแสดงขึ้นมา
      
      useEffect(() => {       
      getBlood_type();
      getGender();
      getDrug_Allergy();
      getRIGHTS();
    }, []);


//////////////////////////////////////////////////////////////////////////////-_ ส่วนนี้คือส่วนที่กำหนด UI _-////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
return (
  <Paper>
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
     
     
     
     <Paper >

       <Box
         display="flex"
         sx={{
           marginTop: 2,
         }}
       >
         <Box sx={{ paddingX: 28, paddingY: 1 }}>
           <Typography
             component="h2"
             variant="h4"
             color= "#558b2f"
             gutterBottom
             //align="center"
             fontFamily="Arial"
           >
             <hr color="Green"/>
             <b>ระบบบันทึกข้อมูลผู้ป่วยใน</b>
             <hr color="Green"/>
           </Typography>
         </Box>
       </Box>
       <Divider />


       <Grid container spacing={3} sx={{ padding: 2 }}>


         <Grid item xs={3}>
           <p>รหัสประจำตัวประชาชน</p>
        </Grid>
        <Grid item xs={9}>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="ID_Card"
               variant="outlined"
               type="string"
               size="medium"
               value={patient.ID_Card || ""}
               onChange={handleInputChange}     
             />
           </FormControl>
         </Grid>




         <Grid item xs={3}>
            <p>ชื่อ-สกุล</p>
         </Grid>
         <Grid item xs={9}>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="Name"
               variant="outlined"
               type="string"
               size="medium"
               value={patient.Name || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>



         {/* <Grid  container spacing={2} sx={{padding:2}}> */}
         <Grid item xs={3} >
            <p>วันเกิด</p>
         </Grid>
         <Grid item xs={9}>
           <FormControl fullWidth variant="outlined">
             <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DatePicker
                 value={Date_of_Birth}
                 onChange={(newValue) => {
                   setDate(newValue);
                 }}
                 renderInput={(params) => <TextField {...params} />}
               />
             </LocalizationProvider>
           </FormControl>
         </Grid>



          <Grid item xs={3}>
          {/* <FormControl fullWidth variant="outlined"> */}
            <p>เพศ</p>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={GenderID}
                  onChange={onChangeGender}
                  inputProps={{
                    name: "GenderID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกเพศ
                  </option>
                      {Gender.map((item: GenderInterface) => (
                        <option value={item.ID} key={item.ID}>
                        {item.Gender_Name}
                         </option>
                      ))}    
                </Select>
              </FormControl>
            </Grid>




          <Grid item xs={3}>
          <p>หมู่เลือด</p>
          </Grid>
          <Grid item xs={9}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={Blood_typeID}
                onChange={onChangeBlood_type}
              >
                  <option aria-label="None" value="">
                    กรุณาเลือกหมู่เลือด
                  </option>
                      {Blood_type.map((item: Blood_typeInterface) => (
                        <option value={item.ID} key={item.ID}>
                        {item.Blood_Name}
                         </option>
                      ))}    
              </Select>
            </FormControl>
          </Grid>




          <Grid item xs={3}>
            <p>แพ้ยา</p>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={Drug_AllergyID}
                  onChange={onChangeDrug_Allergy}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกประเภทยาที่แพ้
                  </option>
                      {Drug_Allergy.map((item: Drug_AllergyInterface) => (
                        <option value={item.ID} key={item.ID}>
                        {item.Drug_Name}
                         </option>
                      ))}    
                </Select>
              </FormControl>
            </Grid>




            <Grid item xs={3}>
            {/* <FormControl fullWidth variant="outlined"> */}
              <p>สิทธิ์การรักษาพยาบาล</p>
              </Grid>
              <Grid item xs={9}>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={RIGHTSID}
                    onChange={onChangeRIGHTS}
                  >
                    <option aria-label="None" value="">
                      กรุณาเลือกสิทธิ์การรักษาพยาบาล
                    </option>
                      {RIGHTS.map((item: RIGHTSInterface) => (
                        <option value={item.ID} key={item.ID}>
                        {item.RIGHTS_Name}
                         </option>
                      ))}   
                  </Select>
                </FormControl>
              </Grid>



              
              <Grid item xs={3}>
                <p>ที่อยู่</p>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="Addess"
                  fullWidth
                  multiline
                  rows={4}
                  value={patient.Addess}
                  onChange={handleInputChange} 
                />
              </Grid>




              <Grid item xs={3}>
                <p>ข้อมูลเพิ่มเติม</p>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="Other"
                  fullWidth
                  multiline
                  rows={3}
                  value={patient.Other|| ""}
                  onChange={handleInputChange} 
                />
              </Grid>




         <Grid item xs={12}>
           <Button sx = {{backgroundColor: "#C70039"}} component={RouterLink} to="/HomePage1" variant="contained">
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
     </Paper>
   </Container>
   </Paper>
 );
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
export default PatientCreate;
