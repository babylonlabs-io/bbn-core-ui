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
  },
};

export const Controlled: Story = {
  args: {
    options,
    placeholder: "Select status",
  },
  render: (args) => {
    return <Select {...args} defaultValue="active" />;
  },
};

export const CenterAligned: Story = {
  args: {
    options,
    selectWidth: "200px",
  },
  render: (args) => (
    <div className="flex w-full justify-center gap-1">
      <Select {...args} placeholder="Select status" selectWidth={args.selectWidth} />
    </div>
  ),
};

export const LeftAligned: Story = {
  args: {
    options,
    selectWidth: "200px",
    menuWidth: "300px",
  },
  render: (args) => (
    <div className="flex w-full">
      <Select {...args} placeholder="Select status" selectWidth={args.selectWidth} menuWidth={args.menuWidth} />
    </div>
  ),
};

export const RightAligned: Story = {
  args: {
    options,
    selectWidth: "200px",
    menuWidth: "300px",
  },
  render: (args) => (
    <div className="flex w-full justify-between gap-1">
      <div className="w-1/2">Title</div>
      <Select {...args} placeholder="Select status" selectWidth={args.selectWidth} menuWidth={args.menuWidth} />
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
    renderSelected: (option) => `Showing ${option.value}`,
  },
};
