/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import Spinner from "../primitives/Spinner";

export default function WorkflowTable() {
  const { data: teamData, status: teamStatus } = api.team.activeTeam.useQuery();
  const {
    data: workflows,
    status: workflowsStatus,
    refetch,
  } = api.workflow.all.useQuery();
  const { mutateAsync: createWorkflow } = api.workflow.create.useMutation();
  const { mutate: deleteWorkflow } = api.workflow.delete.useMutation({
    async onSuccess() {
      await refetch();
    },
  });

  const router = useRouter();

  const handleCreateWorkflow = async () => {
    const workflow = await createWorkflow({
      name: "My new workflow",
      teamId: teamData?.id || "",
    });

    await router.push(`/workflows/${workflow.id}`);
  };

  if (teamStatus !== "success" || workflowsStatus !== "success") {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Workflows
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all of your AI-powered workflows.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={(e) => {
              e.preventDefault();
              void handleCreateWorkflow();
            }}
            type="button"
            className="block rounded-md bg-gigas-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-gigas-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gigas-600"
          >
            Create workflow
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Runs
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {workflows.map((workflow) => (
                  <tr key={workflow.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-6 w-6 flex-shrink-0">
                          <img
                            className="h-6 w-6 rounded-full mx-auto"
                            src={
                              "https://em-content.zobj.net/thumbs/240/apple/354/light-bulb_1f4a1.png"
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900 hover:underline">
                            <Link href={`/workflows/${workflow.id}`}>
                              {workflow.name}
                            </Link>
                          </div>
                          <div className="text-gray-500">
                            {workflow.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {workflow.blocks.length} blocks
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {workflow.runs.length} runs
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        Active
                      </span>
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Link
                        href={`/workflows/${workflow.id}`}
                        className="text-gigas-600 hover:text-gigas-900"
                      >
                        Edit
                      </Link>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteWorkflow(workflow.id);
                        }}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
