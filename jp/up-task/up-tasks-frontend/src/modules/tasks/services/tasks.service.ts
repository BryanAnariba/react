import { isAxiosError } from "axios";
import { Task, TaskFormData, Tasks } from "../types";
import { api } from "../../../shared/api/axios.api";
import { TaskSchema, TasksResponseSchema } from "../schemas";
import { Project } from "../../projects/types";

export type CreateTaskForm = {
  taskFormData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  status: Task["status"];
};

export async function createTask({
  taskFormData,
  projectId,
}: Pick<CreateTaskForm, "taskFormData" | "projectId">): Promise<Task> {
  try {
    const url: string = `/projects/${projectId}/add-task`;
    const { data } = await api.post(url, taskFormData);
    const response = TaskSchema.safeParse(data);
    if (response.success) return response.data;
    throw new Error(`${response.error}`);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function getProjectTasks(
  projectId: CreateTaskForm["projectId"]
): Promise<Tasks> {
  try {
    const { data } = await api.get(`/projects/${projectId}/all-tasks`);
    const response = TasksResponseSchema.safeParse(data);
    if (response.success) return response.data;
    throw new Error(`${response.error}`);
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data["message"]);
    throw new Error(`${error}`);
  }
}

export async function getTask({
  taskId,
  projectId,
}: Pick<CreateTaskForm, "taskId" | "projectId">): Promise<Task> {
  try {
    const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}`);
    const response = TaskSchema.safeParse(data);
    if (response.success) return response.data;
    throw new Error(`${response.error}`);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function editTask({
  projectId,
  taskId,
  taskFormData,
}: Pick<CreateTaskForm, "projectId" | "taskId" | "taskFormData">) {
  try {
    const { data } = await api.patch(
      `/projects/${projectId}/tasks/${taskId}/edit`,
      taskFormData
    );
    const response = TaskSchema.safeParse(data);
    if (response.success) return response.data;
    throw new Error(`${response.error}`);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function deleteTask({
  taskId,
  projectId,
}: Pick<CreateTaskForm, "taskId" | "projectId">): Promise<Task> {
  try {
    const { data } = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
    const response = TaskSchema.safeParse(data);
    if (response.success) return response.data;
    throw new Error(`${response.error}`);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function changeTaskStatus({
  projectId,
  taskId,
  status,
}: Pick<CreateTaskForm, "projectId" | "taskId" | "status">): Promise<Task> {
  try {
    const { data } = await api.patch(
      `/projects/${projectId}/tasks/${taskId}/change-status`,
      { status }
    );
    const response = TaskSchema.safeParse(data);
    if (response.success) return response.data;
    throw new Error(`${response.error}`);
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data["message"]);
    throw new Error(`${error}`);
  }
}
