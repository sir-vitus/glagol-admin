import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import axiosServices from 'utils/axios';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import MainCard from 'ui-component/cards/MainCard';

export default function UserForm() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [errLastName, setErrLastName] = useState(false);

  const getUser = useCallback(async () => {
    try {
      if(id) {
          const response = await axiosServices.get(`/user/${id}`);
          if(response && response.data) {
            setLastName(response.data.lastName);
            setFirstName(response.data.firstName);
          }
          
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleSaveButtonClick = async (event) => {
    event.preventDefault();
    //console.log('id: ' + id)
    if(validate()) {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        email: email
      }
      const response = await axiosServices.post(`/user`, payload);
      console.log(response.status)
      handleGoBack();
    } 
  };
  const handleCancelButtonClick = async (event) => {
    event.preventDefault();
    handleGoBack();
  };

  const validate = () => {
    let valid = true
    if(lastName === '') {
      setErrLastName(true)
      valid = false
    }
    return valid
  }

  const handleGoBack = () => {
    //if(id)
    //  navigate('/show-details/' + id.toString(), { replace: true })
    //else
      navigate('/users', { replace: true })
    
  }
  const handleChangeLastName = (event) => {
    // Update the state with the new value as the user types
    setLastName(event.target.value);
    if(event.target.value) setErrLastName(false)
  };
  const handleChangeFirstName = (event) => {
    // Update the state with the new value as the user types
    setFirstName(event.target.value);
  };
  const handleChangeMiddleName = (event) => {
    // Update the state with the new value as the user types
    setMiddleName(event.target.value);
  };
  const handleChangeEmail = (event) => {
    // Update the state with the new value as the user types
    setEmail(event.target.value);
  };


  return (<>
      <MainCard title={ id ? "Редактирование пользователя" : "Новый человек."}>
  
    <CustomFormControl fullWidth error={errLastName}>
        <InputLabel htmlFor="outlined-adornment-last-name">Фамилия</InputLabel>
        <OutlinedInput id="outlined-adornment-last-name" type="text" value={lastName} onChange={handleChangeLastName} name="last-name" />
      </CustomFormControl>
    <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-first-name">Имя</InputLabel>
        <OutlinedInput id="outlined-adornment-first-name" type="text" value={firstName} onChange={handleChangeFirstName} name="first-name" />
      </CustomFormControl>
    <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-middle-name">Отчество</InputLabel>
        <OutlinedInput id="outlined-adornment-middle-name" type="text" value={middleName} onChange={handleChangeMiddleName} name="middle-name" />
      </CustomFormControl>
    <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
        <OutlinedInput id="outlined-adornment-email" type="text" value={email} onChange={handleChangeEmail} name="email" />
      </CustomFormControl>
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button color="secondary" fullWidth size="large" type="submit" variant="contained" onClick={handleSaveButtonClick}>
            Сохранить
          </Button>
        </AnimateButton>
      </Box>
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button color="primary" fullWidth size="large" type="submit" variant="contained" onClick={handleCancelButtonClick}>
            Отмена
          </Button>
        </AnimateButton>
      </Box>
      </MainCard>
  </>)
}