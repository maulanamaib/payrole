import logo from './logo.svg';
import './App.css';
import  React,{Component} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ApiFile,{movies} from './exexcel';
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
  Link,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { Button, colors, Grid } from '@mui/material';






const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));




export default function Edit() {
  const them = useTheme();
  const navigate = useNavigate();

  function LoginHandler(event){
    event.preventDefault();

    const checklogin = true;
    if (checklogin) { 
        navigate('');
    }

  }
 
  
 
  return (  
    
      <Grid
  container
  
  
  direction="column"
  alignItems="center" 
  
  position='absolute'
  top= '50px'
  left='10px' 
  
  transform= 'translate(-50%, -50%)'
  justify="center"
  style={{minHeight: '70vh' }}
 >
{/* 
    <div style={{position: 'relativ',}}> */}
        <Card sx={{minWidth: 10 ,display: 'grid',background: 'linear-gradient(45deg, #f0f1f7 30%, #6b81fe 90%)',}}>
            
          <CardContent sx={{'flex': '1 0 auto'}} align='center'>
            <Typography component="div" variant='h5' alignItems='center' >
              Edit Data
            </Typography>
            
          </CardContent>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 4, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
      display='grid'
    >
        
        <TextField id="outlined-basic" type='email' label="Id Item" variant="outlined" />
      
      
          <TextField id="outlined-basic" type='password' label="Nama Item" variant="outlined" />
        <Link to='/homecomponent'>
          <Button component="button" sx={{minWidth:350 }} variant="contained">
        simpan
          </Button>
          </Link>
        </Box>
        
        
       
      </Card>
  
      </Grid>
      
     
  );
}





