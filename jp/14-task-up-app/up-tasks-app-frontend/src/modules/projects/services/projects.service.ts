import { isAxiosError } from "axios";
import type { Project, ProjectFormData } from "../types";
import api from "../../../shared/api/axios.,api";
import { DashboardProjectSchema } from "../schemas";

export async function createProject(projectFormData: ProjectFormData) {
  try {
    const { data } = await api.post<Project>(`/projects`, projectFormData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data["message"]);
    throw new Error(`${error}`);
  }
}

export async function getProjects() {
  try {
    const { data } = await api.get<Project[]>("/projects");
    const response = DashboardProjectSchema.safeParse(data);
    if (response.error) throw new Error(response.error.message);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data["message"]);
    throw new Error(`${error}`);
  }
}
