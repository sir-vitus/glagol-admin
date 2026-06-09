import { useCallback, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// third-party
import axios from 'axios';
// material-ui
import Typography from '@mui/material/Typography';
import {Button, Fab, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RestoreIcon from '@mui/icons-material/Restore';
//import Edit from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
// assets
import {Add, Edit} from '@mui/icons-material';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import ManagerGuard from 'utils/access-guards/ManagerGuard';
import AdminGuard from 'utils/access-guards/AdminGuard';
import ConfirmationDialog from 'ui-component/ConfirmationDialog';
//import { getContacts } from '../../store/slices/contact';
import axiosServices from 'utils/axios';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Users() {
  
  const [users, setUsers] = useState([]);
  const [mode, setMode] = useState('default');
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(null);

  //const contacts = await getContacts()
  const getUsers = useCallback(async () => {
    try {
      //console.log(location.pathname);
      const url = 'https://glagoltheatre.ru/api/user/actors' + ((location.pathname === '/archive/users') ? '/3' : '')
      const response = await axios.get(url);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setMode((location.pathname === '/archive/users') ? 'archive' : 'default')
    getUsers();
  }, [getUsers]);

  const handleRestoreUser = async (event, user) => {
    event.preventDefault();
    console.table(user);
    if(user.personID) {
      const payload = {
        personID: user.personID,
        type: 1,
      }
      const response = await axiosServices.post(`/user`, payload);
      console.log(response.status);
      getUsers();
    } 
    setOpenDialog(null);
  };
  
  return (<AdminGuard>
    <MainCard title="Актёры">
      <Typography variant="body2">
        {users.length} актёров 
      </Typography>
      {users.map((user, index) => (
        <Stack key={index} direction="row" spacing={2} sx={{ p: 1, alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2">{user.name}</Typography>
          {(mode === 'default') && <Tooltip title="Редактировать">
            <Link to={`/user-edit/${user.personID}`}>
              <EditIcon color="action"  />
            </Link>
          </Tooltip>}
          {(mode === 'archive') && (<><Tooltip title="Восстановить">
            <IconButton aria-label="restore" onClick={() =>  setOpenDialog(user)}>
              <RestoreIcon color="action"  />
            </IconButton>
          </Tooltip>
          </>)}
          
        </Stack>
      ))}
            <ConfirmationDialog
              open={openDialog}
              confirmText='Восстановить'
              handleClose={() => setOpenDialog(null)}
              handleConfirm={(e) => handleRestoreUser(e, openDialog)}
              title="Подтверждение восстановления"
              description={`Вы действительно хотите восстановить пользователя ${openDialog?.name}?`}
            />          
    </MainCard>
    <Link to={`/user-add`}><Fab color="secondary" aria-label="Add" style={{position: 'fixed', bottom: 20, right: 50}}><Add></Add></Fab></Link>
    </AdminGuard>
  );
}
