import { fetchDesignated, fetchAssetById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/assets/breadcrumbs";
import Form from "@/app/ui/assets/edit-form";
import { notFound } from "next/navigation";
import React from "react";

interface AssetEditPage {
  params: { id: string };
}

const AssetEditPage: React.FC<AssetEditPage> = async ({ params: { id } }) => {
  const [invoice, designated] = await Promise.all([
    fetchAssetById(id),
    fetchDesignated(),
  ]);
  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Assets", href: "/dashboard/assets" },
          {
            label: "Edit Asset",
            href: `/dashboard/assets/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} designated={designated} />
    </main>
  );
};

export default AssetEditPage;
