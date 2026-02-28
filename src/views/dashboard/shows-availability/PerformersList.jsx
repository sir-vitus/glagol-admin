// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// assets
import { IconCheck, IconAlertTriangle } from '@tabler/icons-react';
export default function PerformersList({data}) {
    return (<>
    {data.map((item, idx) =>{ 
      const response = item.response ?? 0
      const color = response === 1 ? 'green' : response === 2 ? 'red' : response === 3 ? 'yellow' : 'grey.400'
      const icon = response === 1 ? <IconCheck /> : response === 2 ? <IconAlertTriangle /> : response === 3 ? <IconCheck /> : <IconCheck />
      const title =<Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid sx={{p: 1}}>
              <Typography variant="subtitle1" sx={{ color: color }}>
                {icon}
              </Typography>
            </Grid>
            <Grid sx={{p: 1}}>
              <Typography variant="body1" sx={{ color: 'grey.800' }}>
               {item.name} 
              </Typography>
            </Grid>
            <Grid sx={{p: 1}}>
              <Typography variant="body1" sx={{ color: 'grey.800' }}>
               {item.comment} 
              </Typography>
            </Grid>
          </Grid>
     
      
      return(
      <div key={idx}>
        {title}
      </div>
    ) }

    )}
    </>)
}