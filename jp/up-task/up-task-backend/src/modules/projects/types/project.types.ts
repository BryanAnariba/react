import { Document } from 'mongoose';

export type ProjectType = Document & {
  projectName: string;
  clientName: string;
  description: string;
};
