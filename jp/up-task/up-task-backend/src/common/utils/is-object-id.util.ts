import { isValidObjectId } from 'mongoose';

export const isObjectId = (param: string): boolean => {
  return isValidObjectId(param);
};
