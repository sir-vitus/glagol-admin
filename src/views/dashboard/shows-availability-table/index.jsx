import { useCallback, useState, useEffect } from 'react';
// assets
import { IconCheck, IconAlertTriangle } from '@tabler/icons-react';
// material-ui
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'; // Добавлен для контроля текста заголовков
// constant
const icons = { IconCheck, IconAlertTriangle };

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axiosServices from 'utils/axios';

export default function ShowsAvailabilityTable() {
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
    // setOpen(true);
  };

  const shows = dates.length ? dates[0].shows : [];
  
  const shortDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString();
    return `${day}.${month}`;
  };

  // Стилизация для адаптивности
  const commonCellSx = {
    fontSize: '0.875rem', // ~14px стандартный размер, но теперь он rem
    padding: '8px 16px',   // Относительные отступы тоже лучше делать через theme.spacing, но здесь оставим px/rem гибрид
    whiteSpace: 'nowrap',  // Чтобы даты не переносились
  };

  const headerCellSx = {
    ...commonCellSx,
    fontWeight: 600,
    backgroundColor: '#f2f2f2 !important', // Важно сохранить фон при скролле
  };

  return (
    <MainCard title={"Спектакли (" + shows.length + ")"}>
      {/* 
        ИСПРАВЛЕНИЕ 1: maxHeight заменено на vh (viewport height). 
        Теперь таблица займет максимум 80% высоты экрана, независимо от разрешения.
      */}
      <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell 
                sx={{ 
                  ...headerCellSx, 
                  position: 'sticky', 
                  left: 0, 
                  zIndex: 10, 
                  minWidth: '150px' // Минимальная ширина для первой колонки
                }}
              >
                Спектакли
              </TableCell>
              {dates.map((date) => (
                <TableCell key={date.date} sx={headerCellSx}>
                  {shortDate(date.date)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {shows.map((show, idx) => (
              <TableRow key={show.id}>
                <TableCell 
                  component="th" 
                  scope="row" 
                  sx={{ 
                    ...commonCellSx,
                    position: 'sticky', 
                    left: 0, 
                    zIndex: 1, 
                    background: 'white',
                    minWidth: '150px'
                  }}
                >
                  {show.name}
                </TableCell>
                
                {dates.map((date) => {
                  const showData = date.shows?.[idx];
                  
                  if (!showData) return null; 

                  let icon = null;
                  let tooltipTitle = '';
                  let color = 'inherit'; 

                  // Логика определения цвета, иконки и текста подсказки
                  switch (showData.color) {
                    case 'green':
                      icon = <IconCheck style={{ width: '1em', height: '1em' }} />;
                      tooltipTitle = "Все исполнители доступны";
                      color = 'success.main'; 
                      break;
                    
                    case 'grey':
                      icon = <IconHelp style={{ width: '1em', height: '1em' }} />;
                      // Ищем персонажей с цветом 'grey'
                      const greyChars = showData.characters?.filter(c => c.color === 'grey').map(c => c.name);
                      tooltipTitle = greyChars && greyChars.length > 0 
                        ? `Нет информации по: ${greyChars.join(', ')}` 
                        : "Нет информации о составе";
                      color = 'text.disabled'; // Серый
                      break;

                    case 'red':
                      icon = <IconAlertTriangle style={{ width: '1em', height: '1em' }} />;
                      // Ищем персонажей с цветом 'red'
                      const redChars = showData.characters?.filter(c => c.color === 'red').map(c => c.name);
                      tooltipTitle = redChars && redChars.length > 0 
                        ? `Недоступны: ${redChars.join(', ')}` 
                        : "Есть недоступные исполнители";
                      color = 'error.main'; // Красный
                      break;
                    
                    default:
                      icon = <IconHelp style={{ width: '1em', height: '1em' }} />;
                      tooltipTitle = "Неизвестный статус";
                      color = 'warning.main';
                      break;
                  }

                  return (
                    <TableCell key={`${date.date}-${show.id}`} sx={commonCellSx}>
                      <Tooltip title={tooltipTitle}>
                        <IconButton 
                          aria-label={`status-${showData.color}`} 
                          onClick={handleClick} 
                          size="small"
                          sx={{ color: color }} 
                        >
                          {icon}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}