import { useState } from 'react';
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
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import useAuth from 'hooks/useAuth'
import { useLocalStorage } from 'hooks/useLocalStorage';
import axiosServices from 'utils/axios';
import { fetcher } from '../../../utils/axios';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===============================|| JWT - LOGIN ||=============================== //

export default function AuthLogin() {
  const [checked, setChecked] = useState(true);
  const { setAuth, authUser } = useAuth()
  //const { state, setState, setField, resetState } = useLocalStorage('isAuthenticated', false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    console.log('handleMouseDownPassword')
  };

  const handleLoginButtonClick = async (event) => {
    event.preventDefault();
    console.log(password)
    //m3eE605z8uy
    const url = '/user/' + password
    const res = await axiosServices.get(url);
    console.log(res.status)
    if(res.status === 200) {
      setAuth(res.data)
    }
    //const res = await fetcher('/user/m3eE605z8uy1', options)
    console.table(authUser)
    navigate('/', { replace: true });
  };

  const handleChange = (event) => {
    // Update the state with the new value as the user types
    setPassword(event.target.value);
  };

  return (
    <>
      {false && (<CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
        <OutlinedInput id="outlined-adornment-email-login" type="email" value="info@codedthemes.com" name="email" />
      </CustomFormControl>)}

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password-login">Пароль</InputLabel>
        <OutlinedInput
          onChange={handleChange}
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          value={password}
          name="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </CustomFormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label="Keep me logged in"
          />
        </Grid>
        <Grid>
          <Typography variant="subtitle1" component={Link} to="#!" sx={{ textDecoration: 'none', color: 'secondary.main' }}>
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button color="secondary" fullWidth size="large" type="submit" variant="contained" onClick={handleLoginButtonClick}>
            Sign In
          </Button>
        </AnimateButton>
      </Box>
    </>
  );
}
