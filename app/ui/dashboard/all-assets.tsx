import { fetchAllAssets } from "@/app/lib/repository";
import AssetCard from "./asset-card/assetCard";

const AllAssets: React.FC = async () => {
  const allAssets = await fetchAllAssets();

  return (
    <div className="flex w-full flex-col col-span-2 md:col-span-8">
      <h2 className="mb-4 text-lg">All Assets</h2>
      <div className="flex flex-col justify-center md:justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white p-6 flex flex-wrap justify-center md:justify-between gap-x-2 gap-y-8">
          {allAssets.map((asset) => (
            <AssetCard key={asset.id} {...asset} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAssets;
