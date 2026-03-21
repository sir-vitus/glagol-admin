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
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import DeleteIconButtonWithConfirmation from 'ui-component/DeleteIconButtonWithConfirmation';
import axiosServices from 'utils/axios';
import AdminGuard from 'utils/access-guards/AdminGuard';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import SubCard from 'ui-component/cards/SubCard';
import MoreMenu from 'ui-component/MoreMenu';
// assets
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CharacterContent({item, actors, onUpdate}) {
    const [selectedActor, setSelectedActor] = useState('');
    const [character, setCharacter] = useState(item.name);
    const [editCharacter, setEditCharacter] = useState(false);

    const handleCharacterMenuSelected = (selectedValue) => {
        switch(selectedValue.command) {
        case 'edit':
            setEditCharacter(true)
            break;
        }
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
    
    const handleDeletePerformer = async (performer) => {
        console.log('Deleting item with id:', performer.characterID, performer.personID);
        //e.preventDefault()
        if(!performer) return
        const url = `/shows/performer/${performer.characterID}/${performer.personID}`;
        const response = await axiosServices.delete(url, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }});
        console.log(response.data)
        onUpdate();
    };

    const handleCancelEditing = () => {
        setCharacter(item.name)
        setEditCharacter(false)
    }

  const handleCharacterEdited = async (e) => {
    e.preventDefault()
    if(item.name === character) return
    const payload = {
      id: item.id,
      name: character
    }
    const response = await axiosServices.post(`/shows/character`, payload);
    console.log(response.data)
    //setNewCharacter('')
    onUpdate();
    setEditCharacter(false)
  }


    return (<Stack  spacing={2} key={item.id}> 
          {!editCharacter && (
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: 'stretch', justifyContent: 'left' }}>
              <TextField  id="standard-select-currency" select value={selectedActor} sx={{ minWidth: 200 }}
                 onChange={(e) => setSelectedActor(e.target.value)}>
                {actors.map((option) => (
                  <MenuItem key={option.personID} value={option.personID}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <AnimateButton>
                    <Button disableElevation size="large" type="button" variant="contained" color="primary"
                      onClick={(e) => handleNewPerformerClick(e, item.id)}>
                        Добавить исполнителя
                    </Button>
                </AnimateButton>                
             
              <MoreMenu items={[
                {name: 'Редактировать', icon: EditIcon, value: { command: 'edit'}}, 
                {name: 'Удалить', icon: DeleteIcon, value: { command: 'delete'}}
                ]} onSelect={handleCharacterMenuSelected}></MoreMenu>
            </Stack>
        </Stack>)}
          {editCharacter && (
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: 'stretch', justifyContent: 'left' }}>
          <CustomFormControl fullWidth>
            <InputLabel htmlFor="txt-character">Название роли</InputLabel>
            <OutlinedInput id="txt-character" type="text" name="txtCharacter" value={character} 
              onChange={(e) => setCharacter(e.target.value)} />
          </CustomFormControl>
          <Stack direction="row"  spacing={2} sx={{ justifyContent: 'space-between' }}>
                <AnimateButton>
                    <Button disableElevation size="large" type="button" variant="contained" color="primary"
                      onClick={handleCharacterEdited}>
                        Сохранить
                    </Button>
                </AnimateButton>                
                <AnimateButton>
                    <Button disableElevation size="large" type="button" variant="contained" color="secondary"
                      onClick={handleCancelEditing}>
                        Отмена
                    </Button>
                </AnimateButton>                
             </Stack>

        </Stack>)}

        <SubCard title="Исполнители">
          {item.performers.map(p => (
            <Stack direction="row" key={p.id} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
       <Typography variant="body2" sx={{ color: 'inherit' }}> {p.name}</Typography>
       <DeleteIconButtonWithConfirmation item={p} onDelete={handleDeletePerformer} />
        </Stack>
          ))}
                </SubCard>
    </Stack >)
}
