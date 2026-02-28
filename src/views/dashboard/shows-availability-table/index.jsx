import { useCallback, useState, useEffect } from 'react';
// assets
import { IconCheck, IconAlertTriangle } from '@tabler/icons-react';
// material-ui
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

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

    return (
        <MainCard title={"Спектакли (" + shows.length + ")"}>
    
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Спектакли</th>

          {dates.map((date) => (
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>{(new Date(date.date)).toLocaleDateString()}</th>

          ))}
        </tr>
      </thead>
      <tbody>
        {shows.map((show, idx) => (
          <tr key={show.id}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{show.name}</td>
            {dates.map((date) => (
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{
                date.shows[idx].color == 'green' ?       
                    <Tooltip title="Да">
                        <IconButton aria-label="yes" onClick={handleClick}>
                          <IconCheck />
                        </IconButton>
                      </Tooltip> :  <Tooltip title={date.shows[idx].characters.filter(c=>c.color==='red').map(c=>c.name).join(', ')}>
                        <IconButton aria-label="no" onClick={handleClick}>
                          <IconAlertTriangle />
                        </IconButton>
                      </Tooltip>
                
            }</td>

          ))}
          </tr>
        ))}
      </tbody>
    </table>
    </MainCard>
    )
}