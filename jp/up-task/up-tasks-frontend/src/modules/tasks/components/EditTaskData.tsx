import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router";
import { getTask } from "../services/tasks.service";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  const location = useLocation();
  const params = useParams();

  const queryParams = new URLSearchParams(location.search);
  const taskId: string = queryParams.get("editTask")!;
  const projectId: string = params.projectId!;

  const { data, isError } = useQuery({
    queryKey: ["get-project-task", { taskId, projectId }],
    queryFn: () => getTask({ taskId, projectId }),
    retry: false,
    enabled: !!taskId, // enabled codigo que hace que solo se ejecutara si hay un id guardado
  });

  if (isError) return <Navigate to="/" />;
  if (data) return <EditTaskModal data={data} taskId={taskId} />;
}
