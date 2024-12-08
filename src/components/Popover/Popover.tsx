import { ReactNode, CSSProperties, forwardRef, HTMLAttributes } from "react";
import { Portal } from "@/components/Portal";
import { useClickOutside } from "@/hooks/useClickOutside";
import "./Popover.css";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  className?: string;
  style?: CSSProperties;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, open = false, onClose, className, anchorRef, style, ...props }, ref) => {
    const [setClickOutsideRef] = useClickOutside<HTMLDivElement>(onClose, anchorRef);

    return (
      <Portal mounted={open}>
        <div
          ref={(node) => {
            setClickOutsideRef(node);
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          className={className}
          style={style}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  },
);

Popover.displayName = "Popover";
