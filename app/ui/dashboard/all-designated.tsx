import { fetchFakeDesignated } from "@/app/lib/data";
import DesignatedCard from "./designated-card/designatedCard";

const AllDesignated: React.FC = async () => {
  const allDesignated = await fetchFakeDesignated();

  return (
    <div className="flex w-full flex-col col-span-2 md:col-span-8">
      <h2 className="mb-4 text-lg">All Designated</h2>
      <div className="flex flex-col justify-center md:justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white p-6 flex flex-wrap justify-center md:justify-between gap-x-2 gap-y-8">
          {allDesignated.map((designated) => (
            <DesignatedCard key={designated.id} {...designated} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDesignated;
