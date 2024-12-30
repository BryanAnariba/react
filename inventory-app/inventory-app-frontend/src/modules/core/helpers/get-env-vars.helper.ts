export const getEnvVars = () => {
  import.meta.env;
  return {
    ...import.meta.env,
  }
}