export const getEnvVars = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  import.meta.env;
  return {
    ...import.meta.env,
  };
};
