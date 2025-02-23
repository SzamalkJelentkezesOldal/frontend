import AdminJelentkezokKereses from "../components/admin/admin_jelentkezok/AdminJelentkezokKereses";
import AdminJelentkezokTabla from "../components/admin/admin_jelentkezok/AdminJelentkezokTabla";

function AdminJelentkezok() {
  return (
    <div className="pt-24">
      <AdminJelentkezokKereses />
      <AdminJelentkezokTabla />
    </div>
  );
}

export default AdminJelentkezok;
