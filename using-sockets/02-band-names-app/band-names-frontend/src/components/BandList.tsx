import { useContext, useEffect, useState } from "react";
import type { Band } from "../types/band.types";
import { SocketContext } from "../context/SocketContext";

export default function BandList() {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    socket.on("bands-list-from-server", (bands: Band[]) => {
      setBands(bands);
    });

    // Si se destruye el componente se desconecta, tipo como cuando se cambia de ruta
    return () => {
      socket.off("bands-list-from-server");
    }
  }, [socket]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    // console.log({id, value: e.target.value});
    const newName = e.target.value;
    if (newName.trim().length === 0) return;
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const onPerdioFoco = (id: string, newName: string) => {
    // console.log({id, newName});
    // Emitiendo o disparando el evento socket al backend
    socket.emit("on-change-band", { id: id, name: newName });
  };

  const addRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => socket.emit("on-vote-by-band", band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={band.name}
            onChange={(e) => handleInputChange(e, band.id)}
            onBlur={() => onPerdioFoco(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => socket.emit("on-delete-band", band.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{addRows()}</tbody>
      </table>
    </>
  );
}
