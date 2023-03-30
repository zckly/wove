import { NextPage } from "next";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";

import SidebarLayout from "~/components/layouts/SidebarLayout";

const Dashboard: NextPage = () => {
  return (
    <div className="h-screen">
      <SidebarLayout>
        <div className="text-center">
          <GearIcon
            className="mx-auto h-12 w-12 text-gray-400"
            aria-hidden="true"
          />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            Nothing here yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            ...besides a lowly logout button.
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                void signOut();
              }}
              type="button"
              className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <ExitIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Dashboard;
