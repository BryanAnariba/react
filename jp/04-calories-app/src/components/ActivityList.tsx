import { useMemo } from "react";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Activity } from "../interfaces/activity.interface";
import { categories } from "../constants/category.constants";
import { ActivityActions } from "../reducers/activity.reducers";

interface ActivityListProps {
  activities: Activity[];
  dispatch: React.Dispatch<ActivityActions>;
}

export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps): JSX.Element {

  const isEmpty = useMemo(() => activities.length === 0, [activities]);

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    []
  );

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-400 text-center">
        Meals and Activities
      </h2>

      { isEmpty ? (
        <p className="text-center">Activities not found yet</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 py-10 bg-white mt-5 flex justify-between"
          >
            <div className="space-y-2 relative">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                  activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p className="font-black text-4xl text-lime-500">
                {activity.calories} {""}
                <span>Calories</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                className="cursor-pointer"
                onClick={() =>
                  dispatch({
                    type: "set-active-id",
                    payload: { id: activity.id },
                  })
                }
              >
                <PencilSquareIcon className="h-8 w-8 text-gray-900" />
              </button>

              <button
                className="cursor-pointer"
                onClick={() =>
                  dispatch({
                    type: "delete-activity-by-id",
                    payload: { id: activity.id },
                  })
                }
              >
                <XCircleIcon className="h-8 w-8 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
