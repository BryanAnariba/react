import { SubmitHandler, useForm } from "react-hook-form";
import { DraftPatient } from "../interfaces/patients.interfaces";
import { usePatientStore } from "../store/store";
import { useEffect } from "react";
import Error from "./Error";
import { toast } from "react-toastify";

export default function PatientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DraftPatient>();

  const patients = usePatientStore((state) => state.patients);
  const addPatient = usePatientStore((state) => state.addPatient);
  const updatePatient = usePatientStore((state) => state.updatePatient);
  const activeId = usePatientStore((state) => state.activeId);

  const registerPatients: SubmitHandler<DraftPatient> = (data): void => {
    if (activeId.trim().length > 0) {
      updatePatient(data);
      toast("Paciente actualizado correctamente", {
        type: "success",
      });
    } else {
      addPatient(data);
      toast("Paciente registrado correctamente", {
        type: "success",
      });
    }
    reset();
  };

  useEffect(() => {
    if (activeId.trim().length > 0) {
      const activePatient = patients.filter(
        (patient) => patient.id === activeId
      )[0];
      // console.log(activePatient);
      setValue("name", activePatient.name);
      setValue("caretaker", activePatient.caretaker);
      setValue("date", activePatient.date);
      setValue("email", activePatient.email);
      setValue("symptoms", activePatient.symptoms);
    } else {
      reset();
    }
  }, [activeId]);

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Agrega pacientes y {""}
        <span className="text-indigo-600">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit(registerPatients)}
        noValidate
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente:{" "}
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-100"
            id="name"
            placeholder="Nombre del paciente"
            {...register("name", {
              required: "El nombre del paciente es obligatorio",
              maxLength: {
                value: 80,
                message: "El nombre debe ser menor de 8 caracteres",
              },
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>
        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario:{" "}
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-100"
            id="caretaker"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El propietario es obligatorio",
              maxLength: {
                value: 80,
                message: "Debe ser menor de 80 caracteres",
              },
            })}
          />
          {errors.caretaker && (
            <Error>{errors.caretaker?.message?.toString()}</Error>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email:{" "}
          </label>
          <input
            type="email"
            className="w-full p-3 border border-gray-100"
            id="email"
            placeholder="Email de registro"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email no valido",
              },
            })}
          />
          {errors.email && <Error>{errors.email?.message?.toString()}</Error>}
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta:{" "}
          </label>
          <input
            type="date"
            className="w-full p-3 border border-gray-100"
            id="date"
            {...register("date", {
              required: "La fecha es alta es requerida",
            })}
          />
          {errors.date && <Error>{errors.date?.message?.toString()}</Error>}
        </div>
        <div className="nb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Sintomas:{" "}
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3 border border-gray-100"
            placeholder="Sintomas del paciente"
            {...register("symptoms", {
              required: "Los sintomas son obligatorios",
              minLength: {
                value: 3,
                message: "Debe tener al menos un sintoma",
              },
            })}
          ></textarea>
          {errors.symptoms?.message && (
            <Error>{errors.symptoms?.message?.toString()}</Error>
          )}
        </div>

        <input
          type="submit"
          value="Guardar Paciente"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        />
      </form>
    </div>
  );
}
