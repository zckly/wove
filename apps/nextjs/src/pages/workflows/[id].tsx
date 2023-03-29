import { Fragment } from "react";
import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/20/solid";

import { api } from "~/utils/api";
import WorkflowBlockCard from "~/components/dashboard/WorkflowBlockCard";
import WorkflowPageHeader from "~/components/dashboard/WorkflowPageHeader";
import WorkflowLayout from "~/components/layouts/WorkflowLayout";

const WorkflowPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: workflow,
    status: workflowStatus,
    refetch,
  } = api.workflow.byId.useQuery(id as string, {
    refetchOnWindowFocus: false,
  });

  const { mutate: createBlock } = api.workflowBlock.create.useMutation({
    async onSuccess() {
      await refetch();
    },
  });

  if (workflowStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (workflowStatus === "error" || !workflow) {
    return <div>Error!</div>;
  }

  return (
    <WorkflowLayout workflow={workflow}>
      <div className="pb-12">
        <WorkflowPageHeader workflow={workflow} />
      </div>
      <ul className="flex flex-col gap-y-4">
        {workflow?.blocks?.map((block) => (
          <Fragment key={block.id}>
            <WorkflowBlockCard key={block.id} block={block} />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  createBlock({
                    workflowId: workflow.id,
                  });
                }}
                className="rounded-full border border-indigo-600 p-1.5 text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </Fragment>
        ))}
      </ul>
    </WorkflowLayout>
  );
};

export default WorkflowPage;
