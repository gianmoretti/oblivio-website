import type { Meta, StoryObj } from "@storybook/react";
import CheckStatus from "./checkStatusCard";
import { MeansType, Verification, VerificationStatus } from "@/app/lib/model/product";

const meta = {
  title: "Oblivio/CheckStatus",
  component: CheckStatus,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    current: {
      timestamp: "01-05-2024",
      status: VerificationStatus.PENDING,
      means: MeansType.EMAIL,
    } as Verification,
    lastCheck: {
      timestamp: "01-01-2024",
      status: VerificationStatus.VERIFIED,
      means: MeansType.WHATSAPP,
    } as Verification,
    nextCheck: {
      timestamp: "01-09-2024",
      status: VerificationStatus.SCHEDULED,
    } as Verification,
  },
};
