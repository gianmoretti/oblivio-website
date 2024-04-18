import type { Meta, StoryObj } from "@storybook/react";
import CheckStatusBadge from "./checkStatusBadge";
import { VerificationStatus } from "@/app/lib/model/product";

const meta = {
  title: "Oblivio/CheckStatusBadge",
  component: CheckStatusBadge,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
} satisfies Meta<typeof CheckStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    status: VerificationStatus.PENDING,
  },
};

export const Rejected: Story = {
  args: {
    status: VerificationStatus.REJECTED,
  },
};

export const Verified: Story = {
  args: {
    status: VerificationStatus.VERIFIED,
  },
};

export const Scheduled: Story = {
  args: {
    status: VerificationStatus.SCHEDULED,
  },
};
