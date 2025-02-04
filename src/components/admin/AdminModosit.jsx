import { text } from "@cloudinary/url-gen/qualifiers/source";
import { justify } from "@cloudinary/url-gen/qualifiers/textAlignment";
import React, { useState } from "react";

function AdminModosit({ sor,bezaras }) {
  const [name, setName] = useState(sor.name);
  const [email, setEmail] = useState(sor.email);
  const [role, setRole] = useState(sor.role);

  const mentes = () => {
    console.log("Módosított adatok: ", { name, email, role });
    bezaras();
  };

  return (
    <div>
         <h2>Módosítás</h2>
      <form>
        <div>
          <label>Név:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Master:</label>
          <select value={role} onChange={(e) => setRole(parseInt(e.target.value, 10))}>
            <option value={1}>Nem</option>
            <option value={2}>Igen</option>
          </select>
        </div>
        <button type="button" onClick={mentes}>
          Mentés
        </button>
        <button type="button" onClick={bezaras} style={{ marginLeft: "10px" }}>
          Mégse
        </button>
      </form>
    </div>
  );
}

export default AdminModosit;