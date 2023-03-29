import { Workflow } from "@wove/db";

import { api } from "~/utils/api";

export default function WorkflowPageHeader({
  workflow,
}: {
  workflow: Workflow;
}) {
  const utils = api.useContext();

  const { mutate: runWorkflow, isLoading } = api.workflowRun.create.useMutation(
    {
      async onSuccess() {
        await utils.workflow.byId.invalidate();
      },
    },
  );

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
          <h1 className="text-2xl font-bold text-gray-900">{workflow.name}</h1>
          <p className="text-sm font-medium text-gray-500">
            Average run time: <span className="text-gray-900">8m 30s.</span>{" "}
            Last run: <span className="text-gray-900">2 hours ago</span>. Next
            run: <span className="text-gray-900">in 3 hours</span>
          </p>
        </div>
      </div>
    </div>
  );
}
