import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import WorkflowBlockCard from "~/components/dashboard/WorkflowBlockCard";
import WorkflowPageHeader from "~/components/dashboard/WorkflowPageHeader";
import WorkflowLayout from "~/components/layouts/WorkflowLayout";
import Spinner from "~/components/primitives/Spinner";

const WorkflowPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [logsHiddenBlocks, setLogsHiddenBlocks] = useState<boolean[]>([]);

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

  useEffect(() => {
    // Set logsHiddenBlocks to the correct length of blocks
    if (workflow?.blocks) {
      setLogsHiddenBlocks(Array(workflow.blocks.length).fill(true));
    }
  }, [workflow?.blocks]);

  if (workflowStatus === "loading") {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (workflowStatus === "error" || !workflow) {
    return <div>Error!</div>;
  }

  return (
    <WorkflowLayout
      workflow={workflow}
      showAllLogs={() => {
        setLogsHiddenBlocks((prev) => {
          const newLogsHiddenBlocks = [...prev];
          newLogsHiddenBlocks.forEach((_, i) => {
            newLogsHiddenBlocks[i] = false;
          });
          return newLogsHiddenBlocks;
        });
      }}
    >
      <div className="pb-12">
        <WorkflowPageHeader workflow={workflow} />
      </div>
      <div>
        {/* Buttons for expanding and collapsing all logs */}
        <div className="flex justify-end gap-x-1">
          <button
            type="button"
            onClick={() => {
              setLogsHiddenBlocks(Array(workflow.blocks.length).fill(false));
            }}
            className="rounded-full border border-gigas-600 py-1 px-1.5 text-gigas-600 shadow-sm hover:bg-gigas-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gigas-600 text-xs"
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={() => {
              setLogsHiddenBlocks(Array(workflow.blocks.length).fill(true));
            }}
            className="rounded-full border border-gigas-600 py-1 px-1.5 text-gigas-600 shadow-sm hover:bg-gigas-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gigas-600 text-xs"
          >
            Collapse all
          </button>
        </div>
      </div>
      <ul className="flex flex-col gap-y-4">
        {workflow?.blocks?.map((block, i) => (
          <Fragment key={block.id}>
            <WorkflowBlockCard
              key={block.id}
              block={block}
              logsHidden={
                logsHiddenBlocks.length
                  ? (logsHiddenBlocks[i] as boolean)
                  : true
              }
              setLogsHidden={(hidden: boolean) => {
                const newLogsHiddenBlocks = [...logsHiddenBlocks];
                newLogsHiddenBlocks[i] = hidden;
                setLogsHiddenBlocks(newLogsHiddenBlocks);
              }}
            />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  createBlock({
                    workflowId: workflow.id,
                    prevOrder: block.order,
                  });
                  toast.success("Block created");
                }}
                className="rounded-full border border-gigas-600 p-1.5 text-gigas-600 shadow-sm hover:bg-gigas-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gigas-600"
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
