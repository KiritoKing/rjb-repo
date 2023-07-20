import { Sheet } from "@mui/joy";
import FormInput from "@/Components/General/FormInput";
import { FC, useMemo } from "react";
import { zhCN } from "@/Constants/lang";

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
            label={zhCN[label] ?? label}
            initValue={value}
            disabled={readonly}
            labelWidth={150}
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
