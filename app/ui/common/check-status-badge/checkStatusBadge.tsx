import { clsx } from "clsx";
import Badge from "../badge/badge";
import { VerificationStatus } from "@/app/lib/model/product";

export interface CheckStatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: VerificationStatus;
}

const CheckStatusBadge: React.FC<CheckStatusBadgeProps> = ({ status }) => (
  <Badge
    className={clsx({
      "bg-green-100 text-green-800": status === VerificationStatus.VERIFIED,
      "bg-red-100 text-red-800": status === VerificationStatus.REJECTED,
      "bg-yellow-100 text-yellow-800": status === VerificationStatus.PENDING,
      "bg-blue-100 text-blue-800": status === VerificationStatus.SCHEDULED,
    })}
  >
    {status}
  </Badge>
);

export default CheckStatusBadge;
