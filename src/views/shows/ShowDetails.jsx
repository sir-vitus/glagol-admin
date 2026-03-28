import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// third-party
import axios from 'axios';
// material-ui
import Typography from '@mui/material/Typography';
import {ArrowBack} from '@mui/icons-material';
import Stack from '@mui/material/Stack';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Accordion from 'ui-component/extended/Accordion';
import ManagersList from './ManagersList';
import RolesList from './RolesList';
// assets
import EditIcon from '@mui/icons-material/Edit';


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
    {title: <Typography variant='h4' sx={{ color: 'grey.800'}}>Роли</Typography>, id: 1, 
      content: <RolesList item={show} actors={actors} onUpdate={onUpdate}></RolesList>},
    {title: <Typography variant='h4' sx={{ color: 'grey.800'}}>Помрежи</Typography>, id: 2, 
      content: <ManagersList item={show} actors={actors} onUpdate={onUpdate}></ManagersList>},
  ]

    const backBtn = <Link to={`/shows`}><ArrowBack></ArrowBack></Link>
        
     
return (
    <MainCard title={<Stack direction="row">{show.name}<Link to={`/show-edit/${show.id}`}><EditIcon color='action' sx={{ml: 2}} /></Link></Stack> } secondary={backBtn}>
      
      <Accordion data={mainAccordionData} defaultExpandedId={1} toggle={true}></Accordion>
      
    </MainCard>
  );}

