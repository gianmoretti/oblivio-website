import type { Meta, StoryFn } from "@storybook/react";
import Badge from "./badge";

const meta = {
  title: "Oblivio/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      control: {
        type: "text",
      },
    },
    children: {
      control: {
        type: "text",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
const Template: StoryFn = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>LT</>,
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  children: <>LT</>,
  className: " bg-red-400 text-lg",
};
