import React, { useContext } from 'react'
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from '@mui/x-charts/BarChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import SaveIcon from '@mui/icons-material/Save';
import { AdminJelentkezoStatisztikaContext } from '../../../context/admin/AdminJelentkezoStatisztikaContext';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

function AdminJelentkezoStatisztika() {
  const { elfogadottakSzama } = useContext(AdminJelentkezoStatisztikaContext);
  const { elfogadottakSzamaSzakonkent } = useContext(AdminJelentkezoStatisztikaContext);
  const { haviRegisztraciokSzama } = useContext(AdminJelentkezoStatisztikaContext)
  const { haviRegisztraciokSzakonkentSzama } = useContext(AdminJelentkezoStatisztikaContext)

  const tagozatElfogadvaData = [
    {
      label: 'Elfogadottak',
      data: elfogadottakSzamaSzakonkent.map((item) => item.elfogadottak)
    },
    {
      label: 'Összesen',
      data: elfogadottakSzamaSzakonkent.map((item) => item.osszesen)
    }
  ];
  const tagozatSzakxAxisData =elfogadottakSzamaSzakonkent.map((item) => item.elnevezes);
  return (
    <div className="pt-24 flex justify-center m-5 flex-wrap gap-20">
      <Card sx={{ maxWidth: '20%' }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Elfogadott jelentkezők
            </Typography>
            <Gauge
              value={elfogadottakSzama.elfogadottak}
              startAngle={-110}
              endAngle={110}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  transform: 'translate(0px, 0px)',
                },
              }}
              text={
                ({ value, valueMax }) => `${elfogadottakSzama.elfogadottak} / ${elfogadottakSzama.osszesen}`
              }
              height={300}
              width={300}
            />
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<SaveIcon />}
          >
            Letöltés
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: '100%' }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Oszlopdiagramm szakonkénti elfogadott jelentkezőkhöz
            </Typography>
            <BarChart
              series={tagozatElfogadvaData}
              xAxis={[{
                scaleType: 'band', data: tagozatSzakxAxisData}]}
                
              width={1600}
              height={350}
              barLabel="value"
              
            />
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<SaveIcon />}
          >
            Letöltés
          </Button>
        </CardActions>
      </Card>




    </div>
  )
}

export default AdminJelentkezoStatisztika