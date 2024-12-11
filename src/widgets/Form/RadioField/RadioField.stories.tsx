import type { Meta, StoryObj } from "@storybook/react";

import { Form } from "@/widgets/form/Form";

import { RadioField } from "./RadioField";

const meta: Meta<typeof RadioField> = {
  component: RadioField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "radio_field",
    value: "test",
    label: "Radio field",
  },
  decorators: [
    (Story) => (
      <Form onChange={console.log}>
        <Story />
      </Form>
    ),
  ],
};
