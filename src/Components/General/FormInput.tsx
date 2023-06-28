import { FormControl, FormLabel, Input, Typography } from "@mui/joy";
import { FC } from "react";

interface IProps {
  name: string;
  label?: string;
  required?: boolean;
  initValue?: string | number;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  labelWidth?: number;
  inputWidth?: number;
}

const FormInput: FC<IProps> = ({
  name,
  label,
  required,
  initValue,
  disabled,
  labelWidth,
  inputWidth,
  onChange,
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
        defaultValue={initValue}
        disabled={disabled}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        sx={{ width: inputWidth && `${inputWidth}px` }}
      />
    </FormControl>
  );
};

export default FormInput;
