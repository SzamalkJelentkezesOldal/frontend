import AdminFelvesz from "../components/admin/admin_ugyintezok/AdminSzakFelvesz";
import AdminTablazat from "../components/admin/admin_ugyintezok/AdminSzakTablazat";

function AdminSzakok() {
  return (
    <div>
      <AdminSzakFelvesz />
      <AdminSzakTablazat />
    </div>
  );
}

export default AdminSzakok;
