import { useContext } from "react";
import AdminSzakStatisztika from "../components/admin/admin_statisztika/AdminSzakStatisztika";
import AdminJelentkezoStatisztika from "../components/admin/admin_statisztika/AdminJelentkezoStatisztika";
import { SegmentedControl, Text } from '@mantine/core';
import { AdminSzakStatisztikaContext } from "../context/admin/AdminSzakStatisztikaContext";

function AdminStatisztika() {

  const { statisztikaOldal, oldalValtas } = useContext(AdminSzakStatisztikaContext)
  return (
    <div className="pt-24">
      <div className="w-full flex justify-center ">
        <div className="w-max">
          <Text className="text-center" size="sm" fw={500} mt="md">
            Statisztika
          </Text>

          <SegmentedControl
            value={statisztikaOldal}
            onChange={oldalValtas}
            data={['Szakokra', 'Jelentkezőkre']}
            transitionDuration={500}
            transitionTimingFunction="linear"
          />
        </div>
      </div>
      {statisztikaOldal==="Szakokra" ? <AdminSzakStatisztika /> : <AdminJelentkezoStatisztika />}

    </div>

  );
}

export default AdminStatisztika;
