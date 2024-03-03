import { fetchDesignated } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/assets/breadcrumbs";
import Form from "@/app/ui/assets/create-form";
import React from "react";
const AssetCreatePage: React.FC = async () => {
  const designated = await fetchDesignated();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Assets", href: "/dashboard/assets" },
          {
            label: "Create Asset",
            href: "/dashboard/assets/create",
            active: true,
          },
        ]}
      />
      <Form designated={designated} />
    </main>
  );
};

export default AssetCreatePage;
