import { useContext } from "react";
import { AdminJelentkezokContext } from "../../../context/admin/AdminJelentkezokContext";
import React from "react";

const AdminJelentkezokTabla = () => {
  const {
    table,
    flexRender,
    loading,
    columns,
    data,
    setPageIndex,
    setPageSize,
    pageCount,
    pageIndex,
    pageSize,
  } = useContext(AdminJelentkezokContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div className="p-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white">
            {table.getRowModel().rows.map((row) => (
              // Minden sort egy React.Fragmentbe csomagolunk, hogy utána opcionálisan kibontott tartalmat is rendereljünk.
              <React.Fragment key={row.id}>
                <tr className="border-b border-gray-200">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 border border-gray-300 text-sm text-gray-600"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td colSpan={columns.length} className="bg-gray-50 p-6">
                      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                          Jelentkező Részletes Adatai
                        </h3>
                        {/* Alapadatok */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-800">
                              Név:
                            </span>{" "}
                            {row.original.nev}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-800">
                              Email:
                            </span>{" "}
                            {row.original.email}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-800">
                              Státusz:
                            </span>{" "}
                            {row.original.status}
                          </p>
                        </div>

                        {/* Személyes adatok (torzsadatok) */}
                        {row.original.torzsadatok && (
                          <div className="mt-6 border-t pt-4">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">
                              Személyes Adatok
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">
                                  Vezetéknév:
                                </span>{" "}
                                {row.original.torzsadatok.vezeteknev}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">
                                  Keresztnév:
                                </span>{" "}
                                {row.original.torzsadatok.keresztnev}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">
                                  Adóazonosító:
                                </span>{" "}
                                {row.original.torzsadatok.adoazonosito}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">
                                  Lakcím:
                                </span>{" "}
                                {row.original.torzsadatok.lakcim}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">
                                  TAJ szám:
                                </span>{" "}
                                {row.original.torzsadatok.taj_szam}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">
                                  Születési hely:
                                </span>{" "}
                                {row.original.torzsadatok.szuletesi_hely}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">
                                  Születési név:
                                </span>{" "}
                                {row.original.torzsadatok.szuletesi_nev}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">
                                  Születési dátum:
                                </span>{" "}
                                {row.original.torzsadatok.szuletesi_datum}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">
                                  Állampolgárság:
                                </span>{" "}
                                {row.original.torzsadatok.allampolgarsag}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">
                                  Anyja neve:
                                </span>{" "}
                                {row.original.torzsadatok.anyja_neve}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Dokumentumok */}
                        {row.original.dokumentumok &&
                          row.original.dokumentumok.length > 0 && (
                            <div className="mt-6 border-t pt-4">
                              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                Dokumentumok
                              </h4>
                              <ul className="ml-6">
                                {row.original.dokumentumok.map((doc) => (
                                  <li
                                    key={doc.id}
                                    className="text-sm text-gray-600 mb-3"
                                  >
                                    <p>
                                      <span className="font-medium text-gray-800">
                                        Dokumentum típusa:
                                      </span>{" "}
                                      {doc.dokumentumTipus
                                        ? doc.dokumentumTipus
                                        : "Nincs típus információ"}
                                    </p>
                                    <div className="mt-1">
                                      <div className="flex flex-wrap gap-2 mt-1">
                                        {doc.previewUrls &&
                                          doc.previewUrls.map((url, index) => (
                                            <a
                                              key={index}
                                              href={url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-500 underline text-sm"
                                            >
                                              {`Fájl ${index + 1}`}
                                            </a>
                                          ))}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {/* Jelentkezett szakok */}
                        {row.original.jelentkezesek &&
                          row.original.jelentkezesek.length > 0 && (
                            <div className="mt-6 border-t pt-4">
                              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                Jelentkezett Szakok
                              </h4>
                              <ul className="ml-6">
                                {row.original.jelentkezesek.map((jel) => (
                                  <li
                                    key={jel.id}
                                    className="text-sm text-gray-600"
                                  >
                                    {jel.szak ? (
                                      <span>
                                        <span className="font-medium text-gray-800">
                                          Szak:
                                        </span>{" "}
                                        {jel.szak.elnevezes}
                                      </span>
                                    ) : (
                                      "Nincs szak információ"
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {data.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-2 text-center text-gray-500"
                >
                  Nincs adat.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination vezérlők */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
            disabled={pageIndex === 0}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Előző
          </button>
          <span className="text-sm text-gray-700">
            Oldal <strong>{pageIndex + 1}</strong> /{" "}
            <strong>{pageCount}</strong>
          </span>
          <button
            onClick={() =>
              setPageIndex((old) => Math.min(old + 1, pageCount - 1))
            }
            disabled={pageIndex >= pageCount - 1}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Következő
          </button>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(0); // az oldalváltásnál visszaállunk az első oldalra
            }}
            className="ml-4 p-1 border rounded text-sm"
          >
            {[10, 20, 30].map((size) => (
              <option key={size} value={size}>
                {size} sor
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
};

export default AdminJelentkezokTabla;
