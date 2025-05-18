import { v4 as uuid } from 'uuid';

export const setUUID = (): string => {
  return uuid();
};
