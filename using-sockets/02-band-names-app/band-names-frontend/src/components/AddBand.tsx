import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export default function AddBand() {

  const {socket} = useContext(SocketContext);

  const [band, setBand] = useState<string>("");
  const onAddBand = (e: React.FormEvent) => {
    e.preventDefault();
    if (band.trim().length === 0) return;

    socket.emit("on-add-new-band", { name: band });
    setBand("");
  };

  return (
    <>
      <h3>Add Band</h3>

      <form onSubmit={onAddBand}>
        <input
          type="text"
          name=""
          id=""
          className="form-control"
          placeholder="Band Name..."
          value={band}
          onChange={(e) => setBand(e.target.value)}
        />
      </form>
    </>
  );
}
