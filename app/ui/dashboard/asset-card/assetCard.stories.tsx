import type { Meta, StoryObj } from "@storybook/react";
import AssetCard from "./assetCard";
import { CategoryType } from "@/app/lib/model/product";

const meta = {
  title: "Oblivio/AssetCard",
  component: AssetCard,
  argTypes: {
    category: {
      options: Object.values(CategoryType),
      control: { type: "select" },
      defaultValue: CategoryType.CRYPTO,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AssetCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "A generic asset",
    category: CategoryType.CRYPTO,
    description: "A generic description",
    updatedAt: "31-12-2023",
    designatedList: [
      {
        id: "123",
        firstName: "First Name",
        lastName: "Last Name",
        email: "an email",
        updatedAt: "31-12-2023",
      },
      {
        id: "456",
        firstName: "Name",
        lastName: "Last",
        email: "an email",
        updatedAt: "31-12-2023",
      },
    ],
  },
};
