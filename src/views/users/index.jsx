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
  
  return (
    <MainCard title="Users">
      <Typography variant="body2">
        {users.length} Users 
      </Typography>
      {users.map((user, index) => (
        <SubCard key={index}>{user.name}</SubCard>
      ))}
    </MainCard>
  );
}
