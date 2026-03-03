// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// assets
import noManagerImage from 'assets/images/no-manager-small.png';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  return (<>
  
    <MainCard title="Sample Card">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
        reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
        officiate descent molls anim id est labours.
      </Typography>
    </MainCard>
      <img src={noManagerImage} sx={{width:'100%',height:'100%', objectFit:'contain'}} />
    </>
  );
}
