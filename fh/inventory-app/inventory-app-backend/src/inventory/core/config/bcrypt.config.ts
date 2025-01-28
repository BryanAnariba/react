import { compareSync, genSaltSync, hashSync } from "bcryptjs"

export const encrypt = (param: string): string => {
  const salt = genSaltSync(10);
  return hashSync(param, salt);
}

export const isMatch = (param: string, hashedParam: string): boolean => {
  return compareSync(param, hashedParam);
}