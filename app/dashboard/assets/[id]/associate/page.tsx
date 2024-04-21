import Breadcrumbs from "@/app/ui/common/breadcrumb/breadcrumbs";
import Form from "@/app/ui/asset/associate-with-designated-form";
import { notFound } from "next/navigation";
import React from "react";
import { fetchAllDesignated, fetchEnrichedAssetById } from '@/app/lib/data';

interface AssociateAssetToDesignatedPageProps {
  params: { id: string };
}

const AssociateAssetToDesignatedPage: React.FC<AssociateAssetToDesignatedPageProps> = async ({ params: { id } }) => {
  const asset = await fetchEnrichedAssetById(id);
  if (!asset) {
    notFound();
  }
  const possibleDesignated = await fetchAllDesignated();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Asset", href: "/dashboard/assets" },
          {
            label: "Associate Asset to Designated",
            href: `/dashboard/assets/${id}/associate`,
            active: true,
          },
        ]}
      />
      <Form asset={asset} possibleDesignated={possibleDesignated}/>
    </main>
  );
};

export default AssociateAssetToDesignatedPage;
