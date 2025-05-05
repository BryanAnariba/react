import { z } from "zod";
import { ProjectSchema } from "../schemas";

export type Project = z.infer<typeof ProjectSchema>;

export type ProjectFormData = Pick<
  Project,
  "clientName" | "description" | "projectName"
>;
