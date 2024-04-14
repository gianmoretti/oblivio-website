import { fetchDesignated, fetchDesignatedById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/designated/breadcrumbs";
import Form from "@/app/ui/designated/edit-form";
import { notFound } from "next/navigation";
import React from "react";

interface DesignatedEditPage {
  params: { id: string };
}

const DesignatedEditPage: React.FC<DesignatedEditPage> = async ({ params: { id } }) => {
  const designated = await fetchDesignatedById(id);
  if (!designated) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Designated", href: "/dashboard/designated" },
          {
            label: "Edit Designated",
            href: `/dashboard/designated/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form designated={designated} />
    </main>
  );
};

export default DesignatedEditPage;
