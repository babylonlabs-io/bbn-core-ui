import { forwardRef, type DetailedHTMLProps, type InputHTMLAttributes, type ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import "./Input.css";

export interface InputProps
  extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "prefix" | "suffix"> {
  className?: string;
  wrapperClassName?: string;
  decorators?: {
    prefix?: ReactNode;
    suffix?: ReactNode;
  };
  disabled?: boolean;
  state?: {
    type?: "error" | "warning";
    text?: string;
    render?: ReactNode;
  };
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, wrapperClassName, decorators, disabled = false, state, ...props }, ref) => {
    const stateClass =
      state?.type === "error" ? "bbn-input-error" : state?.type === "warning" ? "bbn-input-warning" : "";

    const stateTextClass =
      state?.type === "error"
        ? "bbn-input-state-text-error"
        : state?.type === "warning"
          ? "bbn-input-state-text-warning"
          : "";

    return (
      <div className={twJoin("bbn-input", wrapperClassName)}>
        <div className={twJoin("bbn-input-wrapper", disabled && "bbn-input-disabled", stateClass)}>
          {decorators?.prefix && <div className="bbn-input-prefix">{decorators.prefix}</div>}
          <input ref={ref} className={twJoin("bbn-input-field", className)} disabled={disabled} {...props} />
          {decorators?.suffix && <div className="bbn-input-suffix">{decorators.suffix}</div>}
        </div>
        {state?.render ??
          (state?.text && <span className={twJoin("bbn-input-state-text", stateTextClass)}>{state.text}</span>)}
      </div>
    );
  },
);

Input.displayName = "Input";
