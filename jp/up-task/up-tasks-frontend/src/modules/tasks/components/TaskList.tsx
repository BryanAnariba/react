import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProjectTasks } from "../services/tasks.service";
import Loading from "../../../shared/components/Loading";
import { Task } from "../types/index";
import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";
import { TaskStatus } from "../schemas";
import { Project } from "../../projects/types";
import { STATUS_TRANLATIONS } from "../../../locales/es";

type GroupedTasks = {
  PENDING: Task[];
  ON_HOLD: Task[];
  IN_PROGRESS: Task[];
  UNDER_REVIEW: Task[];
  COMPLETED: Task[];
};


const STATUS_STYLES: { [key: string]: string } = {
  PENDING: "border-t-slate-500 ",
  ON_HOLD: "border-t-red-500 ",
  IN_PROGRESS: "border-t-blue-500 ",
  UNDER_REVIEW: "border-t-amber-500 ",
  COMPLETED: "border-t-emerald-500 ",
};

export default function TaskList() {
  const params = useParams();
  const projectId: Project['_id'] = params.projectId!;

  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({
    PENDING: [],
    ON_HOLD: [],
    IN_PROGRESS: [],
    UNDER_REVIEW: [],
    COMPLETED: [],
  });

  const { isLoading, data } = useQuery({
    queryKey: ["get-project-tasks", projectId],
    queryFn: () => getProjectTasks(projectId),
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setGroupedTasks({
        PENDING: data!.filter((task) => task.status === TaskStatus.PENDING),
        ON_HOLD: data!.filter((task) => task.status === TaskStatus.ON_HOLD),
        IN_PROGRESS: data!.filter(
          (task) => task.status === TaskStatus.IN_PROGRESS
        ),
        UNDER_REVIEW: data!.filter(
          (task) => task.status === TaskStatus.UNDER_REVIEW
        ),
        COMPLETED: data!.filter((task) => task.status === TaskStatus.COMPLETED),
      });
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (data) {
    return (
      <>
        <h2 className="text-5xl font-black my-10">Tareas</h2>

        <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${STATUS_STYLES[status]}`}>
                {STATUS_TRANLATIONS[status]}
              </h3>
              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => <TaskCard key={task._id} task={task} />)
                )}
              </ul>
            </div>
          ))}
        </div>
      </>
    );
  }
}
