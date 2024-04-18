import Table from "@/app/ui/asset/table";
import { EntitiesTableSkeleton } from "@/app/ui/common/skeletons/skeletons";
import { Suspense } from "react";
import { CreateEntity } from "@/app/ui/common/crud-buttons";

const AssetPage: React.FC = async () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Assets</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateEntity entity={"assets"} label={"Asset"} />
      </div>
      <Suspense fallback={<EntitiesTableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
};

export default AssetPage;
