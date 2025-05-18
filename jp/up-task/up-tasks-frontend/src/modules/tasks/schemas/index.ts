import { z } from "zod";

export enum TaskStatus {
  PENDING = "PENDING",
  ON_HOLD = "ON_HOLD",
  IN_PROGRESS = "IN_PROGRESS",
  UNDER_REVIEW = "UNDER_REVIEW",
  COMPLETED = "COMPLETED",
}

export const TaskStatusSchema = z.enum([
  TaskStatus.COMPLETED,
  TaskStatus.IN_PROGRESS,
  TaskStatus.ON_HOLD,
  TaskStatus.PENDING,
  TaskStatus.UNDER_REVIEW,
]);

export const TaskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: TaskStatusSchema,
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const TasksResponseSchema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchema,
    isActive: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
);
