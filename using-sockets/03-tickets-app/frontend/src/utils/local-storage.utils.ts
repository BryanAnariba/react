export const getUserStorage = (): {
  agent: string | null;
  desktop: number | null;
} => {
  return {
    agent: localStorage.getItem("agent") || null,
    desktop: +JSON.parse(localStorage.getItem("desktop")!) || 0,
  };
};

export const deleteDataFromLocalStorage = () => {
  localStorage.removeItem("agent");
  localStorage.removeItem("desktop");
};
