import { useState } from 'react';
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
import ConfirmationDialog from 'ui-component/ConfirmationDialog';
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
export default DeleteIconButtonWithConfirmation;