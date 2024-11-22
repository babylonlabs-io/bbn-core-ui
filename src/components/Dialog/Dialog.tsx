import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";

import { Portal } from "@/components/Portal";
import { useModalManager } from "@/hooks/useModalManager";
import { Backdrop } from "./components/Backdrop";

export interface DialogProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  hasBackdrop?: boolean;
}

export const Dialog = ({
  children,
  open = false,
  className,
  onClose,
  hasBackdrop = true,
  ...restProps
}: DialogProps) => {
  const { mounted, unmount } = useModalManager({ open });

  return (
    <Portal mounted={mounted}>
      <div {...restProps} className="bbn-dialog-wrapper">
        <div
          className={twJoin("bbn-dialog", open ? "b-animate-modal-in" : "b-animate-modal-out", className)}
          onAnimationEnd={unmount}
        >
          {children}
        </div>
      </div>

      {hasBackdrop && <Backdrop open={open} onClick={onClose} />}
    </Portal>
  );
};
