import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Project } from "../../projects/types";
import { changeTaskStatus, getTask } from "../services/tasks.service";
import { Task } from "../types";
import Loading from "../../../shared/components/Loading";
import { toast } from "react-toastify";
import { formatDate } from "../../../shared/utils/date.utils";
import { STATUS_TRANLATIONS } from "../../../locales/es";
import { TaskStatus } from "../schemas";

export default function TaskModalDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: changeTaskStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(
        `Se ha cambiado el estado de la tarea ${data.name} con exito!`
      );

      // Por alguna razon si cambias el status de la tarea no hace un fetch para ver las tareas, conserva el las tareas cargadas anteriormente, eso pasa por que la peticion queda en cache y para eso es esta linea
      queryClient.invalidateQueries({
        queryKey: ["get-project-tasks", projectId],
      });

      // Por alguna razon si cambias el status de la tarea pero das click en ver tarea, conserva el estado anterio, eso pasa por que la peticion queda en cache y para eso es esta linea
      queryClient.invalidateQueries({
        queryKey: ["get-project-task", { taskId, projectId }]
      });
      navigate(location.pathname, { replace: true })
    },
  });

  const queryParams = new URLSearchParams(location.search);

  const taskId: Task["_id"] = queryParams.get("viewTask")!;

  const projectId: Project["_id"] = params.projectId!;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-project-task", { taskId, projectId }],
    queryFn: () => getTask({ taskId, projectId }),
    enabled: !!taskId, // enabled codigo que hace que solo se ejecutara si hay un id guardado
    retry: false,
  });

  const show = taskId ? true : false;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const data = {
      projectId: projectId,
      taskId: taskId,
      status: e.target.value as TaskStatus,
    };
    mutate(data);
  };

  if (isLoading) return <Loading />;

  if (isError) {
    toast.error(error.message, { toastId: "error" });
    return <Navigate to={`/projects/${projectId}/details`} />;
  }

  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className={"relative z-10"}
            onClose={() => navigate(location.pathname, { replace: true })}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed insert-0 bg-black/60" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel
                    className={
                      "w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16"
                    }
                  >
                    <p className="text-sm text-slate-400">
                      Agregada el: {formatDate(data.createdAt)}
                    </p>
                    <p className="text-sm text-slate-400">
                      Ultima Actualizacion: {formatDate(data.updatedAt)}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className={"font-black text-4xl text-slate-600 my-5"}
                    >
                      {data!.name}
                    </Dialog.Title>
                    <p className="text-lg text-slate-500 mb-2">
                      Descripcion: {data.description}
                    </p>
                    <div className="my-5 space-y-3">
                      <label htmlFor="status" className="font-bold">
                        Estado Actual
                      </label>
                      <select
                        name="status"
                        id="status"
                        className="w-full p-3 bg-white border border-gray-300"
                        defaultValue={data.status}
                        onChange={handleChange}
                      >
                        {Object.entries(STATUS_TRANLATIONS).map(
                          ([key, value]) => (
                            <option value={key} key={key}>
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
