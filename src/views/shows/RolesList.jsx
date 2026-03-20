import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import DeleteIconButtonWithConfirmation from 'ui-component/DeleteIconButtonWithConfirmation';
import axiosServices from 'utils/axios';
import AdminGuard from 'utils/access-guards/AdminGuard';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import Accordion from 'ui-component/extended/Accordion';
import SubCard from 'ui-component/cards/SubCard';
import MoreMenu from 'ui-component/MoreMenu';
import CharacterContent from './CharacterContent';
// assets
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function RolesList({item, actors, onUpdate}) {
  const [newCharacter, setNewCharacter] = useState('');
  
  const handleNewCharacterClick = async (e) => {
    e.preventDefault()
    if(!newCharacter) return
    const payload = {
      showId: item.id,
      name: newCharacter
    }
    const response = await axiosServices.post(`/shows/character`, payload);
    console.log(response.data)
    setNewCharacter('')
    onUpdate();
  }

  const getAccData = () => item.characters ? 
    item.characters.map(c => { return {title: c.name, id: c.id, content: <CharacterContent item={c} actors={actors} onUpdate={onUpdate}/>}}) 
    : []


        
     
return (
    <>
      <Grid container spacing={{ xs: 0, sm: 2 }} alignItems="center">
        <Grid size={{ xs: 12, sm: 9 }}>
          <CustomFormControl fullWidth>
            <InputLabel htmlFor="txt-character">Новая роль</InputLabel>
            <OutlinedInput id="txt-character" type="text" name="txtCharacter" value={newCharacter} 
              onChange={(e) => setNewCharacter(e.target.value)} />
          </CustomFormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <AnimateButton>
            <Button disableElevation fullWidth size="large" type="button" variant="contained" color="secondary"
              onClick={handleNewCharacterClick}>
                Добавить
            </Button>
        </AnimateButton>
        </Grid>
      </Grid>
      <Accordion data={getAccData()} toggle={true}></Accordion>
      </>
  );
}