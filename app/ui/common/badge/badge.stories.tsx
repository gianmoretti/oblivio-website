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
    backgroundColor: {
      control: {
        type: "color",
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
  className: "text-lg",
};

export const WithBackgroundColor = Template.bind({});
WithBackgroundColor.args = {
  children: <>LT</>,
  backgroundColor: "#35be16",
};
