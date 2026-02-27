import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// third-party
import axios from 'axios';
// material-ui
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import Accordion from 'ui-component/extended/Accordion';
// ==============================|| SAMPLE PAGE ||============================== //

export default function Shows() {
  
  const [shows, setShows] = useState([]);
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

  const getShowContent = (item) => <div><Link to={`/show-details/${item.id}`}><Button>Подробнее</Button></Link></div>
  const getAccData = () => shows.map(show => { return{title: show.name, id: show.id, content:getShowContent(show)}}) 
  
  return (
    <MainCard title={"Спектакли (" + shows.length + ")"}>
      <Typography variant="body2">
         
      </Typography>
      <Accordion data={getAccData()} toggle={true}></Accordion>
      
    </MainCard>
  );
}
