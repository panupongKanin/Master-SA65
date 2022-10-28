
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
import ResponsiveAppBar_01 from './Bar_01';
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

function HomePage_01() {
      const lock = async () => {
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = function () {
                  window.history.pushState(null, "", window.location.href);
            };
      };
      const id = localStorage.getItem("uid")
      const [User, setUser] = useState<any[]>([]);

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
                  <ResponsiveAppBar_01 />
                  <br />
                  <br />
                  <Container maxWidth="lg">
                        <Box sx={{ flexGrow: 1 }}>
                              <Grid container spacing={2}>
                                    <Grid item xs={6} md={3}>
                                          <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea
                                                      component={RouterLink}
                                                      to="/PatientCreate"
                                                      sx={{ backgroundColor: "#FDDD8E" }}

                                                >
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/wx0b5swc/01-Patient-Create.png"
                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div" align='center' >
                                                                  บันทึกคนไข้ใน
                                                            </Typography>

                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                          <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea
                                                      component={RouterLink}
                                                      to="/TriagePageCreate"
                                                      sx={{ backgroundColor: "#FDDD8E" }}
                                                >
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/ZKLYxH1s/02-Triage-Create.png"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div" align='center'>
                                                                  คัดแยกคนไข้ใน
                                                            </Typography>

                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                          <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea
                                                      component={RouterLink}
                                                      to="/mappingbedcreate"
                                                      sx={{ backgroundColor: "#FDDD8E" }}
                                                >
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/Ghn9QH9t/03-Mapping-Bed-Create.png"
                                                            alt="green iguana"
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
                                                      component={RouterLink}
                                                      to="/VisitRecordCreate"
                                                      sx={{ backgroundColor: "#FDDD8E" }}>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/bY7SBmVz/04-Visit-Record-Create.png"
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
                                                      sx={{ backgroundColor: "#7B7B7B" }}>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/YC2ZKzjP/05-Symptom-Create.png"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent >
                                                            <Typography gutterBottom variant="h5" component="div" align='center'>
                                                                  ติดตามอาการคนไข้
                                                            </Typography>

                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={4} container justifyContent="center">
                                          <Card sx={{ maxWidth: 275.5 }}>
                                                <CardActionArea
                                                      sx={{ backgroundColor: "#7B7B7B" }}>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/G3JXLs0n/06Manage.png"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent >
                                                            <Typography gutterBottom variant="h5" component="div" align='center'>
                                                                  เพิ่มโภชนาการ
                                                            </Typography>

                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={4} container justifyContent="center">
                                          <Card sx={{ maxWidth: 275.5 }}>
                                                <CardActionArea
                                                      sx={{ backgroundColor: "#7B7B7B" }}>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://i.postimg.cc/N0HxWK8V/07-Medicine-Create.png"
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
export default HomePage_01;
