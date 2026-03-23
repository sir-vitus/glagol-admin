import { useState } from 'react';
// material-ui
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
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