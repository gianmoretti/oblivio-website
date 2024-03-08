import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta = {
  title: "Oblivio/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <AvatarImage src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80" />
        <AvatarFallback>MJ</AvatarFallback>
      </div>
    ),
  },
};

export const WithoutImage: Story = {
  args: {
    asChild: true,
    children: (
      <div>
        <AvatarImage />
        <AvatarFallback>MJ</AvatarFallback>
      </div>
    ),
  },
};
