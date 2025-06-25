import { isAxiosError } from "axios";
import { api } from "../../../shared/api/axios.api";
import { Project, ProjectFormData } from "../types";
import { ProjectSchema, ProjectsResponseSchema } from "../schemas";
import { EditProjectFormProps } from "../components/EditProjectForm";

export async function createProject(
  projectFormData: ProjectFormData
): Promise<Project> {
  try {
    const { data } = await api.post("/projects", projectFormData);
    return data as Project;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data["message"]);
    throw new Error(`${error}`);
  }
}

export async function getProjects() {
  
  try {
    const { data } = await api.get("/projects");
    const response = ProjectsResponseSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data["message"]);
    throw new Error(`${error}`);
  }
}

export async function getProject(projectId: string) {
  try {
    const { data } = await api.get(`/projects/${projectId}`);
    const response = ProjectSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data["message"]);
    throw new Error(`${error}`);
  }
}

export async function editProject({
  projectId,
  projectFormData,
}: EditProjectFormProps) {
  try {
    const { data } = await api.patch(`/projects/${projectId}`, projectFormData);
    const response = ProjectSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data["message"]);
    throw new Error(`${error}`);
  }
}

export async function deleteProject(projectId: string) {
  try {
    const { data } = await api.delete(`/projects/${projectId}`);
    const response = ProjectSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data["message"]);
    throw new Error(`${error}`);
  }
}
