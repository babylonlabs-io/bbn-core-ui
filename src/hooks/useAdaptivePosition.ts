import { RefObject, useEffect, useState } from "react";

interface Position {
  "--menu-position": string;
  "--menu-left": string;
  top: string;
  [key: string]: string;
}

interface UseAdaptivePositionOptions {
  triggerRef: RefObject<HTMLElement>;
  isOpen?: boolean;
  width?: string;
  customVariables?: Record<string, string>;
}

export function useAdaptivePosition({
  triggerRef,
  isOpen = false,
  width,
  customVariables = {},
}: UseAdaptivePositionOptions) {
  const [style, setStyle] = useState<Position>({
    "--menu-position": "absolute",
    "--menu-left": "0",
    top: "0",
  });

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const menuWidthValue = width ? parseInt(width) : triggerRect.width;

      const extraWidth = menuWidthValue - triggerRect.width;

      const spaceRight = viewportWidth - triggerRect.right;
      const spaceLeft = triggerRect.left;

      let leftPosition: string;

      if (extraWidth > 0) {
        // If menu is wider than trigger
        if (spaceRight < extraWidth / 2 && spaceLeft >= extraWidth) {
          // Not enough space on right, but enough on left - shift left
          leftPosition = `${triggerRect.right - menuWidthValue}px`;
        } else if (spaceLeft < extraWidth / 2 && spaceRight >= extraWidth) {
          // Not enough space on left, but enough on right - align left
          leftPosition = `${triggerRect.left}px`;
        } else if (spaceLeft >= extraWidth / 2 && spaceRight >= extraWidth / 2) {
          // Enough space on both sides - center align
          leftPosition = `${triggerRect.left - extraWidth / 2}px`;
        } else {
          // Not enough space on either side - adjust to fit viewport
          const maxLeft = viewportWidth - menuWidthValue;
          leftPosition = `${Math.max(0, Math.min(triggerRect.left - extraWidth / 2, maxLeft))}px`;
        }
      } else {
        leftPosition = `${triggerRect.left}px`;
      }

      setStyle({
        "--menu-position": "fixed",
        "--menu-left": leftPosition,
        top: `${triggerRect.bottom + window.scrollY}px`,
        ...customVariables,
      });
    }
  }, [isOpen, width, customVariables, triggerRef]);

  return style;
}
