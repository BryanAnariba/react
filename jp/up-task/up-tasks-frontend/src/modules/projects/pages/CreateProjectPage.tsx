import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ProjectFormData } from "../types";
import CreateProjectForm from "../components/CreateProjectForm";
import { createProject } from "../services/projects.service";

export default function CreateProjectPage() {
  const initialState = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialState });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.projectName} created successfully!`);
      navigate("/");
    },
  });

  const handleCreateProject = (projectFormData: ProjectFormData) => {
    mutation.mutate(projectFormData);
  };

  return (
    <>
      <h1 className="text-5xl font-black">Crear Proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Llena el siguiente formulario para crear el proyecto
      </p>

      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to={"/"}
        >
          Volver a Proyectos
        </Link>
      </nav>

      <form
        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
        onSubmit={handleSubmit(handleCreateProject)}
        noValidate
      >
        <CreateProjectForm register={register} errors={errors} />

        <input
          type="submit"
          value={"Crear Proyecto"}
          className="bg-fuchsia-500 hover:bg-fuchsia-600 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
        />
      </form>
    </>
  );
}
