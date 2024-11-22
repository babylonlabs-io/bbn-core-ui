import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";
import "./Backdrop.css";

export interface BackdropProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  open?: boolean;
}

export const Backdrop = ({ open = false, ...props }: BackdropProps) => (
  <div
    {...props}
    className={twJoin(
      "b-fixed b-inset-0 b-z-40 b-flex b-items-center b-justify-center b-bg-primary/50 b-transition-opacity b-duration-500",
      open ? "b-animate-backdrop-in" : "b-animate-backdrop-out",
      props.className,
    )}
  />
);
