import { useCallback, useState, useEffect } from 'react';

// third-party
import axios from 'axios';
// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
//import { getContacts } from '../../store/slices/contact';
//import axiosServices from '../../utils/axios';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Shows() {
  
  const [shows, setShows] = useState([]);
  //const contacts = await getContacts()
  const getShows = useCallback(async () => {
    try {
      const response = await axios.get('https://glagoltheatre.ru/api/events?type=1');
      setShows(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getShows();
  }, [getShows]);
  
  return (
    <MainCard title="Спектакли">
      <Typography variant="body2">
        {shows.length} спектакля 
      </Typography>
      {shows.map((show, index) => (
        <SubCard key={index}>{show.name}</SubCard>
      ))}
    </MainCard>
  );
}
