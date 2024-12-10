import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export const encrypt = (param: string): string => {
  const salt: string = genSaltSync(10);
  return hashSync(param, salt);
}

export const compareParams = (param: string, hashedParam: string): boolean => {
  return compareSync(param, hashedParam);
}