import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// third-party
import axios from 'axios';
// material-ui
import Typography from '@mui/material/Typography';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import Accordion from 'ui-component/extended/Accordion';
// ==============================|| SAMPLE PAGE ||============================== //

export default function Shows() {
  
  const [shows, setShows] = useState([]);
  //const contacts = await getContacts()
  const getShows = useCallback(async () => {
    try {
      const response = await axios.get('https://glagoltheatre.ru/api/shows');
      setShows(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getShows();
  }, [getShows]);

  const getShowContent = (item) => <div><Link to={`/show-details/${item.id}`}>Подробнее</Link></div>
  const getAccData = () => shows.map(show => { return{title: show.name, id: show.id, content:getShowContent(show)}}) 
  
  return (
    <MainCard title="Спектакли">
      <Typography variant="body2">
        {shows.length} спектаклей
      </Typography>
      <Accordion data={getAccData()}></Accordion>
      
    </MainCard>
  );
}
