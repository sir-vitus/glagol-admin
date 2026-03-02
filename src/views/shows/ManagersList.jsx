import { useCallback, useState, useEffect } from 'react';
// material-ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {ArrowBack} from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import DeleteIconButtonWithConfirmation from 'ui-component/DeleteIconButtonWithConfirmation';
import axiosServices from 'utils/axios';

export default function ManagersList({item, actors, onUpdate}) {
  const [selectedActor, setSelectedActor] = useState('');
  const data = item.managers

  const handleDeleteManager = async (manager) => {
    console.log('Deleting item with id:', manager.personID);
      //e.preventDefault()
      if(!manager) return
      const url = `/shows/${item.id}/manager/${manager.personID}`;
      const response = await axiosServices.delete(url, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        }});
      console.log(response.data)
      onUpdate();
  };
    const handleNewManagerClick = async (e, id) => {
      e.preventDefault()
      console.log(selectedActor + ' ' + id)
      if(!selectedActor) return
      const response = await axiosServices.post(`/shows/${id}/manager/${selectedActor}`);
      console.log(response.data)
      setSelectedActor('')
      onUpdate();
    }
    return (<>
     <Stack  spacing={2} key={item.id}> 
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: 'center', justifyContent: 'left' }}>
              <TextField  id="standard-select-currency" select value={selectedActor} sx={{ minWidth: 200 }}
                 onChange={(e) => setSelectedActor(e.target.value)}>
                {actors && actors.map((option) => (
                  <MenuItem key={option.personID} value={option.personID}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
                <AnimateButton>
                    <Button disableElevation fullWidth size="medium" type="button" variant="contained" color="primary"
                      onClick={(e) => handleNewManagerClick(e, item.id)}>
                        Добавить помрежа
                    </Button>
                </AnimateButton>                
             </Stack>
          {data && data.map(p => (
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
       <Typography variant="body2" sx={{ color: 'inherit' }}> {p.name}</Typography>
       <DeleteIconButtonWithConfirmation item={p} onDelete={handleDeleteManager} />
        </Stack>
          ))}
                
    </Stack >
    </>)
}