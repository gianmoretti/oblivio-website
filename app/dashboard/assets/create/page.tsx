import Breadcrumbs from "@/app/ui/common/breadcrumb/breadcrumbs";
import Form from "@/app/ui/asset/create-form";
import React from "react";
const AssetCreatePage: React.FC = async () => {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Asset", href: "/dashboard/asset" },
          {
            label: "Create Asset",
            href: "/dashboard/asset/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
};

export default AssetCreatePage;
