import { createContext, useMemo, useReducer } from "react";
import {
  ActivityActions,
  activityReducer,
  ActivityState,
  initialState,
} from "../reducers/activity.reducers";
import { categories } from "../constants/category.constants";
import { Activity } from "../interfaces/activity.interface";

interface ActivityProviderProps {
  children: React.ReactNode;
}

interface ActivityContextProps {
  state: ActivityState;
  dispatch: React.Dispatch<ActivityActions>;
  consumedCalories: number;
  burnedCalories: number;
  differenceCalories: number;
  isEmpty: boolean;
  categoryName: (category: Activity['category']) => string[];
}

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const isEmpty = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    []
  );

  const consumedCalories = useMemo(
    () =>
      state.activities.reduce(
        (totalCaloriesAcum, currentActivity) =>
          currentActivity.category === 1
            ? totalCaloriesAcum + currentActivity.calories
            : totalCaloriesAcum,
        0
      ),
    [state.activities]
  );

  const burnedCalories = useMemo(
    () =>
      state.activities.reduce(
        (totalCaloriesAcum, currentActivity) =>
          currentActivity.category === 2
            ? totalCaloriesAcum + currentActivity.calories
            : totalCaloriesAcum,
        0
      ),
    [state.activities]
  );

  const differenceCalories = useMemo(
    () => consumedCalories - burnedCalories,
    [consumedCalories, burnedCalories]
  );

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        consumedCalories,
        burnedCalories,
        differenceCalories,
        isEmpty,
        categoryName
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
