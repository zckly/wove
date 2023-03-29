import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { WorkflowBlock, WorkflowBlockRun } from "@prisma/client";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

import { api } from "~/utils/api";

export default function WorkflowBlockCard({
  block,
}: {
  block: WorkflowBlock & {
    runs: WorkflowBlockRun[];
  };
}) {
  const utils = api.useContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(block.name);
  const [prompt, setPrompt] = useState<string>(block.description || "");
  const [logsHidden, setLogsHidden] = useState<boolean>(false);

  const { mutate: deleteBlock } = api.workflowBlock.delete.useMutation({
    async onSuccess() {
      await utils.workflow.invalidate();
    },
  });
  const { mutate: updateBlock } = api.workflowBlock.update.useMutation({
    async onSuccess() {
      await utils.workflow.invalidate();
    },
  });

  const lastRun = block.runs[block.runs.length - 1];

  return (
    <div className="shadow-md rounded-lg bg-white border border-stone-50">
      <div className="bg-white px-4 py-5 sm:px-6">
        <div className="flex space-x-3">
          <div className="min-w-0 flex-1">
            {isEditing ? (
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            ) : (
              <p className="text-lg font-semibold text-gray-900">
                {block.name}
              </p>
            )}
          </div>
          <div className="flex flex-shrink-0 self-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                {isEditing ? (
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      updateBlock({
                        blockId: block.id,
                        name: nameInput,
                        description: prompt,
                      });
                      setIsEditing(false);
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                )}
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                          className={clsx(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex px-4 py-2 text-sm w-full",
                          )}
                        >
                          <PencilIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Edit</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteBlock(block.id);
                          }}
                          className={clsx(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex px-4 py-2 text-sm w-full",
                          )}
                        >
                          <XMarkIcon className="mr-3 h-5 w-5 text-gray-400" />
                          <span>Delete</span>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="py-4">
          {isEditing ? (
            <textarea
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          ) : (
            <ReactMarkdown className="text-gray-600">
              {block.description || "No prompt"}
            </ReactMarkdown>
          )}
        </div>
        <div>
          <button
            type="button"
            className="flex items-start text-gray-400 hover:text-gray-600 -ml-1"
            onClick={() => setLogsHidden(!logsHidden)}
          >
            {logsHidden ? (
              <>
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 text-sm">Show logs</span>
              </>
            ) : (
              <>
                <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 text-sm">Hide logs</span>
              </>
            )}
          </button>
        </div>
        {lastRun && !logsHidden && (
          <div className="pt-4">
            <div className="flex flex-col gap-y-4">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="my-2 text-gray-900 text-lg font-semibold"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="text-gray-700 my-1 text-sm font-text"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-gray-600 my-1 text-sm" {...props} />
                  ),
                }}
                className="text-gray-600"
              >
                {lastRun.logs || ""}
              </ReactMarkdown>
              <p className="text-gray-600 text-sm">
                Last run:{" "}
                {lastRun.startedAt?.toLocaleTimeString() ?? "Missing date"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
