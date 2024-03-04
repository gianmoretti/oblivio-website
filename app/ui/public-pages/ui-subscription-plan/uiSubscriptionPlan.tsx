import { Plan } from "@/app/lib/model";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface UISubscriptionPlanProps {
  plan: Plan;
}

const UISubscriptionPlan: React.FC<UISubscriptionPlanProps> = ({ plan }) => {
  return (
    <div
      key={plan.name}
      className="flex flex-col items-center justify-center w-full h-[400px] md:w-1/2 bg-gray-100 rounded-lg overflow-hidden shadow-md p-8"
    >
      <h2
        className="text-xl font-semibold mb-4 text-center md:text-left"
        style={{ color: plan.color.hex }}
      >
        {plan.name}
      </h2>{" "}
      <div className={`text-xl font-medium`}>
        <strong>{plan.price}</strong>
      </div>
      <ul className="list-disc list-inside pl-4 mb-8">
        {plan.planFeatures.map((feature) => (
          <li key={feature.description}>
            {feature.description}
            {feature.notes && (
              <>
                <br />
                <small>
                  <i>({feature.notes})</i>
                </small>
              </>
            )}
          </li>
        ))}
      </ul>
      <Link
        href={""}
        className={`flex items-center gap-5 rounded-lg px-6 py-3 text-sm text-white font-medium transition-colors md:text-base 
        ${plan.color.hex === "#4635f3" ? "bg-blue-400" : "bg-orange-400"} 
        ${plan.color.hex === "#4635f3" ? "hover:bg-blue-600" : "hover:bg-orange-600"} 
        `}
      >
        <span>Scegli</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </div>
  );
};

export default UISubscriptionPlan;
