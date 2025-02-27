import React, { useContext } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { AdminSzakStatisztikaContext } from "../../../context/admin/AdminSzakStatisztikaContext";
import { map } from "zod";

function AdminSzakStatisztika() {
  const { nappaliEsti } = useContext(AdminSzakStatisztikaContext);
  const { jelentkezokSzamaSzakokra } = useContext(AdminSzakStatisztikaContext);

  console.log(nappaliEsti);
  return (
    <div className="pt-24">
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: nappaliEsti.nappali, label: "nappali" },
              { id: 1, value: nappaliEsti.esti, label: "esti" },
            ],
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        width={400}
        height={200}
      />
      <PieChart
        series={[
          {
            data:
                jelentkezokSzamaSzakokra.map((data, index) => ({
                    id: index,
                    value: data.ennyien,
                    label: data.elnevezes
                  }))
            ,
            
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        width={400}
        height={200}
        legend={{
            display: true,   // A legend bekapcsolása
            position: "right", // Legend jobb oldalra helyezése
          }}
      />
    </div>
  );
}

export default AdminSzakStatisztika;
