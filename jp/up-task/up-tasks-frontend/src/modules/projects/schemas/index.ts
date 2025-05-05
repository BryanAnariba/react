import { z } from "zod";

export const ProjectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export const ProjectsResponseSchema = z.array(
  ProjectSchema.pick({
    _id: true,
    clientName: true,
    projectName: true,
    description: true,
  })
);
