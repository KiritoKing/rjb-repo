import { Sheet } from "@mui/joy";
import ModelParams from "./ModelParams";
import FormInput from "@/Components/General/FormInput";
import { useImmer } from "use-immer";
import { FC, useMemo, useState } from "react";
import i18n from "@/Constants/Lang/zh-CN";

import { produce } from "immer";

const ModelInfo: FC<{
  data: TrainParams;
  onChange?: (value: TrainParams) => void;
  readonly?: boolean;
}> = ({ data, onChange, readonly = false }) => {
  const entries = useMemo(() => Object.entries(data), [data]);
  return (
    <Sheet component="form" sx={{ px: 2 }}>
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
              const newState = produce(data, (draft) => {
                draft[label] = e;
              });
              onChange?.(newState);
            }}
          />
        </Sheet>
      ))}
    </Sheet>
  );
};

export default ModelInfo;
