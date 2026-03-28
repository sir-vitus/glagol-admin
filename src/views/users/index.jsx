import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// third-party
import axios from 'axios';
// material-ui
import Typography from '@mui/material/Typography';
import {Button, Fab, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//import Edit from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
// assets
import {Add, Edit} from '@mui/icons-material';


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
        <Stack key={index} direction="row" spacing={2} sx={{ p: 1, alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2">{user.name}</Typography>
          <Tooltip title="Редактировать">
            <Link to={`/user-edit/${user.personID}`}>
              <EditIcon color="action"  />
            </Link>
          </Tooltip>
          
        </Stack>
      ))}
    </MainCard>
    <Link to={`/user-add`}><Fab color="secondary" aria-label="Add" style={{position: 'fixed', bottom: 20, right: 50}}><Add></Add></Fab></Link>
    </AdminGuard>
  );
}
