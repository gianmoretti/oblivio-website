import Pagination from "@/app/ui/assets/pagination";
import Search from "@/app/ui/common/search/search";
import Table from "@/app/ui/assets/table";
import { CreateAsset } from "@/app/ui/assets/buttons";
import { lusitana } from "@/app/ui/fonts";
import { AssetsTableSkeleton } from "@/app/ui/common/skeletons/skeletons";
import { Suspense } from "react";
import { fetchAssetsPages } from "@/app/lib/data";

interface AssetsPageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

const AssetsPage: React.FC<AssetsPageProps> = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchAssetsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Assets</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search assets..." />
        <CreateAsset />
      </div>
      <Suspense key={query + currentPage} fallback={<AssetsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default AssetsPage;
