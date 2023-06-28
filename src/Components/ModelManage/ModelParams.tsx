import { FormControl, FormLabel, Input, Sheet } from "@mui/joy";
import { FC, useMemo } from "react";
import i18n from "@/Constants/Lang/zh-CN";
import FormInput from "../General/FormInput";

interface IProps {
  readonly?: boolean;
  params: IModelParam;
}

const ModelParams: FC<IProps> = ({ params, readonly = false }) => {
  const entries = useMemo(() => Object.entries(params), [params]);
  return (
    <>
      {entries.map(([label, value]) => (
        <Sheet sx={{ my: 1.5 }}>
          <FormInput
            name={label}
            label={i18n[label] ?? label}
            initValue={value}
            disabled={readonly}
            labelWidth={150}
            inputWidth={400}
          />
        </Sheet>
      ))}
    </>
  );
};

export default ModelParams;
