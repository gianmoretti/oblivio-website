import { fetchDesignated } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/designated/breadcrumbs";
import Form from "@/app/ui/designated/create-form";
import React from "react";
const AssetCreatePage: React.FC = async () => {
  const designated = await fetchDesignated();
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
      <Form designated={designated} />
    </main>
  );
};

export default AssetCreatePage;
