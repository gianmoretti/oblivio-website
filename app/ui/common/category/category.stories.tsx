import type { Meta, StoryFn } from "@storybook/react";
import Category from "./category";
import { CategoryType } from "../../../../app/lib/model";

const meta = {
  title: "Oblivio/Category",
  component: Category,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      options: Object.values(CategoryType),
      control: { type: "select" },
      defaultValue: CategoryType.CRYPTO,
    },
    className: {
      control: {
        type: "text",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Category>;

export default meta;
const Template: StoryFn = (args) => (
  <Category type={CategoryType.CRYPTO} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: <>LT</>,
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  children: <>LT</>,
  className: "bg-red-400 text-lg w-10 h-10",
};
