import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// third-party
import axios from 'axios';
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
import Tooltip from '@mui/material/Tooltip';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import Accordion from 'ui-component/extended/Accordion';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ConfirmationDialog from 'ui-component/ConfirmationDialog';

export default function ShowDetails() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [show, setShow] = useState([]);
  const [newCharacter, setNewCharacter] = useState('');
  const [selectedActor, setSelectedActor] = useState('');
  const [actors, setActors] = useState([]);


  //const contacts = await getContacts()
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

  const handleDeletePerformer = async (performer) => {
    console.log('Deleting item with id:', performer.characterID, performer.personID);
      //e.preventDefault()
      if(!performer) return
      const response = await axios.delete(`https://glagoltheatre.ru/api/shows/performer/${performer.characterID}/${performer.personID}`);
      console.log(response.data)
      getShow();
  };

  const getCharacterContent = (item) => <Stack  spacing={2} key={item.id}> 
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
       <Typography variant="subtitle1" sx={{ color: 'inherit' }}> {p.name}</Typography>
       <DeleteIconButtonWithConfirmation item={p} onDelete={handleDeletePerformer} />
        </Stack>
          ))}
                </SubCard>
    </Stack >
  const getAccData = () => show.characters ? 
    show.characters.map(c => { return{title: c.name, id: c.id, content:getCharacterContent(c)}}) 
    : []

    const handleNewCharacterClick = async (e) => {
      e.preventDefault()
      if(!newCharacter) return
      const payload = {
        showId: id,
        name: newCharacter
      }
      const response = await axios.post(`https://glagoltheatre.ru/api/shows/character`, payload);
      console.log(response.data)
      setNewCharacter('')
      getShow();
    }
    const handleNewPerformerClick = async (e, characterID) => {
      e.preventDefault()
      console.log(selectedActor + ' ' + characterID)
      if(!selectedActor) return
      const payload = {
        personID: selectedActor,
        characterID: characterID
      }
      const response = await axios.post(`https://glagoltheatre.ru/api/shows/performer`, payload);
      console.log(response.data)
      setSelectedActor('')
      getShow();
    }

return (
    <MainCard title={show.name}>
      <Typography variant="body2"></Typography>
        <SubCard title="Роли">
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
      <Accordion data={getAccData()}></Accordion></SubCard>
      
      
    </MainCard>
  );}

const DeleteIconButtonWithConfirmation = ({ item, onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onDelete(item);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Удалить">
        <IconButton aria-label="delete" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <ConfirmationDialog
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        title="Подтверждение удаления"
        description={`Точно удалить?`}
      />
    </>
  );
};