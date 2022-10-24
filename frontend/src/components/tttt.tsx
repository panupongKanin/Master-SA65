import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ResponsiveAppBar from './Bar_02';
import { FormControl, TextField } from '@mui/material';


function BasicGrid() {
      const [patients, setPatient] = React.useState<any[]>([]);
      console.log(patients);
      
      const getPatients = async () => {
            const apiUrl = "http://localhost:8080/ListPatient";
            const requestOptions = {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
                  .then((response) => response.json())
                  .then((res) => {
                        if (res.data) {
                              setPatient(res.data)
                        }
                  });
      };
      React.useEffect(() => {
            getPatients();
           
      }, []);
      return (
            <Paper>
                  <ResponsiveAppBar />
                  <Box sx={{ flexGrow: 1 }}>
                        <br />
                        <br />
                        <br />
                        <Grid container spacing={2}>
                              <Grid item xs={4}>

                              </Grid>
                              <Grid item xs={4}>
                                    <FormControl fullWidth>
                                          <TextField
                                                id="outlined-read-only-input"
                                                label="Read Only"
                                                defaultValue="Hello World"
                                                InputProps={{
                                                      readOnly: true,
                                                }}
                                          />
                                    </FormControl>
                              </Grid>
                              <Grid item xs={4}>

                              </Grid>

                        </Grid>
                  </Box>

            </Paper>

      );
}
export default BasicGrid;