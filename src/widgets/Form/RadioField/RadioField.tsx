import { type RadioProps, Radio } from "@/components/Form/Radio";
import { useFormContext } from "react-hook-form";

export interface RadioFieldProps extends RadioProps {
  name: string;
  value: string;
}

export function RadioField({
  name,
  id = name,
  label,
  className,
  disabled,
  value,
  defaultChecked,
  labelClassName,
  orientation,
}: RadioFieldProps) {
  const { register } = useFormContext();
  const { name: inputName, ref, onChange, onBlur } = register(name);

  return (
    <Radio
      ref={ref}
      name={inputName}
      id={id}
      label={label}
      className={className}
      disabled={disabled}
      value={value}
      defaultChecked={defaultChecked}
      labelClassName={labelClassName}
      orientation={orientation}
      inputProps={{ onChange, onBlur }}
    />
  );
}
