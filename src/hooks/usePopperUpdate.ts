import { State } from "@popperjs/core";
import { useEffect } from "react";

interface UsePopperUpdateProps {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  popperElement: HTMLElement | null;
  update: (() => Promise<Partial<State>>) | null;
}

export const usePopperUpdate = ({ isOpen, triggerRef, popperElement, update }: UsePopperUpdateProps) => {
  useEffect(() => {
    if (isOpen && triggerRef.current && popperElement) {
      const updatePopper = () => {
        requestAnimationFrame(() => {
          update?.();
        });
      };
      updatePopper();

      window.addEventListener("resize", updatePopper);
      return () => window.removeEventListener("resize", updatePopper);
    }
  }, [isOpen, popperElement, update, triggerRef]);
};
