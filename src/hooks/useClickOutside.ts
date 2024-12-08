import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(onClose?: () => void, excludeRef?: RefObject<HTMLElement>) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!onClose) return;

      const target = event.target as Node;
      const isOutside = ref.current && !ref.current.contains(target);
      const isNotExcluded = !excludeRef?.current?.contains(target);

      if (isOutside && isNotExcluded) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, excludeRef]);

  return [
    (node: T | null) => {
      ref.current = node;
    },
    ref,
  ] as const;
};
