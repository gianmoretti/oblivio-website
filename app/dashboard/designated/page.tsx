import Table from "@/app/ui/designated/table";
import { EntitiesTableSkeleton } from "@/app/ui/common/skeletons/skeletons";
import { Suspense } from "react";
import { CreateEntity } from "@/app/ui/common/crud-buttons";

const DesignatedPage: React.FC = async () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Designated</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateEntity entity={"designated"} label={"Designated"} />
      </div>
      <Suspense fallback={<EntitiesTableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
};

export default DesignatedPage;
