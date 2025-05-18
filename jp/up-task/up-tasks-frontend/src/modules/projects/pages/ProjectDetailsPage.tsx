import { useQuery } from "@tanstack/react-query";
import { getProject } from "../services/projects.service";
import { Navigate, useNavigate, useParams } from "react-router";
import Loading from "../../../shared/components/Loading";
import AddTaskModal from "../../tasks/components/AddTaskModal";
import TaskList from "../../tasks/components/TaskList";
import EditTaskData from "../../tasks/components/EditTaskData";
import TaskModalDetails from "../../tasks/components/TaskModalDetails";

export default function ProjectDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId: string = params.projectId!;

  const { isLoading, isError, data } = useQuery({
    queryKey: ["edit-project", projectId],
    queryFn: () => getProject(projectId),
    retry: false,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Navigate to={"/"} />;
  if (data)
    return (
      <>
        <h1 className="text-5xl font-bold">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>

        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            onClick={() => navigate('?newTask=true')}
          >
            Agregar
          </button>
        </nav>
        <TaskList />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
