import { CategoryType } from "@/app/lib/model";
import { clsx } from "clsx";
import {
  BanknotesIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  HomeIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import BitcoinIcon from "../custom-icons/bitcoinIcon";

export interface CategoryProps extends React.HTMLAttributes<HTMLDivElement> {
  type: CategoryType;
}

const mapperCategoryIcon: Record<
  CategoryType,
  React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  >
> = {
  CRYPTO: BitcoinIcon,
  FINANCIAL: BanknotesIcon,
  INSURANCE: BuildingLibraryIcon,
  PROPERTY: HomeIcon,
  SECRET: KeyIcon,
};

const Category: React.FC<CategoryProps> = ({
  className,
  type,
  ...props
}: CategoryProps) => {
  const IconComponent = mapperCategoryIcon[type];

  return (
    <div
      className={twMerge(
        clsx(
          "w-20 h-20",
          "inline-flex items-center",
          "rounded-full border border-gray-200",
          "px-2.5 py-0.5 text-xs font-semibold transition-colors",
        ),
        className,
      )}
      {...props}
    >
      <IconComponent />
    </div>
  );
};

export default Category;
