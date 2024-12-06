import { useCallback, useState } from "react";

interface UseKeyboardNavigationOptions<T> {
  items: T[];
  isOpen?: boolean;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onSelect?: (item: T) => void;
  onHighlight?: (index: number) => void;
}

export function useKeyboardNavigation<T>({
  items,
  isOpen = false,
  disabled = false,
  onOpen,
  onClose,
  onSelect,
  onHighlight,
}: UseKeyboardNavigationOptions<T>) {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (!isOpen && e.key === "ArrowDown") {
        onOpen?.();
        setHighlightedIndex(0);
        onHighlight?.(0);
        return;
      }

      if (isOpen) {
        let nextIndex: number;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            nextIndex = highlightedIndex < items.length - 1 ? highlightedIndex + 1 : highlightedIndex;
            setHighlightedIndex(nextIndex);
            onHighlight?.(nextIndex);
            break;

          case "ArrowUp":
            e.preventDefault();
            nextIndex = highlightedIndex > 0 ? highlightedIndex - 1 : highlightedIndex;
            setHighlightedIndex(nextIndex);
            onHighlight?.(nextIndex);
            break;

          case "Enter":
            e.preventDefault();
            if (highlightedIndex >= 0) {
              onSelect?.(items[highlightedIndex]);
            }
            break;

          case "Escape":
            onClose?.();
            setHighlightedIndex(-1);
            onHighlight?.(-1);
            break;

          case " ":
            e.preventDefault();
            onClose?.();
            break;

          default:
            break;
        }
      } else {
        if (e.key === " ") {
          onOpen?.();
        }
      }
    },
    [isOpen, items, highlightedIndex, disabled, onOpen, onClose, onSelect, onHighlight],
  );

  return {
    highlightedIndex,
    setHighlightedIndex,
    handleKeyDown,
  };
}
