import { fetchSummaryCardsData } from "@/app/lib/data";
import SummaryCard from "./summary-card/summaryCard";

const SummaryCardsWrapper: React.FC = async () => {
  const { numberOfAssets, numberOfDesignated, nextCheckData } =
    await fetchSummaryCardsData();

  return (
    <>
      <SummaryCard title="Total Assets" value={numberOfAssets} type="assets" />
      <SummaryCard
        title="Total Designated"
        value={numberOfDesignated}
        type="designated"
      />
      <SummaryCard title="Next check" value={nextCheckData} type="nextCheck" />
    </>
  );
};

export default SummaryCardsWrapper;
