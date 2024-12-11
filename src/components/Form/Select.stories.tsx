import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

export const Default: Story = {
  args: {
    options,
    placeholder: "Select status",
    onSelect: console.log,
  },
};

export const Controlled: Story = {
  args: {
    defaultValue: "active",
    options,
    placeholder: "Select status",
  },
};

export const Disabled: Story = {
  args: {
    options,
    placeholder: "Select status",
    disabled: true,
  },
};

export const CustomSelectedDisplay: Story = {
  args: {
    options,
    placeholder: "Select status",
    renderSelectedOption: (option) => `Showing ${option.value}`,
  },
};
