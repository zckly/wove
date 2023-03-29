import { NextPage } from "next";

import WorkflowTable from "~/components/dashboard/WorkflowTable";
import SidebarLayout from "~/components/layouts/SidebarLayout";

const Dashboard: NextPage = () => {
  return (
    <div className="h-screen">
      <SidebarLayout>
        <WorkflowTable />
      </SidebarLayout>
    </div>
  );
};

export default Dashboard;
