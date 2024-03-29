import { useState } from "react";
import { LightningBoltIcon, StopwatchIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { Workflow } from "@wove/db";

import { api } from "~/utils/api";
import Breadcrumbs from "../dashboard/Breadcrumbs";
import Spinner from "../primitives/Spinner";

const navigation = [
  {
    name: "Agents",
    href: "#",
    icon: LightningBoltIcon,
    current: false,
  },
  {
    name: "Triggers",
    href: "#",
    icon: StopwatchIcon,
    current: false,
  },
];

export default function WorkflowLayout({
  children,
  workflow,
  showAllLogs,
}: {
  children: React.ReactNode;
  workflow: Workflow;
  showAllLogs: () => void;
}) {
  const utils = api.useContext();
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);
  const { mutate: runWorkflow, isLoading } = api.workflowRun.create.useMutation(
    {
      async onSuccess() {
        toast.success("Run completed successfully!");

        // TODO: Right now this line isn't working because i'm a dumdum
        showAllLogs();

        await utils.workflow.byId.invalidate();
      },
    },
  );

  return (
    <>
      <div className="flex min-h-full flex-col">
        <header className="shrink-0 border-b border-gray-200 bg-white">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              pages={[
                {
                  name: "Workflows",
                  href: "/",
                  current: false,
                },
              ]}
            />
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
          <main className="flex-1">{children}</main>

          <aside className="sticky top-8 hidden w-96 shrink-0 xl:block">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              {/* Activity Feed */}
              <div className="mt-6 flow-root">
                <nav className="space-y-1" aria-label="Sidebar">
                  {navigation.map((item, i) => (
                    <a
                      onClick={() => {
                        setActiveNavIndex(i);
                      }}
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={clsx(
                          item.current
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "-ml-1 mr-3 h-6 w-6 flex-shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
              {typeof activeNavIndex === "number" ? (
                <div className="mt-6">
                  {activeNavIndex === 0 ? (
                    <div className="flex flex-col gap-y-2">
                      Agents aren&apos;t ready yet. Stay tuned!
                    </div>
                  ) : (
                    <div className="flex flex-col gap-y-2">
                      Triggers aren&apos;t ready yet. Stay tuned!
                    </div>
                  )}
                </div>
              ) : null}
              <div className="justify-stretch mt-6 flex flex-col">
                <div className="flex flex-row gap-x-2 w-full">
                  <button
                    type="button"
                    disabled
                    className="disabled:bg-gray-200 disabled:cursor-not-allowed w-1/2 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Schedule Run
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toast("Running workflow... (this may take a while)");
                      runWorkflow({ workflowId: workflow.id });
                    }}
                    type="button"
                    disabled={isLoading}
                    className="disabled:bg-gigas-800 w-1/2 inline-flex items-center justify-center rounded-md bg-gigas-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gigas-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gigas-600"
                  >
                    {isLoading ? (
                      <div className="w-full flex justify-center items-center">
                        <Spinner />
                      </div>
                    ) : (
                      "Run now"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
