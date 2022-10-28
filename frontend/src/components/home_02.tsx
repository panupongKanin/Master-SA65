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
                                                            image="https://i.postimg.cc/7ZMz7SVq/01-Patient-Create.png"


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
                                                            image="https://i.postimg.cc/CKr429Qv/02-Triage-Create.png"
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
                                                            image="https://i.postimg.cc/0N4pnDzF/03-Mapping-Bed-Create.png"
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
                                                            image="https://i.postimg.cc/L5QRg9Ct/04-Visit-Record-Create.png"
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
                                                            image="https://i.postimg.cc/xdjXmCg7/05-Symptom-Create.png"
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
                                                            image="https://i.postimg.cc/CxS5y5y1/06Manage.png"
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
                                                            image="https://i.postimg.cc/ncYV1xst/07-Medicine-Create.png"
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
                  <Box
                        sx={{
                              height: 300,
                              backgroundColor: '#007B7D',
                              '&:hover': {
                                    backgroundColor: '#007B7D',
                                    opacity: [0.9, 0.8, 0.7],
                              },
                        }}
                  />
            </Paper>
      );
}
export default HomePage_02;
