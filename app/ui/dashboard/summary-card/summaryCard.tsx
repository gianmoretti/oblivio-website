import {
  ClockIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  assets: DocumentDuplicateIcon,
  designated: UserGroupIcon,
  nextCheck: ClockIcon,
};

interface SummaryCardProps {
  title: string;
  value: number | string;
  type: "assets" | "designated" | "nextCheck";
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, type }) => {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-2">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-2 py-2 text-center text-xl">
        {value}
      </p>
    </div>
  );
};

export default SummaryCard;
