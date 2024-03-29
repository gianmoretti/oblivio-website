import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";

const iconMap = {
  collected: BanknotesIcon,
  designated: UserGroupIcon,
  pending: ClockIcon,
  assets: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfAssets,
    numberOfDesignated,
    totalPaidAssets,
    totalPendingAssets,
  } = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidAssets} type="collected" />
      <Card title="Pending" value={totalPendingAssets} type="pending" />
      <Card title="Total Assets" value={numberOfAssets} type="assets" />
      <Card
        title="Total Designated"
        value={numberOfDesignated}
        type="designated"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "assets" | "designated" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}
