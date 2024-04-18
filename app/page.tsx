import { Section } from "./lib/model/common";
import { loadAllFeaturesSection, loadEnrollmentSection, loadHeroSection, loadProcessSection, loadReasonSection, loadSubscriptionPlanSection, loadSubscriptionPlans } from "./lib/data";
import UISection from "./ui/public-pages/ui-section/uiSection";
import Link from "next/link";
import UISubscriptionPlan from "./ui/public-pages/ui-subscription-plan/uiSubscriptionPlan";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/common/card/card";
import React from "react";
import Menu from "./ui/public-pages/menu/menu";
import { GraphQLSection, Plan } from "./lib/model/site";

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
  const { data: heroData }: { data: { section: GraphQLSection }  } = await loadHeroSection();
  const hero: Section = {
    title: heroData.section.title,
    description: heroData.section.description,
    image: {
      desktop: heroData.section.desktopImage?.url ?? "/hero-desktop.png",
      mobile: heroData.section.mobileImage?.url ?? "/hero-mobile.png",
      alt: "Screenshots of the dashboard project",
    },
    cta: {
      url: "/login",
      label: "Login",
      backgroundColor: "bg-white",
      backgroundColorOnHover: "hover:bg-orange-400",
    },
  };
  const { data: reasonsData }: { data: { section: GraphQLSection }  } = await loadReasonSection();
  const reasonsSection: Section = {
    title: reasonsData.section.title,
    description: reasonsData.section.description,
    backgroundColor: "bg-white",
    textColor: "text-orange-600",
  };

  const { data: processData }: { data: { section: GraphQLSection }  } = await loadProcessSection();
  const processSection: Section = {
    title: processData.section.title,
    description: processData.section.richDescription.html,
    image: {
      desktop: processData.section.desktopImage?.url ?? "/dashboard.png",
      mobile: processData.section.mobileImage?.url ??"/dashboard.png",
      alt: "Screenshots of the dashboard project",
    },
    order: "reverse",
    alignment: "left",
    backgroundColor: "bg-orange-400",
  };

  const { data: featuresData }: { data: { productFeatures: Feature[] } } = await loadAllFeaturesSection();
  const featureSection: FeatureSection = {
    title: "I passi chiave",
    description: "Qui in elenco gli step chiave dell'uso del servizio Oblivio",
    features: featuresData.productFeatures,
    alignment: "center",
    backgroundColor: "bg-blue-400",
  };

  const { data: planData }: { data: { section: GraphQLSection } } = await loadSubscriptionPlanSection();
  const { data: plansData }: { data: { subscriptionPlans: Plan[] } } = await loadSubscriptionPlans();
  const subscriptionPlansSection: SubscriptionPlansSection = {
    title: planData.section.title,
    description: planData.section.richDescription.html,
    plans: plansData.subscriptionPlans,
    backgroundColor: "bg-white",
    textColor: "text-blue-600",
  };

  const { data: enrollmentData }: { data: { section: GraphQLSection } } = await loadEnrollmentSection();
  const enrollmentInvitationSection: Section = {
    title: enrollmentData.section.title,
    description: enrollmentData.section.description,
    alignment: "left",
  };

  return (
    <main className="flex min-h-screen flex-col">
      <Menu />
      <UISection baseSection={hero} />
      <UISection baseSection={reasonsSection} />
      <UISection baseSection={processSection} />
      <UISection baseSection={featureSection}>
        <div className="grid md:grid-cols-2 gap-6 px-6 pb-6">
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
