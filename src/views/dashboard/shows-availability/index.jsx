import { useCallback, useState, useEffect } from 'react';
// assets
import { IconCheck, IconAlertTriangle } from '@tabler/icons-react';
// material-ui
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// constant
const icons = { IconCheck, IconAlertTriangle };

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axiosServices from 'utils/axios';
import DatesAccordion from './DatesAccordion';

export default function ShowsAvailability() {
  const [dates, setDates] = useState([]);
  const getDates = useCallback(async () => {
    try {
      const response = await axiosServices.get('/shows/avail');
      setDates(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getDates();
  }, [getDates]);
  const handleClick = () => {
    //setOpen(true);
  };

  const shows = dates.length ? dates[0].shows : []

    return (
        <MainCard title={"Спектакли (" + shows.length + ")"}>

    <DatesAccordion dates={dates}></DatesAccordion>
    </MainCard>
    )
}