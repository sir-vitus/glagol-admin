import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import axiosServices from 'utils/axios';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';

export default function ShowForm() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [errName, setErrName] = useState(false);
  const getShow = useCallback(async () => {
    try {
        if(id) {
            const response = await axiosServices.get(`/shows/${id}`);
            if(response && response.data) {
              setName(response.data.name);
              setTitle(response.data.title);
            }
            
        }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getShow();
  }, [getShow]);

  const handleSaveButtonClick = async (event) => {
    event.preventDefault();
    console.log('id: ' + id)
    //m3eE605z8uy
    if(name) {
      const payload = {
        name: name,
        title: title
      }
      const response = await axiosServices.post(`/shows`, payload);
      console.log(response.status)
      //const res = await fetcher('/user/m3eE605z8uy1', options)
      navigate('/shows', { replace: true });
    } else {
      setErrName(true)
    }
  };

  const handleChangeName = (event) => {
    // Update the state with the new value as the user types
    setName(event.target.value);
    if(event.target.value) setErrName(false)
  };
  const handleChangeTitle = (event) => {
    // Update the state with the new value as the user types
    setTitle(event.target.value);
  };


  return (<>
    <CustomFormControl fullWidth error={errName}>
        <InputLabel htmlFor="outlined-adornment-name">Короткое название</InputLabel>
        <OutlinedInput id="outlined-adornment-name" type="text" value={name} onChange={handleChangeName} name="name" />
      </CustomFormControl>
    <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-title">Полное название</InputLabel>
        <OutlinedInput id="outlined-adornment-title" type="text" onChange={handleChangeTitle} name="title" />
      </CustomFormControl>
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button color="secondary" fullWidth size="large" type="submit" variant="contained" onClick={handleSaveButtonClick}>
            Сохранить
          </Button>
        </AnimateButton>
      </Box>
  </>)
}