import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import { getProject } from "../services/projects.service";
import Loading from "../../../shared/components/Loading";
import EditProjectForm from "../components/EditProjectForm";

export default function EditProjectPage() {
  const params = useParams();
  const projectId = params.projectId!;

  const { isLoading, data, isError } = useQuery({
    queryKey: ["edit-project", projectId],
    queryFn: () => getProject(projectId),
    retry: false,
  });

  if (isLoading) return <Loading />;

  if (isError) return <Navigate to={"/"} />;

  if (data) return <EditProjectForm projectFormData={data} projectId={projectId} />;
}
