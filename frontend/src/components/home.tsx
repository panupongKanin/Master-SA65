import * as React from 'react';
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
import ResponsiveAppBar from './Bar_01';




function HomePage() {

      return (
            
            <Paper elevation={0} sx = {{backgroundColor: "#007B7D"}}>
                  <ResponsiveAppBar/>
                  <br />
                  <br />
                  <Container maxWidth="lg">
                        <Box sx={{ flexGrow: 1 }}>
                              <Grid container spacing={2}>
                                    <Grid item xs={6} md={3}>
                                          <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="/static/images/cards/contemplative-reptile.jpg"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                  Lizard
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                  Lizards are a widespread group of squamate reptiles, with over 6,000
                                                                  species, ranging across all continents except Antarctica
                                                            </Typography>
                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                          <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="/static/images/cards/contemplative-reptile.jpg"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                  Lizard
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                  Lizards are a widespread group of squamate reptiles, with over 6,000
                                                                  species, ranging across all continents except Antarctica
                                                            </Typography>
                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                          <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="/static/images/cards/contemplative-reptile.jpg"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                  Lizard
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                  Lizards are a widespread group of squamate reptiles, with over 6,000
                                                                  species, ranging across all continents except Antarctica
                                                            </Typography>
                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                          <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="/static/images/cards/contemplative-reptile.jpg"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                  Lizard
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                  Lizards are a widespread group of squamate reptiles, with over 6,000
                                                                  species, ranging across all continents except Antarctica
                                                            </Typography>
                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={4} container justifyContent="center">
                                          <Card sx={{ maxWidth: 275.5 }}>
                                                <CardActionArea>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="/static/images/cards/contemplative-reptile.jpg"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                  Lizard
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                  Lizards are a widespread group of squamate reptiles, with over 6,000
                                                                  species, ranging across all continents except Antarctica
                                                            </Typography>
                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={4} container justifyContent="center">
                                          <Card sx={{ maxWidth: 275.5 }}>
                                                <CardActionArea>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="/static/images/cards/contemplative-reptile.jpg"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                  Lizard
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                  Lizards are a widespread group of squamate reptiles, with over 6,000
                                                                  species, ranging across all continents except Antarctica
                                                            </Typography>
                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Grid>
                                    <Grid item xs={6} md={4} container justifyContent="center">
                                          <Card sx={{ maxWidth: 275.5 }}>
                                                <CardActionArea>
                                                      <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="/static/images/cards/contemplative-reptile.jpg"
                                                            alt="green iguana"
                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                  Lizard
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                  Lizards are a widespread group of squamate reptiles, with over 6,000
                                                                  species, ranging across all continents except Antarctica
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
export default HomePage;
