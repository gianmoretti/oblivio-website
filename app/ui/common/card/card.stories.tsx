import type { Meta, StoryFn } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";
import Badge from "../badge/badge";

const meta = {
  title: "Oblivio/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
const Template: StoryFn = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content goes here.</p>
      </CardContent>
      <CardFooter>Footer</CardFooter>
    </>
  ),
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  className: "bg-blue-200",
  children: (
    <>
      <CardHeader>
        <CardTitle className="text-red-500">Custom Title</CardTitle>
        <CardDescription className="text-green-500">
          Custom Description
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Custom content goes here.</p>
      </CardContent>
      <CardFooter className="bg-yellow-300">Custom Footer</CardFooter>
    </>
  ),
};

export const WithBadge = Template.bind({});
WithBadge.args = {
  className: "bg-blue-200",
  children: (
    <>
      <CardHeader>
        <CardTitle className="text-red-500">Badge Card Title</CardTitle>
        <CardDescription className="text-green-500">
          A Card with Badges
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content goes here.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>€ 100</div>
        <div className="flex space-x-1">
          <Badge>D</Badge>
          <Badge>M</Badge>
        </div>
      </CardFooter>
    </>
  ),
};
