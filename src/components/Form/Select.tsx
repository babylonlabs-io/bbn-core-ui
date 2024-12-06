import {
  forwardRef,
  useCallback,
  useRef,
  type DetailedHTMLProps,
  type SelectHTMLAttributes,
  type ReactNode,
} from "react";
import { twJoin } from "tailwind-merge";
import { RiArrowDownSLine } from "react-icons/ri";
import { Popover } from "@/components/Popover";
import { useControlledState } from "@/hooks/useControlledState";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useAdaptivePosition } from "@/hooks/useAdaptivePosition";
import "./Select.css";

export interface SelectOption {
  value: string;
  label: string;
}
export interface SelectProps
  extends Omit<DetailedHTMLProps<SelectHTMLAttributes<HTMLDivElement>, HTMLDivElement>, "value" | "onChange"> {
  options: SelectOption[];
  open?: boolean;
  defaultOpen?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
  placeholder?: string;
  selectWidth?: string;
  menuWidth?: string;
  disabled?: boolean;
  renderSelected?: (option: SelectOption) => ReactNode;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      options,
      value,
      defaultValue,
      onChange,
      placeholder = "Select option",
      open,
      defaultOpen,
      selectWidth,
      menuWidth,
      disabled,
      renderSelected,
      ...props
    },
    ref,
  ) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useControlledState({
      value: open,
      defaultValue: defaultOpen,
    });

    const [selectedValue, setSelectedValue] = useControlledState({
      value,
      defaultValue,
      onStateChange: onChange,
    });

    const selectedOption = options.find((option) => option.value === selectedValue);

    const handleSelect = useCallback(
      (option: SelectOption) => {
        setSelectedValue(option.value);
        setIsOpen(false);
      },
      [setSelectedValue, setIsOpen],
    );

    const handleClose = useCallback(() => {
      setIsOpen(false);
    }, [setIsOpen]);

    const { highlightedIndex, handleKeyDown } = useKeyboardNavigation({
      items: options,
      isOpen,
      disabled,
      onOpen: () => !disabled && setIsOpen(true),
      onClose: () => {
        setIsOpen(false);
      },
      onSelect: handleSelect,
    });

    const menuStyle = useAdaptivePosition({
      triggerRef,
      isOpen,
      width: menuWidth,
      customVariables: {
        "--component-width": triggerRef.current ? `${triggerRef.current.getBoundingClientRect().width}px` : "auto",
        "--menu-width": menuWidth || "var(--component-width)",
      },
    });

    return (
      <div className="bbn-select" ref={ref} style={{ width: selectWidth || "auto" }}>
        <div
          ref={triggerRef}
          className={twJoin("bbn-select-trigger", disabled && "bbn-select-disabled", className)}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          {...props}
        >
          <span>
            {selectedOption ? (renderSelected ? renderSelected(selectedOption) : selectedOption.label) : placeholder}
          </span>
          <RiArrowDownSLine className={twJoin("bbn-select-icon", isOpen && "bbn-select-icon-open")} size={20} />
        </div>

        <Popover
          open={isOpen && !disabled}
          onClose={handleClose}
          anchorRef={triggerRef}
          className="bbn-select-menu"
          style={menuStyle}
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              className={twJoin(
                "bbn-select-option",
                selectedOption?.value === option.value && "bbn-select-option-selected",
                highlightedIndex === index && "bbn-select-option-highlighted",
              )}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </Popover>
      </div>
    );
  },
);

Select.displayName = "Select";
