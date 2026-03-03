import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// third-party
import axios from 'axios';
// material-ui
import Typography from '@mui/material/Typography';
import {ArrowBack} from '@mui/icons-material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Accordion from 'ui-component/extended/Accordion';
import ManagersList from './ManagersList';
import RolesList from './RolesList';

export default function ShowDetails() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [show, setShow] = useState([]);
  const [actors, setActors] = useState([]);


  const getShow = useCallback(async () => {
    try {
      const response = await axios.get(`https://glagoltheatre.ru/api/shows/${id}`);
      setShow(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getShow();
  }, [getShow]);

  const onUpdate = () => {
    getShow()
  }

  const getActors = useCallback(async () => {
    try {
      const response = await axios.get('https://glagoltheatre.ru/api/user/actors');
      setActors(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getActors();
  }, [getActors]);

  const mainAccordionData = [
    {title: <Typography variant='subtitle1' sx={{ color: 'grey.800'}}>Роли</Typography>, id: 1, 
      content: <RolesList item={show} actors={actors} onUpdate={onUpdate}></RolesList>},
    {title: <Typography variant='subtitle1' sx={{ color: 'grey.800'}}>Помрежи</Typography>, id: 2, 
      content: <ManagersList item={show} actors={actors} onUpdate={onUpdate}></ManagersList>},
  ]

    const backBtn = <Link to={`/shows`}><ArrowBack></ArrowBack></Link>
        
     
return (
    <MainCard title={show.name} secondary={backBtn}>
      
      <Accordion data={mainAccordionData} defaultExpandedId={1} toggle={true}></Accordion>
      
    </MainCard>
  );}

