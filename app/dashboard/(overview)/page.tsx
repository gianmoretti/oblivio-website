import { Suspense } from "react";
import {
  CardsSkeleton,
  AllAssetsSkeleton,
  AllDesignatedSkeleton,
  SummaryCardsSkeleton,
} from "@/app/ui/common/skeletons/skeletons";
import AllAssets from "@/app/ui/dashboard/all-assets";
import AllDesignated from "@/app/ui/dashboard/all-designated";
import SummaryCardsWrapper from "@/app/ui/dashboard/summary-cards";

export default async function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<SummaryCardsSkeleton />}>
          <SummaryCardsWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<AllAssetsSkeleton />}>
          <AllAssets />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<AllDesignatedSkeleton />}>
          <AllDesignated />
        </Suspense>
      </div>
    </main>
  );
}
