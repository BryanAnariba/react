import { Document, PopulatedDoc } from 'mongoose';
import { ITask } from 'src/modules/tasks/interfaces/tasks.interface';

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[];
};

// export interface SearchProjectBy {

// }
