import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// third-party
import axios from 'axios';
// material-ui
import Typography from '@mui/material/Typography';
import {Button, Fab } from '@mui/material';
// assets
import {Add} from '@mui/icons-material';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import ManagerGuard from 'utils/access-guards/ManagerGuard';
import AdminGuard from 'utils/access-guards/AdminGuard';
//import { getContacts } from '../../store/slices/contact';
//import axiosServices from '../../utils/axios';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Users() {
  
  const [users, setUsers] = useState([]);
  //const contacts = await getContacts()
  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get('https://glagoltheatre.ru/api/user/actors');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  
  return (<AdminGuard>
    <MainCard title="Актёры">
      <Typography variant="body2">
        {users.length} актёров 
      </Typography>
      {users.map((user, index) => (
        <SubCard key={index}>{user.name}</SubCard>
      ))}
    </MainCard>
    <Link to={`/user-add`}><Fab color="secondary" aria-label="Add" style={{position: 'fixed', bottom: 20, right: 50}}><Add></Add></Fab></Link>
    </AdminGuard>
  );
}
