import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar
} from '@mui/material';
import { API_ADDRESS } from './constants';

interface IListWrapper {
  children?: JSX.Element | JSX.Element[];
}
const ListWrapper: React.FC<IListWrapper> = ({children} : IListWrapper) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {children}
    </Box>
  )
}

function App() {
  interface IData {
    address: string;
    balanceInEther: string;
    balanceInUSD: number;
    balanceInEuro: number;
  }
  const [data, setData] = React.useState<IData | null>(null);
  const [address, setAddress] = React.useState<string | undefined>('');

  const getData = () => {
    (async () => {
      const res = await fetch(`${API_ADDRESS}/?address=${address}`);
      const json = await res.json();
      const data: IData = {
        address: json.data.address,
        balanceInEther: json.data.balanceInEther,
        balanceInUSD: json.data.balanceInUSD,
        balanceInEuro: json.data.balanceInEuro
      }
      setData(data);
    })();
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#efefef',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography
          variant='h2'
          sx={{
            display: {
              xs: 'none',
              md: 'block'
            }
          }}
        >Check Etherium Balance</Typography>
        <Paper
          elevation={2}
          sx={{
            width: 600,
            p: 2,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <TextField value={address} onChange={(e) => setAddress(e.currentTarget.value)} fullWidth id="outlined-basic" label="Address" placeholder='Address' variant="outlined" />
          <Button onClick={() => {
            getData();
          }} fullWidth size='large' variant="contained">Get Data</Button>
        </Paper>
        {data && (
          <Paper
            elevation={2}
            sx={{
              width: 600,
              p: 2,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <ListWrapper>
              <Avatar alt="E" sx={{width: '40px', height: '40px' }} src="https://avatars.dicebear.com/api/micah/s.svg?background=%23000000" />
              <Typography variant='subtitle1'>{data.address}</Typography>
            </ListWrapper>
            <ListWrapper>
              <Typography variant='subtitle1'><b>Value in ether :</b></Typography>
              <Typography variant='subtitle1'>{data.balanceInEther}</Typography>
            </ListWrapper>
            <ListWrapper>
              <Typography variant='subtitle1'><b>Value in USD :</b></Typography>
              <Typography variant='subtitle1'>{data.balanceInUSD}</Typography>
            </ListWrapper>
            <ListWrapper>
              <Typography variant='subtitle1'><b>Value in Euro :</b></Typography>
              <Typography variant='subtitle1'>{data.balanceInEuro}</Typography>
            </ListWrapper>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default App;
