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
import ManagerGuard from 'utils/access-guards/ManagerGuard';

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

  const getShowContent = (item) => <></>
  const getAccData = () => shows.map(show => {
    const actions = <ManagerGuard showId={show.id}><Link to={`/show-details/${show.id}`}><Button>Редактировать</Button></Link></ManagerGuard>
    return{title: show.name, id: show.id, content:getShowContent(show), actions: actions }
  }) 
  
  return (<ManagerGuard>
    <MainCard title={"Спектакли (" + shows.length + ")"}>
      <Typography variant="body2">
         
      </Typography>
      <Accordion data={getAccData()} toggle={true}></Accordion>
      
    </MainCard></ManagerGuard>
  );
}
