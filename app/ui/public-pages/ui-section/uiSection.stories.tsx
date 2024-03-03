import type { Meta, StoryObj } from "@storybook/react";

import UISection from "./uiSection";

const meta = {
  title: "Oblivio/UISection",
  component: UISection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    baseSection: {
      control: "object",
    },
  },
} satisfies Meta<typeof UISection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    baseSection: {
      title: "A title",
      description: "A description",
      cta: {
        label: "Click me",
        url: "https://google.com",
      },
    },
  },
};

export const LeftAligned: Story = {
  args: {
    baseSection: {
      title: "A title",
      description: "A description",
      cta: {
        label: "Click me",
        url: "https://google.com",
      },
      alignment: "left",
    },
  },
};

export const Orange: Story = {
  args: {
    baseSection: {
      title: "A title",
      description: "A description",
      backgroundColor: "bg-orange-400",
      cta: {
        label: "Click me",
        url: "https://google.com",
        textColor: "text-orange-400",
      },
    },
  },
};

export const BlueWithOrangeLabel: Story = {
  args: {
    baseSection: {
      title: "A title",
      description: "A description",
      cta: {
        label: "Click me",
        url: "https://google.com",
        backgroundColor: "bg-orange-400",
      },
    },
  },
};

export const BlueWithOrangeLabelLight: Story = {
  args: {
    baseSection: {
      title: "A title",
      description: "A description",
      cta: {
        label: "Click me",
        url: "https://google.com",
        backgroundColor: "bg-white",
        textColor: "text-orange-400",
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    baseSection: {
      title: "A title",
      description: "A description",
      cta: {
        label: "Click me",
        url: "https://google.com",
        backgroundColor: "bg-white",
      },
      image: {
        desktop: "/dashboard.png",
        mobile: "/dashboard.png",
        alt: "image of oblivio dashboard",
      },
    },
  },
};

export const WithImageAndReverseOrder: Story = {
  args: {
    baseSection: {
      title: "A title",
      description: "A description",
      cta: {
        label: "Click me",
        url: "https://google.com",
        backgroundColor: "bg-white",
      },
      image: {
        desktop: "/dashboard.png",
        mobile: "/dashboard.png",
        alt: "image of oblivio dashboard",
      },
      order: "reverse",
      alignment: "left",
    },
  },
};
