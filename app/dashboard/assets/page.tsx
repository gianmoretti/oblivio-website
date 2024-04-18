import Table from "@/app/ui/designated/table";
import { EntitiesTableSkeleton } from "@/app/ui/common/skeletons/skeletons";
import { Suspense } from "react";
import { CreateAsset } from "@/app/ui/asset/buttons";

const AssetPage: React.FC = async () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Assets</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateAsset />
      </div>
      <Suspense fallback={<EntitiesTableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
};

export default AssetPage;
