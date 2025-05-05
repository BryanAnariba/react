import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  deleteProject,
  getProjects,
} from "../modules/projects/services/projects.service";
import Loading from "../shared/components/Loading";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["get-projects"],
    queryFn: getProjects,
  });

  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message ? error.message : `${error}`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-projects"] });
      toast.success(`Proyecto ${data?.projectName} se ha eliminado con exito!`);
    },
  });

  if (isLoading) return <Loading />;

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Mis Proyectos</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Maneja y administra tus proyectos
        </p>

        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to={"/projects/create"}
          >
            Nuevo Proyecto
          </Link>
        </nav>

        {data.length > 0 ? (
          <div>
            {data?.map((project) => (
              <ul
                key={project._id}
                role="list"
                className="divide-y divide-gray-100 border border-gray-100 mt-1 bg-white shadow-lg"
              >
                <li
                  key={project._id}
                  className="flex justify-between gap-x-6 px-5 py-10"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto space-y-2">
                      <Link
                        to={`/projects/${project._id}/details`}
                        className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                      >
                        {project.projectName}
                      </Link>
                      <p className="text-sm text-gray-400">
                        Cliente: {project.clientName}
                      </p>
                      <p className="text-sm text-gray-400">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-6">
                    <Menu as="div" className="relative flex-none">
                      <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon
                          className="h-9 w-9"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <Menu.Item>
                            <Link
                              to={`/projects/${project._id}/details`}
                              className="block px-3 py-1 text-sm leading-6 text-gray-900"
                            >
                              Ver Proyecto
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link
                              to={`/projects/${project._id}/edit`}
                              className="block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
                            >
                              Editar Proyecto
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              type="button"
                              className="block px-3 py-1 text-sm leading-6 text-red-500 cursor-pointer"
                              onClick={() => mutate(project._id)}
                            >
                              Eliminar Proyecto
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        ) : (
          <p className="text-center py-20">
            No hay proyectos aun {""}
            <Link
              className="text-fuchsia-500 font-bold"
              to={"/projects/create"}
            >
              Crear Proyecto
            </Link>
          </p>
        )}
      </>
    );
}
