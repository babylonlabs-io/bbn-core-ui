import { forwardRef, type DetailedHTMLProps, type InputHTMLAttributes, type ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import "./Input.css";

export interface InputProps
  extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "prefix" | "suffix"> {
  className?: string;
  wrapperClassName?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  state?: "default" | "error" | "warning";
  stateText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, wrapperClassName, prefix, suffix, disabled = false, state = "default", stateText, ...props }, ref) => {
    return (
      <div className={twJoin("bbn-input", wrapperClassName)}>
        <div className={twJoin("bbn-input-wrapper", disabled && "bbn-input-disabled", `bbn-input-${state}`)}>
          {prefix && <div className="bbn-input-prefix">{prefix}</div>}
          <input ref={ref} className={twJoin("bbn-input-field", className)} disabled={disabled} {...props} />
          {suffix && <div className="bbn-input-suffix">{suffix}</div>}
        </div>
        {stateText && (
          <span className={twJoin("bbn-input-state-text", `bbn-input-state-text-${state}`)}>{stateText}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
