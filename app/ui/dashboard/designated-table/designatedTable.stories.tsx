import type { Meta, StoryObj } from "@storybook/react";
import DesignatedTable from "./designatedTable";
import { Designated } from "@/app/lib/model";

const meta = {
  title: "Oblivio/DesignatedTable",
  component: DesignatedTable,
  tags: ["autodocs"],
} satisfies Meta<typeof DesignatedTable>;
export default meta;

type Story = StoryObj<typeof meta>;

const designated: Designated = {
  id: "1",
  email: "test@test.com",
  firstName: "John",
  lastName: "Doe",
  birthDate: "31-12-1978",
  birthPlace: "Minneapolis",
  residence: "via roma 1, Roma",
  phoneNumber: "+393401234567",
  fiscalCode: "JHNDOE78P04L400P",
  imageUrl:
    "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
  updatedAt: "01-01-2024",
};

export const Default: Story = {
  args: {
    title: "My list of designated",
    designatedList: [
      designated,
      { ...designated, imageUrl: undefined },
      designated,
      { ...designated, imageUrl: undefined },
      designated,
    ],
  },
};
