import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import DeleteIconButtonWithConfirmation from 'ui-component/DeleteIconButtonWithConfirmation';
import axiosServices from 'utils/axios';
import AdminGuard from 'utils/access-guards/AdminGuard';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import Accordion from 'ui-component/extended/Accordion';
import SubCard from 'ui-component/cards/SubCard';


export default function RolesList({item, actors, onUpdate}) {
  const [selectedActor, setSelectedActor] = useState('');
  const data = item.characters
  const [newCharacter, setNewCharacter] = useState('');

  const handleDeletePerformer = async (performer) => {
    console.log('Deleting item with id:', performer.characterID, performer.personID);
      //e.preventDefault()
      if(!performer) return
      const url = `/shows/performer/${performer.characterID}/${performer.personID}`;
      //const url = `https://www.glagoltheatre.ru/api/events/1203`;
      const response = await axiosServices.delete(url, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        }});
      console.log(response.data)
      onUpdate();
  };
  const getCharacterContent = (item) => 
          <Stack  spacing={2} key={item.id}> 
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: 'center', justifyContent: 'left' }}>
              <TextField  id="standard-select-currency" select value={selectedActor} sx={{ minWidth: 200 }}
                 onChange={(e) => setSelectedActor(e.target.value)}>
                {actors.map((option) => (
                  <MenuItem key={option.personID} value={option.personID}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
                <AnimateButton>
                    <Button disableElevation fullWidth size="medium" type="button" variant="contained" color="primary"
                      onClick={(e) => handleNewPerformerClick(e, item.id)}>
                        Добавить исполнителя
                    </Button>
                </AnimateButton>                
             </Stack>
        <SubCard title="Исполнители">
          {item.performers.map(p => (
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
       <Typography variant="body2" sx={{ color: 'inherit' }}> {p.name}</Typography>
       <DeleteIconButtonWithConfirmation item={p} onDelete={handleDeletePerformer} />
        </Stack>
          ))}
                </SubCard>
    </Stack >

      const getAccData = () => item.characters ? 
    item.characters.map(c => { return {title: c.name, id: c.id, content:getCharacterContent(c)}}) 
    : []

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
    const handleNewPerformerClick = async (e, characterID) => {
      e.preventDefault()
      console.log(selectedActor + ' ' + characterID)
      if(!selectedActor) return
      const payload = {
        personID: selectedActor,
        characterID: characterID
      }
      const response = await axiosServices.post(`/shows/performer`, payload);
      console.log(response.data)
      setSelectedActor('')
      onUpdate();
    }

        
     
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