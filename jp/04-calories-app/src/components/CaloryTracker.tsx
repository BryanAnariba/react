import { useMemo } from "react";
import { Activity } from "../interfaces/activity.interface";
import CaloryDisplay from "./CaloryDisplay";

interface CaloryTrackerProps {
  activities: Activity[];
}

export default function CaloryTracker({
  activities,
}: CaloryTrackerProps): JSX.Element {
  const consumedCalories = useMemo(
    () =>
      activities.reduce(
        (totalCaloriesAcum, currentActivity) =>
          currentActivity.category === 1
            ? totalCaloriesAcum + currentActivity.calories
            : totalCaloriesAcum,
        0
      ),
    [activities]
  );

  const burnedCalories = useMemo(
    () =>
      activities.reduce(
        (totalCaloriesAcum, currentActivity) =>
          currentActivity.category === 2
            ? totalCaloriesAcum + currentActivity.calories
            : totalCaloriesAcum,
        0
      ),
    [activities]
  );

  const differenceCalories = useMemo(
    () => consumedCalories - burnedCalories,
    [consumedCalories, burnedCalories]
  );

  return (
    <>
      <h2 className="text-4xl font-bold text-white text-center">
        Calories resume:
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CaloryDisplay text="Consumed" calories={consumedCalories} />
        <CaloryDisplay text="Burned" calories={burnedCalories} />
        <CaloryDisplay text="Difference Calies" calories={differenceCalories} />
      </div>
    </>
  );
}
