import { useCallback, useState, useEffect } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
// assets
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';

const MoreMenu = ({ items, onSelect }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (value) => {
    onSelect(value)
    setAnchorEl(null);
  };
  return (<>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.mediumAvatar,
                      bgcolor: 'secondary.dark',
                      color: 'secondary.200',
                      zIndex: 1
                    }}
                    aria-controls="menu-earning-card"
                    aria-haspopup="true"
                    onClick={handleClickOpen}
                  >
                    <MoreHorizIcon fontSize="inherit" />
                  </Avatar>
              <Menu
              id="menu-earning-card"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              variant="selectedMenu"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >{
                items.map((item) => (
                    <MenuItem onClick={() => handleSelect(item.value)}>
                        {item.icon && (<item.icon sx={{ mr: 1.75 }} />)} {item.name}
                    </MenuItem>

                ))
            }
            </Menu>
</>
  )

}
export default MoreMenu;