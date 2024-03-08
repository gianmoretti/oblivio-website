import type { Meta, StoryObj } from "@storybook/react";

import UISubscriptionPlan from "./uiSubscriptionPlan";

const meta = {
  title: "Oblivio/UISubscriptionPlan",
  component: UISubscriptionPlan,
  tags: ["autodocs"],
  argTypes: {
    plan: {
      control: "object",
    },
  },
  decorators: [
    (Story) => (
      <div className={"w-[800px]"}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UISubscriptionPlan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    plan: {
      color: {
        hex: "#355E3B",
      },
      name: "Basic",
      price: "$9.99",
      planFeatures: [
        {
          description: "100 GB of storage",
          notes: "some notes",
        },
        {
          description: "Unlimited public projects",
          notes: "some other notes",
        },
        {
          description: "Community access",
        },
      ],
    },
  },
};

export const PlanWithFeaturesWithoutNotes: Story = {
  args: {
    plan: {
      color: {
        hex: "#355E3B",
      },
      name: "Basic",
      price: "$9.99",
      planFeatures: [
        {
          description: "100 GB of storage",
        },
        {
          description: "Unlimited public projects",
        },
        {
          description: "Community access",
        },
      ],
    },
  },
};

export const PlanWithAMonthlyPriceAndADifferentColor: Story = {
  args: {
    plan: {
      color: {
        hex: "#00A36C",
      },
      name: "Basic",
      price: "€ 9.99/monthly",
      planFeatures: [
        {
          description: "100 GB of storage",
        },
        {
          description: "Unlimited public projects",
        },
        {
          description: "Community access",
        },
        {
          description:
            "Some other fantastic feature with a long text, maybe on multiple rows, bla bla bla bla bla bla bla",
        },
      ],
    },
  },
};
