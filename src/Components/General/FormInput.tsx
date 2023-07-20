import { FormControl, FormLabel, Input, Stack, Typography } from "@mui/joy";
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
  labelWidth?: number | string;
  inputWidth?: number | string;
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
      component={Stack}
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      sx={{ width: "100%" }}
    >
      <Typography
        component={FormLabel}
        sx={{
          mr: 2,
          pt: 1.2,
          width:
            typeof labelWidth === "number"
              ? `${labelWidth}px`
              : labelWidth ?? "fit-content",
        }}
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
        sx={{
          width:
            typeof inputWidth === "number"
              ? `${inputWidth}px`
              : inputWidth ?? "fit-content",
        }}
      />
    </FormControl>
  );
};

export default FormInput;
