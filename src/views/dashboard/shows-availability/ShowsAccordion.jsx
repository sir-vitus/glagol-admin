import Accordion from 'ui-component/extended/Accordion';
import CharactersAccordion from './CharactersAccordion';
// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// assets
import { IconCheck, IconAlertTriangle } from '@tabler/icons-react';

// constant
const icons = { IconCheck, IconAlertTriangle };

export default function ShowsAccordion({shows}) {
  const getShowContent = (item) => <CharactersAccordion data={item.characters}></CharactersAccordion>
  const getAccData = () => shows.map((show, idx) => { 
    const icon = show.color === 'red' ? <IconAlertTriangle /> : <IconCheck />
    const title =<Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid sx={{p: 1}}>
              <Typography variant="subtitle1" sx={{ color: show.color }}>
                {icon}
              </Typography>
            </Grid>
            <Grid sx={{p: 1}}>
              <Typography variant="body2" sx={{ color: 'grey.800' }}>
               {show.name} 
              </Typography>
            </Grid>
          </Grid>
    return{ title: title, id: idx, content:getShowContent(show)}}) 
    return (<Accordion data={getAccData()} toggle={true}></Accordion>)
}