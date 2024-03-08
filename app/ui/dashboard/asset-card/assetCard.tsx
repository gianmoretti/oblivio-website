import { CategoryType, Designated } from "../../../../app/lib/model";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../../common/card/card";
import Badge from "../../common/badge/badge";
import Category from "../../common/category/category";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { computeInitials } from "@/app/lib/utils";

interface AssetCardProps {
  name: string;
  category: CategoryType;
  description: string;
  updatedAt: string;
  designatedList: Designated[];
}

const AssetCard: React.FC<AssetCardProps> = ({
  name,
  category,
  description,
  updatedAt,
  designatedList,
}) => (
  <Card className="w-80">
    <CardHeader>
      <div className="flex justify-between">
        <CardTitle>{name}</CardTitle>
        <Category className="w-12 h-12" type={category}></Category>
      </div>
    </CardHeader>
    <CardContent>{description}</CardContent>
    <CardFooter className="flex justify-between">
      <div className="flex space-x-1 items-center">
        <CalendarIcon className="w-5 h-5"></CalendarIcon> {updatedAt}
      </div>
      <div className="flex space-x-1">
        {designatedList.map((designated) => (
          <Badge key={designated.id}>
            {computeInitials(designated.firstName, designated.lastName)}
          </Badge>
        ))}
      </div>
    </CardFooter>
  </Card>
);

export default AssetCard;
