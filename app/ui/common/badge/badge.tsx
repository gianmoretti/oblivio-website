import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

const Badge: React.FC<BadgeProps> = ({ className, ...props }: BadgeProps) => (
  <div
    className={twMerge(
      clsx(
        "inline-flex items-center",
        "rounded-full border border-gray-200",
        "px-2.5 py-0.5 text-xs font-semibold transition-colors",
      ),
      className,
    )}
    {...props}
  />
);

export default Badge;
