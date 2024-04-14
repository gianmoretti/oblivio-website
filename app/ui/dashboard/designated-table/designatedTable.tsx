import clsx from "clsx";

import { Designated } from "@/app/lib/model";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../common/avatar/avatar";
import { computeInitials } from "@/app/lib/utils";

interface DesignatedTableProps {
  title: string;
  designatedList: Designated[];
}

const DesignatedTable: React.FC<DesignatedTableProps> = ({
  title,
  designatedList,
}) => {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>{title}</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {designatedList.map((designated, i) => {
            const initals = computeInitials(
              designated.firstName,
              designated.lastName,
            );
            return (
              <div
                key={designated.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="p-2">
                    <Avatar>
                      <AvatarImage src={designated.imageUrl} />
                      <AvatarFallback>{initals}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {designated.firstName} {designated.lastName}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {designated.email}
                    </p>
                  </div>
                </div>
                <p className="truncate text-sm font-medium md:text-base">
                  {designated.phoneNumber}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DesignatedTable;
