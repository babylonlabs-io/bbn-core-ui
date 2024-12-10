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

export const CenterAligned: Story = {
  args: {
    options,
    placeholder: "Select status",
  },
  render: (args) => (
    <div className="flex w-full justify-center gap-1">
      <Select {...args} />
    </div>
  ),
};

export const LeftAligned: Story = {
  args: {
    placeholder: "Select status",
    options,
  },
  render: (args) => (
    <div className="flex w-full">
      <Select {...args} />
    </div>
  ),
};

export const RightAligned: Story = {
  args: {
    placeholder: "Select status",
    options,
  },
  render: (args) => (
    <div className="flex w-full justify-between gap-1">
      <div className="w-1/2">Title</div>
      <Select {...args} />
    </div>
  ),
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

export const WithError: Story = {
  args: {
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending" },
    ],
    placeholder: "Select status",
    state: "error",
    stateText: "This field is required",
  },
};
