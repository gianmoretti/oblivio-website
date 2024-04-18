import {
  CategoryType,
  Designated,
  MeansType,
  Verification,
  VerificationStatus,
} from "../../../lib/model/product";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../../common/card/card";
import Badge from "../../common/badge/badge";
import Category from "../../common/category/category";
import {
  CalendarIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { computeInitials } from "@/app/lib/utils";
import clsx from "clsx";
import WhatsappIcon from "../../common/custom-icons/whatsappIcon";
import CheckStatusBadge from "../../common/check-status-badge/checkStatusBadge";

const mapperCheckMeansIcon: Record<
  MeansType,
  React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  >
> = {
  EMAIL: EnvelopeIcon,
  PHONE_CALL: PhoneIcon,
  WHATSAPP: WhatsappIcon,
  LIVE_MEET: UsersIcon,
};

interface CheckStatusProps {
  current: Verification;
  lastCheck: Verification;
  nextCheck: Verification;
}

const CheckStatus: React.FC<CheckStatusProps> = ({
  current,
  lastCheck,
  nextCheck,
}) => {
  let CurrentCheckMeansIcon;
  if (current.means) {
    CurrentCheckMeansIcon = mapperCheckMeansIcon[current.means];
  }
  let LastCheckMeansIcon;
  if (lastCheck.means) {
    LastCheckMeansIcon = mapperCheckMeansIcon[lastCheck.means];
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Check status</CardTitle>
        <CardDescription>
          Stato delle verifiche di raggiungibilità
        </CardDescription>
      </CardHeader>
      <CardContent>
        <strong>Verifica corrente:</strong>
        <ul className="w-100">
          <li className="w-100">
            stato: <CheckStatusBadge status={current.status} />
          </li>
          <li className="w-100">
            <div className="flex items-start">
              <CalendarIcon className="w-5 h-5"></CalendarIcon>{" "}
              {current.timestamp}
            </div>
          </li>
          {CurrentCheckMeansIcon && (
            <li>
              <div className="flex items-center gap-1">
                mezzo: <CurrentCheckMeansIcon className="w-5 h-5" />{" "}
              </div>
            </li>
          )}
        </ul>
      </CardContent>
      <CardContent>
        <strong>Ultima verifica completata:</strong>
        <ul className="w-100">
          <li className="w-100">
            stato: <CheckStatusBadge status={lastCheck.status} />
          </li>
          <li className="w-100">
            <div className="flex items-start">
              <CalendarIcon className="w-5 h-5"></CalendarIcon>{" "}
              {lastCheck.timestamp}
            </div>
          </li>
          {LastCheckMeansIcon && (
            <li>
              <div className="flex items-center gap-1">
                mezzo: <LastCheckMeansIcon className="w-5 h-5" />
              </div>
            </li>
          )}
        </ul>
      </CardContent>
      <CardContent>
        <strong>Prossima verifica:</strong>
        <ul className="w-100">
          <li className="w-100">
            stato: <CheckStatusBadge status={nextCheck.status} />
          </li>
          <li className="w-100">
            <div className="flex items-start">
              <CalendarIcon className="w-5 h-5"></CalendarIcon>{" "}
              {nextCheck.timestamp}
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default CheckStatus;
