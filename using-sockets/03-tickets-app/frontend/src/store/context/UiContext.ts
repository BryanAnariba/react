import { createContext } from "react";

export type UiContextInitialSate = {
  menu: boolean;
  showMenu: () => void;
  hideMenu: () => void;
};

export const UiContext = createContext({} as UiContextInitialSate);
