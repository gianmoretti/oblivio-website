import AcmeLogo from "@/app/ui/common/logo/acme-logo";
import { Section } from "./lib/definitions";
import { loadSubscriptionPlansSection } from "./lib/data";
import UISection from "./ui/public-pages/ui-section/uiSection";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Plan } from "./lib/model";
import UISubscriptionPlan from "./ui/public-pages/ui-subscription-plan/uiSubscriptionPlan";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureSection extends Section {
  features: Feature[];
}

interface SubscriptionPlansSection extends Section {
  plans: Plan[];
}

const HomePage: React.FC = async () => {
  const hero: Section = {
    title: "Hero title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: {
      desktop: "/hero-desktop.png",
      mobile: "/hero-mobile.png",
      alt: "Screenshots of the dashboard project",
    },
    cta: {
      url: "/login",
      label: "Log in!",
    },
  };
  const featureSection: FeatureSection = {
    title: "Feature title",
    description: "Feature description",
    features: [],
    image: {
      desktop: "/dashboard.png",
      mobile: "/dashboard.png",
      alt: "Screenshots of the dashboard project",
    },
    cta: {
      url: "/login",
      label: "Log in!",
    },
    order: "reverse",
    alignment: "left",
    backgroundColor: "bg-orange-400",
  };
  const { data }: { data: { subscriptionPlans: Plan[] } } =
    await loadSubscriptionPlansSection();
  const subscriptionPlansSection: SubscriptionPlansSection = {
    title: "Subscription Plans title",
    description: "Subscription Plans description",
    plans: data.subscriptionPlans,
    backgroundColor: "bg-white",
    textColor: "text-blue-600",
  };
  const enrollmentInvitationSection: Section = {
    title: "Enrollement invitation title",
    description: "Enrollement invitation description",
    alignment: "left",
  };

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-orange-600 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <UISection baseSection={hero} />
      <UISection baseSection={featureSection} />
      <UISection baseSection={subscriptionPlansSection}>
        <div
          className={
            "flex items-center justify-center gap-6 rounded-lg px-6 md:px-10 md:flex-row sm:flex-col"
          }
        >
          {subscriptionPlansSection.plans.map((plan) => (
            <UISubscriptionPlan plan={plan} />
          ))}
        </div>
      </UISection>
      <UISection baseSection={enrollmentInvitationSection} />
    </main>
  );
};

export default HomePage;
