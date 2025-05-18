import { z } from "zod";
import { TaskSchema, TasksResponseSchema } from "../schemas";

export type Task = z.infer<typeof TaskSchema>;
export type Tasks = z.infer<typeof TasksResponseSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
