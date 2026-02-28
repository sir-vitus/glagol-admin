// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// assets
import { IconCheck, IconAlertTriangle } from '@tabler/icons-react';

import Accordion from 'ui-component/extended/Accordion';
import PerformersList from './PerformersList';
export default function CharactersAccordion({data}) {
  const getShowContent = (item) => <PerformersList data={item.performers}></PerformersList>
  const getAccData = () => data.map((item, idx) => { 
    const icon = item.color === 'red' ? <IconAlertTriangle /> : <IconCheck />
    const title =<Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid sx={{p: 1}}>
              <Typography variant="subtitle1" sx={{ color: item.color }}>
                {icon}
              </Typography>
            </Grid>
            <Grid sx={{p: 1}}>
              <Typography variant="body1" sx={{ color: 'grey.800' }}>
               {item.name} 
              </Typography>
            </Grid>
          </Grid>
    return{ title: title, id: idx, content:getShowContent(item)}}) 
    return (<Accordion data={getAccData()} toggle={true}></Accordion>)
}