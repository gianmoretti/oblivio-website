import Breadcrumbs from "@/app/ui/common/breadcrumb/breadcrumbs";
import Form from "@/app/ui/asset/edit-form";
import { notFound } from "next/navigation";
import React from "react";
import { fetchAssetById } from '@/app/lib/data';

interface AssetEditPage {
  params: { id: string };
}

const AssetEditPage: React.FC<AssetEditPage> = async ({ params: { id } }) => {
  const asset = await fetchAssetById(id);
  if (!asset) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Asset", href: "/dashboard/asset" },
          {
            label: "Edit Asset",
            href: `/dashboard/asset/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form asset={asset} />
    </main>
  );
};

export default AssetEditPage;
