/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Workflow } from "@wove/db";

import { api } from "~/utils/api";

export default function WorkflowPageHeader({
  workflow,
}: {
  workflow: Workflow;
}) {
  const utils = api.useContext();
  const [nameInput, setNameInput] = useState<string>(workflow.name);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { mutate } = api.workflow.update.useMutation({
    async onSuccess() {
      await utils.workflow.all.invalidate();
    },
  });

  return (
    <div className="md:flex md:items-center md:justify-between md:space-x-5">
      <div className="flex space-x-5 items-center">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              className="h-9 w-9 rounded-full"
              src="https://em-content.zobj.net/thumbs/240/apple/354/light-bulb_1f4a1.png"
              alt=""
            />
            <span
              className="absolute inset-0 rounded-full"
              aria-hidden="true"
            />
          </div>
        </div>
        {/*
          Use vertical padding to simulate center alignment when both lines of text are one line,
          but preserve the same layout if the text wraps without making the image jump around.
        */}
        <div className="pt-1.5">
          {isEditing ? (
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="text-2xl font-bold text-gray-900"
            />
          ) : (
            <h1 className="text-2xl font-bold text-gray-900">
              {workflow.name}
            </h1>
          )}
          <p className="text-sm font-medium text-gray-500">
            Average run time: <span className="text-gray-900">8m 30s.</span>{" "}
            Last run: <span className="text-gray-900">2 hours ago</span>. Next
            run: <span className="text-gray-900">in 3 hours</span>
          </p>
        </div>
      </div>
      <div className="mt-3 flex sm:ml-4 sm:mt-0">
        {isEditing ? (
          <button
            onClick={() => {
              mutate({ id: workflow.id, name: nameInput });
              setIsEditing(false);
            }}
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-gigas-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gigas-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gigas-600"
          >
            Create
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
            }}
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Pencil1Icon className="mr-2 h-5 w-5 text-gray-400" />
            Edit name
          </button>
        )}
      </div>
    </div>
  );
}
