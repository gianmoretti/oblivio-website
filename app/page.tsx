import AcmeLogo from "@/app/ui/common/logo/acme-logo";
import { Section } from "./lib/definitions";
import { loadSubscriptionPlansSection } from "./lib/data";
import UISection from "./ui/public-pages/ui-section/uiSection";
import Link from "next/link";
import { Plan } from "./lib/model";
import UISubscriptionPlan from "./ui/public-pages/ui-subscription-plan/uiSubscriptionPlan";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/common/card/card";
import { Button } from "./ui/common/button/button";

interface Feature {
  icon?: string;
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
  const reasonsSection: Section = {
    title: "Reasons title",
    description: "Reasons description",
    backgroundColor: "bg-white",
    textColor: "text-orange-600",
  };
  const processSection: Section = {
    title: "Product title",
    description: "Product description",
    image: {
      desktop: "/dashboard.png",
      mobile: "/dashboard.png",
      alt: "Screenshots of the dashboard project",
    },
    order: "reverse",
    alignment: "left",
    backgroundColor: "bg-orange-400",
  };
  const featureSection: FeatureSection = {
    title: "Feature title",
    description: "Feature description",
    features: [
      {
        title: "Feature title",
        description: "Feature description",
      },
      {
        title: "Feature title",
        description: "Feature description",
      },
      {
        title: "Feature title",
        description: "Feature description",
      },
      {
        title: "Feature title",
        description: "Feature description",
      },
      {
        title: "Feature title",
        description: "Feature description",
      },
      {
        title: "Feature title",
        description: "Feature description",
      },
    ],
    alignment: "center",
    backgroundColor: "bg-blue-400",
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
    <main className="flex min-h-screen flex-col">
      <nav className="bg-orange-600 text-white p-4">
        <ul className="flex justify-between mx-auto items-center">
          <li>
            <Link className="block px-4 py-2" href="#">
              <AcmeLogo />
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2" href="#">
              Home
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2" href="#">
              Lo sapevi che...
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2" href="#">
              Prezzo
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2" href="#">
              Chi siamo
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2" href="#">
              Contatti
            </Link>
          </li>
          <li>
            <Button className="text-white bg-transparent border border-white">
              Login
            </Button>
          </li>
          <li>
            <Button className="ml-2">Registrati</Button>
          </li>
        </ul>
      </nav>
      <UISection baseSection={hero} />
      <UISection baseSection={reasonsSection} />
      <UISection baseSection={processSection} />
      <UISection baseSection={featureSection}>
        <div className="grid grid-cols-2 gap-6 px-6 pb-6">
          {featureSection.features.map((feature) => (
            <Card className="bg-white" key={feature.title}>
              <CardHeader>
                <CardTitle className="text-[#4635F3]">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </UISection>
      <UISection baseSection={subscriptionPlansSection}>
        <div
          className={
            "flex items-center justify-center gap-6 rounded-lg px-6 pb-6 md:px-10 flex-col md:flex-row"
          }
        >
          {subscriptionPlansSection.plans.map((plan) => (
            <UISubscriptionPlan plan={plan} key={plan.name} />
          ))}
        </div>
      </UISection>
      <UISection baseSection={enrollmentInvitationSection} />
      <footer className="bg-blue-500 text-white p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
          <div>
            <h3 className="font-bold">PRODOTTO</h3>
            <ul>
              <li>
                <Link href="#">Oblivio Dashboard</Link>
              </li>
              <li>
                <Link href="#">Lo sapevi che...</Link>
              </li>
              <li>
                <Link href="#">Casi studio</Link>
              </li>
              <li>
                <Link href="#">Aspetti legali</Link>
              </li>
              <li>
                <Link href="#">Supporto</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">AZIENDA</h3>
            <ul>
              <li>
                <Link href="#">Chi siamo</Link>
              </li>
              <li>
                <Link href="#">Contatti</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Termini del servizio</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">INFORMAZIONI</h3>
            <ul>
              <li>
                <Link href="#">Il processo</Link>
              </li>
              <li>
                <Link href="#">Come usare al meglio Oblivio</Link>
              </li>
              <li>
                <Link href="#">Piani di abbonamento</Link>
              </li>
              <li>
                <Link href="#">Dettagli tecnici</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">DOVE CI TROVI</h3>
            <ul>
              <li>
                <Link href="#">Twitter</Link>
              </li>
              <li>
                <Link href="#">Facebook</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>COPYRIGHT © 2023 – DESIGN BY OBLIVIO</p>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
