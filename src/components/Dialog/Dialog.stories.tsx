import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Dialog, DialogFooter, DialogBody, DialogHeader } from "./index";

import { ScrollLocker } from "@/context/Dialog.context";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Input";
import { Text } from "@/components/Text";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (props) => {
    const [visible, setVisibility] = useState(false);

    return (
      <ScrollLocker>
        <Button
          onClick={() => {
            setVisibility(true);
          }}
        >
          Push me softly
        </Button>

        <Dialog
          {...props}
          open={visible}
          onClose={() => {
            setVisibility(false);
          }}
        >
          <DialogHeader
            className="text-primary-main"
            onClose={() => {
              setVisibility(false);
            }}
          >
            Bitcoin Inscriptions
          </DialogHeader>

          <DialogBody className="pb-8 pt-4 text-primary-dark">
            <Text className="mb-6" variant="body1">
              This staking interface attempts to detect bitcoin ordinals, NFTs, Ruins, and other inscriptions
              (“Inscriptions”) within the Unspent Transaction Outputs (“UTXOs”) in your wallet. If you stake bitcoin
              with Inscriptions, those UTXOs may be spent on staking, unbonding, or withdrawal fees, which will cause
              you to lose those Inscriptions permanently. This interface will not detect all Inscriptions.
            </Text>

            <Text variant="body1">Chose one: (you can change this later)</Text>

            <Checkbox checked labelClassName="mt-6" label="Don't show again" />
          </DialogBody>

          <DialogFooter>
            <Button
              fluid
              variant="outlined"
              onClick={() => {
                setVisibility(false);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      </ScrollLocker>
    );
  },
};
