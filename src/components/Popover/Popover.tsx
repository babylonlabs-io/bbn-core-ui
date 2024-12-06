import { type PropsWithChildren, ReactNode, CSSProperties } from "react";
import { Portal } from "@/components/Portal";
import { useClickOutside } from "@/hooks/useClickOutside";
import "./Popover.css";

export interface PopoverProps {
  children?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  className?: string;
  style?: CSSProperties;
}

export const Popover = ({
  children,
  open = false,
  onClose,
  className,
  anchorRef,
  style,
}: PropsWithChildren<PopoverProps>) => {
  const ref = useClickOutside<HTMLDivElement>(onClose, anchorRef);

  return (
    <Portal mounted={open}>
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    </Portal>
  );
};
