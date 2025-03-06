import React, { useContext } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { AdminSzakStatisztikaContext } from "../../../context/admin/AdminSzakStatisztikaContext";
import { map } from "zod";
import { BarChart } from '@mui/x-charts/BarChart';


function AdminSzakStatisztika() {
  const { nappaliEsti } = useContext(AdminSzakStatisztikaContext);
  const { jelentkezokSzamaSzakokra } = useContext(AdminSzakStatisztikaContext);
  const { jelentkezokSzamaTagozatraSzakokra } = useContext(AdminSzakStatisztikaContext)

  console.log(nappaliEsti);
  return (
    <div className="pt-24 flex justify-center">
      <PieChart
      margin={{ top: 50, bottom: 50, left: 50, right:50 }}
        series={[
          {
            data: [
              { id: 0, value: nappaliEsti.nappali, label: "nappali" },
              { id: 1, value: nappaliEsti.esti, label: "esti" },
            ],
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -80, color: "gray" },
          },
        ]}
        width={800}
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

      <PieChart
      margin={{ top: 50, bottom: 50, left: 50, right:50 }}
        series={[
          {
            data: jelentkezokSzamaSzakokra.map((data, index) => ({
              id: index,
              label: data.elnevezes,
              value: data.ennyien,
            })),
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -80, color: 'gray' },

          },
        ]}
        width={800}
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
      <BarChart
        series={[
          {
            data: [jelentkezokSzamaTagozatraSzakokra.map((data) => ({
              value: data.nappali
            }))], stack: 'A', label: 'Nappali'
          },
          {
            data: [jelentkezokSzamaTagozatraSzakokra.map((data) => ({
              value: data.esti
            }))], stack: 'A', label: 'Esti'
          },
          {
            data: [jelentkezokSzamaTagozatraSzakokra.map((data) => ({
              value: data.osszesen
            }))], label: 'Összesen'
          },
        ]}
        xAxis={[{
          scaleType: 'band', data: jelentkezokSzamaTagozatraSzakokra.map((data) => ({
            value: data.elnevezes
          }))
        }]}
        width={600}
        height={350}
      />
    </div>
  );
}

export default AdminSzakStatisztika;
