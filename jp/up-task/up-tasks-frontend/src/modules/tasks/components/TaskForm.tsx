import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TaskFormData } from "../types";
import ErrorMessage from "../../../shared/components/ErrorMessage";

export type TaskFormProps = {
  register: UseFormRegister<TaskFormData>;
  errors: FieldErrors<TaskFormData>;
};

export default function TaskForm({ register, errors }: TaskFormProps) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <label htmlFor="name" className="font-normal text-2xl">
          Nombre de la tarea:{" "}
        </label>
        <input
          type="text"
          id="name"
          placeholder="Nombre de la tarea"
          className="w-full p-3 border-gray-300 border"
          {...register("name", { required: "El Nombre de la tarea es requerida" })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div className="flex flex-col gap-5">
        <label htmlFor="description" className="font-normal text-2xl">
          Descripcion de la tarea:{" "}
        </label>
        <textarea
          id="description"
          placeholder="Descripcion de la tarea"
          className="w-full p-3 border-gray-300 border"
          {...register('description', { required: 'La Descripcion de la tarea es requerida' })}
        ></textarea>
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
