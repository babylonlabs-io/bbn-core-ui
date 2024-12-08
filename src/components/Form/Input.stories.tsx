import type { Meta, StoryObj } from "@storybook/react";
import { RiSearchLine } from "react-icons/ri";
import { useState } from "react";

import { Loader } from "@/components/Loader";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Default input",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    placeholder: "Input with error",
    state: "error",
    stateText: "This field is required",
  },
};

export const WithSuffix: Story = {
  args: {
    placeholder: "Search...",
    decorators: {
      suffix: <RiSearchLine size={20} />,
    },
  },
};

export const WithPrefix: Story = {
  args: {
    placeholder: "Amount",
    decorators: {
      prefix: "$",
    },
  },
};

export const LoadingWithInteraction: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <Input
        placeholder="Click search to see loading"
        decorators={{
          suffix: (
            <button onClick={handleSearch} disabled={isLoading} className="h-5 w-5">
              {isLoading ? <Loader size={20} /> : <RiSearchLine size={20} />}
            </button>
          ),
        }}
        disabled={isLoading}
      />
    );
  },
};
