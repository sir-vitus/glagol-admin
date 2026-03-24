import { useCallback, useState, useEffect } from 'react';
// assets
import { IconCheck, IconAlertTriangle } from '@tabler/icons-react';
// material-ui
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// constant
const icons = { IconCheck, IconAlertTriangle };

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axiosServices from 'utils/axios';

export default function ShowsAvailabilityTable() {
  const [dates, setDates] = useState([]);
  const getDates = useCallback(async () => {
    try {
      const response = await axiosServices.get('/shows/avail');
      setDates(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getDates();
  }, [getDates]);
  const handleClick = () => {
    //setOpen(true);
  };

  const shows = dates.length ? dates[0].shows : []
  const shortDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString()
    return `${day}.${month}`
  }

  return (
    <MainCard title={"Спектакли (" + shows.length + ")"}>
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ position: 'sticky', left: 0, zIndex: 10, background: '#f2f2f2' }}>Спектакли</TableCell>
            {dates.map((date) => (
              <TableCell sx={{ background: '#f2f2f2' }}>{shortDate(new Date(date.date))}</TableCell>
            ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {shows.map((show, idx) => (
            <TableRow  key={show.id}>
              <TableCell component="th" scope="row" sx={{ position: 'sticky', left: 0, zIndex: 1, background: 'white' }}>{show.name}</TableCell>
            {dates.map((date) => (
              <TableCell>
                {date.shows[idx].color == 'green' ?       
                  <Tooltip title="Да">
                    <IconButton aria-label="yes" onClick={handleClick}>
                      <IconCheck />
                    </IconButton>
                  </Tooltip> :  
                  <Tooltip title={date.shows[idx].characters.filter(c=>c.color==='red').map(c=>c.name).join(', ')}>
                    <IconButton aria-label="no" onClick={handleClick}>
                      <IconAlertTriangle />
                    </IconButton>
                  </Tooltip>
                } 
              </TableCell>
            ))}
            </TableRow >
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
    )
}