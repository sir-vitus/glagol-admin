// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Accordion from 'ui-component/extended/Accordion';
import ShowsAccordion from './ShowsAccordion';
export default function DatesAccordion({dates}) {
  const getShowContent = (item) => <ShowsAccordion shows={item.shows}></ShowsAccordion>
  const getAccData = () => dates.map((date, idx) => { 
    let dateStr = (new Date(date.date)).toLocaleDateString()
    const showCount = date.shows.filter(show => show.color === 'green').length
    dateStr += ' (' + showCount + ')'
    const title = <Typography variant='subtitle1' sx={{ color: 'grey.800'}}>{dateStr}</Typography>
    return {title: title, id: idx, content:getShowContent(date)}
}) 
    return (<Accordion data={getAccData()} toggle={true}></Accordion>)
}