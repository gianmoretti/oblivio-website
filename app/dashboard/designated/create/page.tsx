import Breadcrumbs from "@/app/ui/common/breadcrumb/breadcrumbs";
import Form from "@/app/ui/designated/create-form";
import React from "react";
const AssetCreatePage: React.FC = async () => {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Designated", href: "/dashboard/designated" },
          {
            label: "Create Designated",
            href: "/dashboard/designated/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
};

export default AssetCreatePage;
