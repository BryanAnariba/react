import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Project, ProjectFormData } from "../types";
import CreateProjectForm from "./CreateProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProject } from "../services/projects.service";
import { toast } from "react-toastify";

export type EditProjectFormProps = {
  projectFormData: ProjectFormData;
  projectId: Project["_id"];
};

export default function EditProjectForm({
  projectFormData,
  projectId,
}: EditProjectFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: projectFormData.projectName,
      clientName: projectFormData.clientName,
      description: projectFormData.description,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editProject,
    onError: (error) => {
      toast.success(`Error ${error.message ? error.message : error}!`);
    },
    onSuccess: (data) => {
      navigate("/");
      // Quitando el cache para que se ejecute de nuevo, haciendo un refetch o cargando de nuevo la info de estas apis
      queryClient.invalidateQueries({ queryKey: ["get-projects"] });
      queryClient.invalidateQueries({ queryKey: ["edit-project", projectId] });
      toast.success(`Proyecto ${data?.clientName} actualizado exitosamente!`);
    },
  });

  const handleEditForm = (projectFormData: ProjectFormData) => {
    const formData = { projectFormData: projectFormData, projectId: projectId };
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-5xl font-black">Editar Proyecto</h1>
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
        onSubmit={handleSubmit(handleEditForm)}
        noValidate
      >
        <CreateProjectForm register={register} errors={errors} />

        <input
          type="submit"
          value={"Guardar Cambios"}
          className="bg-fuchsia-500 hover:bg-fuchsia-600 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
        />
      </form>
    </>
  );
}
