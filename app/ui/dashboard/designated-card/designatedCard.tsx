import { computeInitials } from "@/app/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../common/avatar/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../../common/card/card";
import { CalendarIcon } from "@heroicons/react/24/outline";

interface DesignatedCardProps {
  email: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  birthPlace?: string;
  residence?: string;
  phoneNumber?: string;
  fiscalCode?: string;
  imageUrl?: string;
  updatedAt: string;
}

const DesignatedCard: React.FC<DesignatedCardProps> = ({
  email,
  firstName,
  lastName,
  birthDate,
  birthPlace,
  residence,
  phoneNumber,
  fiscalCode,
  imageUrl,
  updatedAt,
}) => {
  const designatedInitials = computeInitials(firstName, lastName);
  return (
    <Card className="w-80">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>
            {firstName} {lastName}
          </CardTitle>
          <Avatar>
            <AvatarImage alt={designatedInitials} src={imageUrl} />
            <AvatarFallback>{designatedInitials}</AvatarFallback>
          </Avatar>
        </div>
        <CardDescription>{email}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        {birthPlace && birthDate && (
          <div>
            <strong>nato a</strong> {birthPlace} il {birthDate}
          </div>
        )}
        {residence && (
          <div>
            <strong>residente a</strong> {residence}
          </div>
        )}
        {fiscalCode && (
          <div>
            <strong>codice fiscale:</strong> {fiscalCode}
          </div>
        )}
        {phoneNumber && (
          <div>
            <strong>numero di telefono:</strong> {phoneNumber}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-1 items-center">
          <CalendarIcon className="w-5 h-5"></CalendarIcon> {updatedAt}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DesignatedCard;
