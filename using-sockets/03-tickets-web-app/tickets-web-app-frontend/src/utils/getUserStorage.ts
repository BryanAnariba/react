export const getUserStorage = () => {
  return {
    agent: localStorage.getItem("ticket-web-app-agent") || null,
    desktop: localStorage.getItem("ticket-web-app-desktop") || null,
  };
};
