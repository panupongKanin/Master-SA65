import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ResponsiveAppBar from './Bar_02';
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

function HomePage_02() {
      const lock = async () => {
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = function () {
                  window.history.pushState(null, "", window.location.href);
            };
      };

      const id = localStorage.getItem("uid")

      const [User, setUser] = useState<any[]>([]);

      console.log(id);


      const getUser = async () => {


            const apiUrl = `http://localhost:8080/user/${id}`;
            const requestOptions = {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
                  .then((response) => response.json())
                  .then((res) => {
                        if (res.data) {
                              setUser(res.data);
                        }
                  });
      };
      React.useEffect(() => {
            getUser();
            lock();
      }, []);
      return (

            <Paper elevation={0} sx={{ backgroundColor: "#007B7D" }}>
                  <ResponsiveAppBar />
                  <br />
                  <br />
                  <Container maxWidth="lg">
                        <Box sx={{ flexGrow: 1 }}>
                              <Grid container spacing={2}>
                                    <Grid item xs={6} md={3}>
                                          <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea
                                                      // component={RouterLink} 
                                                      // to="/PatientCreate"
                                                      sx={{ backgroundColor: "#7B7B7B" }}
                                                >
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/kMtsgFxt/Charactor-11.jpg"


                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div" align='center' >
                                                                  บันทึกผู้ป่วย
                                                            </Typography>

                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                          <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea
                                                      // component={RouterLink} 
                                                      // to="/mappingbedcreate"
                                                      sx={{ backgroundColor: "#7B7B7B" }}
                                                >
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/wTpXTKqS/doctor-examining-patient-clinic-illustrated-23-2148856559-jpg.jpg"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div" align='center'>
                                                                  คัดแยกผู้ป่วย
                                                            </Typography>

                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                          <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea
                                                      // component={RouterLink} 
                                                      // to="/mappingbedcreate"
                                                      sx={{ backgroundColor: "#7B7B7B" }}
                                                >
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/Twbbf0Zd/22569.jpg"
                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div" align='center'>
                                                                  บันทึกการใช้งานเตียง
                                                            </Typography>

                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                          <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea
                                                      sx={{ backgroundColor: "#7B7B7B" }}>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/HkKjn50V/8507.jpg"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent >
                                                            <Typography gutterBottom variant="h5" component="div" align='center'>
                                                                  เพิ่มข้อมูลการเข้าเยี่ยม
                                                            </Typography>

                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={12}>
                                          <br />
                                          <br />
                                          <br />
                                    </Grid>

                                    <Grid item xs={6} md={4} container justifyContent="center">
                                          <Card sx={{ maxWidth: 275.5 }}>
                                                <CardActionArea
                                                      component={RouterLink}
                                                      to="/SymptomCreate"
                                                      sx={{ backgroundColor: "#FDDD8E" }}>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/rsc4XCmR/doctor-patient-medical-concept-hospital-patient-lying-hospital-bed-1150-50285-1.webp"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent >
                                                            <Typography gutterBottom variant="h5" component="div" align='center'>
                                                                  ติดตามอาการผู้ป่วย
                                                            </Typography>
                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={4} container justifyContent="center">
                                          <Card sx={{ maxWidth: 275.5 }}>
                                                <CardActionArea
                                                      component={RouterLink}
                                                      to="/Manage"
                                                      sx={{ backgroundColor: "#FDDD8E" }}>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/QM1V89vQ/food-pyramid-concept-23-2148485653-1.webp"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent >
                                                            <Typography gutterBottom variant="h5" component="div" align='center'>
                                                                  โภชนาการ
                                                            </Typography>

                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={4} container justifyContent="center">
                                          <Card sx={{ maxWidth: 275.5 }}>
                                                <CardActionArea
                                                      component={RouterLink}
                                                      to="/BASKETCreate"
                                                      sx={{ backgroundColor: "#FDDD8E" }}>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/HxSmdTW0/medicine-pharmacy-131590-145-1.webp"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent >
                                                            <Typography gutterBottom variant="h5" component="div" align='center'>
                                                                  การจ่ายยา
                                                            </Typography>

                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>

                              </Grid>
                        </Box>
                  </Container>
                  <br />
                  <br />
            </Paper>
      );
}
export default HomePage_02;
