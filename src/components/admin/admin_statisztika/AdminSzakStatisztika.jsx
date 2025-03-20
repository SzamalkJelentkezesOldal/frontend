import React, { useContext } from "react";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { AdminSzakStatisztikaContext } from "../../../context/admin/AdminSzakStatisztikaContext";
import { BarChart } from '@mui/x-charts/BarChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import SaveIcon from '@mui/icons-material/Save';


function AdminSzakStatisztika() {
  const { nappaliEsti } = useContext(AdminSzakStatisztikaContext);
  const { jelentkezokSzamaSzakokra } = useContext(AdminSzakStatisztikaContext);
  const { jelentkezokSzamaTagozatraSzakokra } = useContext(AdminSzakStatisztikaContext)

  console.log(nappaliEsti);
  const palette = ["#B52626", "#F57373", "#FFA3A3" , "#FFCDA3", "#F5AE73", "#B56726", "#76B8B8", "#459393", "#176C6C"];
  const tagozatSzakData = [
    {
      label: 'Nappali',
      stack: 'A',  // A nappali adatok a stack A-ba kerülnek
      data: jelentkezokSzamaTagozatraSzakokra.map((item) => item.nappali)
    },
    {
      label: 'Esti',
      stack: 'A',  // Az esti adatok szintén az A stack-en
      data: jelentkezokSzamaTagozatraSzakokra.map((item) => item.esti)
    },
    {
      label: 'Összesen',
      data: jelentkezokSzamaTagozatraSzakokra.map((item) => item.osszesen)
    }
  ];
  const tagozatSzakxAxisData =jelentkezokSzamaTagozatraSzakokra.map((item) => item.elnevezes);
  return (
    <div className="pt-24 flex justify-center m-5 flex-wrap gap-20">
      <Card sx={{ maxWidth: 700 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Tagozantonkénti jelentkezők száma
            </Typography>
            <PieChart
            colors={palette}
              margin={{ top: 50, bottom: 50, left: 50, right: 75 }}
              series={[
                {
                  data: [
                    { id: 0, value: nappaliEsti.nappali, label: "nappali" },
                    { id: 1, value: nappaliEsti.esti, label: "esti" },
                  ],
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: { innerRadius: 30, additionalRadius: -80, color: "gray" },
                  arcLabel: (item) => `${item.value}`,
                  arcLabelMinAngle: 35,
                  arcLabelRadius: '60%',
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: 'bold',
              },
            }}
              width={700}
              height={400}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'bottom', horizontal: 'middle' },
                  padding: 2,
                },
              }
              }
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
      <Card sx={{ maxWidth: 780 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Szakonkénti jelentkezők száma
            </Typography>
            <PieChart
              colors={palette}
              margin={{ top: 20, bottom: 100, left: 50, right: 50 }}
              series={[
                {
                  data: jelentkezokSzamaSzakokra.map((data, index) => ({
                    id: index,
                    label: data.elnevezes,
                    value: data.ennyien,
                  })),
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -80, color: 'gray' },
                    arcLabel: (item) => `${item.value}`,
                    arcLabelMinAngle: 35,
                    arcLabelRadius: '60%',
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fontWeight: 'bold',
                },
              }}
              width={780}
              height={400}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'bottom', horizontal: 'middle' },
                  padding: 2,
                  markGap: 2,
                  itemGap: 5,
                },
              }
              
              }
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
              Oszlopdiagramm tagozatonkénti jelentkezésekhez
            </Typography>
            <BarChart
              series={tagozatSzakData}
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
  );
}

export default AdminSzakStatisztika;
