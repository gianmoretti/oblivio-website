import type { Meta, StoryObj } from "@storybook/react";
import SummaryCard from "./summaryCard";

const meta = {
  title: "Oblivio/SummaryCard",
  component: SummaryCard,
  tags: ["autodocs"],
} satisfies Meta<typeof SummaryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "A generic summary card",
    value: "A value",
    type: "assets",
  },
};
