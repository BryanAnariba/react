import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const hashParam = (param: string): string => {
  const salt = genSaltSync(10);
  return hashSync(param, salt);
};

export const compareHash = (param: string, hashedParam: string): boolean => {
  return compareSync(param, hashedParam);
};
