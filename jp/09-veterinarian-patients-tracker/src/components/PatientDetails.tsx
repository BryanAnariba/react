import { toast } from "react-toastify";
import { Patient } from "../interfaces/patients.interfaces";
import { usePatientStore } from "../store/store";
import PatientDetailItem from "./PatientDetailItem";

interface PatientDetailsProps {
  patient: Patient;
}

export default function PatientDetails({ patient }: PatientDetailsProps) {
  const { deletePatient, getPatientById } = usePatientStore();

  const handleDelete = (id: string) => {
    deletePatient(id);
    toast("Paciente eliminado correctamente", {
      type: "success",
    });
  };

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="UID" data={patient.id} />
      <PatientDetailItem label="Nombre" data={patient.name} />
      <PatientDetailItem label="Propietario" data={patient.caretaker} />
      <PatientDetailItem label="Email" data={patient.email} />
      <PatientDetailItem label="Fecha Alta" data={patient.date.toString()} />
      <PatientDetailItem label="Sintomas" data={patient.symptoms} />

      <div className="flex justify-between gap-3 mt-10 flex-col gap-3 lg:flex-row">
        <button
          className="py-2 px-10 bg-indigo-400 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
          type="button"
          onClick={() => getPatientById(patient.id)}
        >
          Edit
        </button>
        <button
          className="py-2 px-10 bg-red-400 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          type="button"
          onClick={() => handleDelete(patient.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
