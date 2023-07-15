import { FormControl, FormLabel, Input, Sheet } from "@mui/joy";
import { FC, useMemo } from "react";
import i18n from "@/Constants/Lang/zh-CN";
import FormInput from "../General/FormInput";
import { produce } from "immer";

interface IProps {
  readonly?: boolean;
  params: TrainParams;
  onChange?: (params: TrainParams) => void;
}

const ModelParams: FC<IProps> = ({ params, readonly = false, onChange }) => {
  const entries = useMemo(() => Object.entries(params), [params]);
  return (
    <>
      {entries.map(([label, value]) => (
        <Sheet key={label} sx={{ my: 1.5 }}>
          <FormInput
            required
            name={label}
            label={i18n[label] ?? label}
            initValue={value}
            disabled={readonly}
            labelWidth={150}
            inputWidth={400}
            onChange={(e) => {
              const newState = produce(params, (draft) => {
                draft[label] = e;
              });
              onChange?.(newState);
            }}
          />
        </Sheet>
      ))}
    </>
  );
};

export default ModelParams;
