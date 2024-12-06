import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(
  onClickOutside?: () => void,
  excludeRef?: React.RefObject<HTMLElement>,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!onClickOutside) return;

      const target = event.target as Node;
      const isOutside = ref.current && !ref.current.contains(target);
      const isNotExcluded = !excludeRef?.current?.contains(target);

      if (isOutside && isNotExcluded) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClickOutside, excludeRef]);

  return ref;
}
