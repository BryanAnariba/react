import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import ProjectForm from "../components/ProjectForm";
import type { ProjectFormData } from "../types";
import { createProject } from "../services/projects.service";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const initialValues: ProjectFormData = {
  projectName: "",
  clientName: "",
  description: "",
};

export default function CreateProyectView() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(
        `Proyecto ${data.projectName.toLocaleLowerCase()} creado con exito.`
      );
      reset(initialValues);
      navigate("/");
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const onSaveFormData = (data: ProjectFormData) => mutate(data);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para crear un proyecto
        </p>
        <nav className="my-5">
          <Link
            to="/"
            className="bg-purple-400 hover:bg-purple-500 text-white px-10 py-3 text-xl font-bold cursor-pointer transition-colors"
          >
            Volver a proyectos
          </Link>
        </nav>
        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(onSaveFormData)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Crear proyecto"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
