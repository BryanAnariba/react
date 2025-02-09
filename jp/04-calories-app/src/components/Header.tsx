import { useMemo } from "react";
import { ActivityActions, ActivityState } from "../reducers/activity.reducers";

interface HeaderProps {
  state: ActivityState;
  dispatch: React.Dispatch<ActivityActions>;
}

export function Header({ state, dispatch }: HeaderProps): JSX.Element {
  const canClearActivities = useMemo(
    () => state.activities.length > 0,
    [state.activities]
  );

  const clearActivities = () => {
    dispatch({ type: "delete-all-activities" });
  };

  return (
    <header className="bg-lime-600 py-3">
      <div className="max-w-4xl mx-auto flex justify-between">
        <h1 className="text-center text-lg font-bold text-white uppercase">
          Calories Counter
        </h1>

        <button
          className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-60"
          onClick={clearActivities}
          disabled={!canClearActivities}
        >
          Clear all activities
        </button>
      </div>
    </header>
  );
}
