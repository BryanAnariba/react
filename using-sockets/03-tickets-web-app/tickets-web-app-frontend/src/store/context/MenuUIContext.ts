import { createContext } from "react";

export type MenuUIContextInitialState = {
  menu: boolean;
  showMenu: () => void;
  hideMenu: () => void;
};

export const MenuUIContext = createContext({} as MenuUIContextInitialState);
