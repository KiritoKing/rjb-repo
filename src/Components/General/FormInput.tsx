import { FormControl, FormLabel, Input, Typography } from "@mui/joy";
import { FC, HTMLInputTypeAttribute } from "react";

interface IProps {
  name: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  initValue?: string | number;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  onReturn?: () => void;
  labelWidth?: number;
  inputWidth?: number;
}

const FormInput: FC<IProps> = ({
  name,
  label,
  type = "text",
  required,
  initValue,
  disabled,
  labelWidth,
  inputWidth,
  onChange,
  onReturn,
}) => {
  return (
    <FormControl
      required={required}
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Typography
        component={FormLabel}
        sx={{ mr: 2, pt: 1.2, width: labelWidth && `${labelWidth}px` }}
      >
        {label ?? name}
      </Typography>
      <Input
        name={name}
        type={type}
        defaultValue={initValue}
        disabled={disabled}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onReturn?.();
          }
        }}
        sx={{ width: inputWidth && `${inputWidth}px` }}
      />
    </FormControl>
  );
};

export default FormInput;
