import {
  forwardRef,
  useCallback,
  useRef,
  useMemo,
  type DetailedHTMLProps,
  type SelectHTMLAttributes,
  type ReactNode,
  useState,
} from "react";
import { twJoin } from "tailwind-merge";
import { RiArrowDownSLine } from "react-icons/ri";
import { Popover } from "@/components/Popover";
import { useControlledState } from "@/hooks/useControlledState";
import { usePopper } from "react-popper";
import "./Select.css";
import { usePopperUpdate } from "@/hooks/usePopperUpdate";

export interface SelectOption {
  value: string;
  label: string;
}
export interface SelectProps
  extends Omit<
    DetailedHTMLProps<SelectHTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "value" | "onChange" | "onSelect"
  > {
  options: SelectOption[];
  open?: boolean;
  defaultOpen?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  onOpen?: () => void;
  onSelect?: (value: string | number) => void;
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
      onOpen,
      onSelect,
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
    // refs
    const triggerRef = useRef<HTMLDivElement>(null);

    // state
    const [isOpen, setIsOpen] = useControlledState({
      value: open,
      defaultValue: defaultOpen,
      onStateChange: onOpen,
    });

    const [selectedValue, setSelectedValue] = useControlledState({
      value,
      defaultValue,
      onStateChange: onSelect,
    });

    const selectedOption = useMemo(
      () => options.find((option) => option.value === selectedValue),
      [options, selectedValue],
    );

    // popper
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

    const { styles, attributes, update } = usePopper(triggerRef.current, popperElement, {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 4], // set offset to 4px on y axis
          },
        },
      ],
    });

    // hook to update popper on resize
    usePopperUpdate({
      isOpen: Boolean(isOpen && !disabled),
      triggerRef,
      popperElement,
      update,
    });

    // handlers
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

    const handleOpen = useCallback(() => {
      if (!disabled) {
        setIsOpen(true);
        onOpen?.();
      }
    }, [disabled, setIsOpen, onOpen]);

    const handleClick = useCallback(() => {
      if (!isOpen) {
        handleOpen();
      } else {
        setIsOpen(false);
      }
    }, [isOpen, handleOpen, setIsOpen]);

    return (
      <div className="bbn-select" ref={ref} style={{ width: selectWidth || "auto" }}>
        <div
          ref={triggerRef}
          className={twJoin("bbn-select-trigger", disabled && "bbn-select-disabled", className)}
          onClick={handleClick}
          tabIndex={disabled ? -1 : 0}
          {...props}
        >
          <span>
            {selectedOption ? (renderSelected ? renderSelected(selectedOption) : selectedOption.label) : placeholder}
          </span>
          <RiArrowDownSLine className={twJoin("bbn-select-icon", isOpen && "bbn-select-icon-open")} size={20} />
        </div>

        <Popover
          ref={setPopperElement}
          open={isOpen && !disabled}
          onClose={handleClose}
          anchorRef={triggerRef}
          className="bbn-select-menu"
          style={{
            ...styles.popper,
            width: menuWidth || (triggerRef.current?.offsetWidth ? `${triggerRef.current.offsetWidth}px` : "auto"),
          }}
          {...attributes.popper}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={twJoin(
                "bbn-select-option",
                selectedOption?.value === option.value && "bbn-select-option-selected",
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
