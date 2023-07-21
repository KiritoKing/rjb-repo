import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  username?: string;
  tableData: ITableData;
  rawDataLength?: number; // 非预测数据（输入数据的长度）
};

type Actions = {
  setUsername: (username?: string) => void;
  pushTableData: (data: TableRow[]) => void;
  setTableData: (data?: ITableData) => void;
};

const useGlobalState = create(
  immer<State & Actions>((set) => {
    return {
      tableData: {
        columns: [],
        data: [],
      },
      setUsername(username) {
        set(() => ({ username }));
      },
      pushTableData: (data) => {
        set((state) => {
          state.tableData.data.push(...data); // with immer
        });
      },
      setTableData: (data) => {
        if (!data) {
          set(() => ({ tableData: { columns: [], data: [] } }));
          return;
        }
        set(() => ({ tableData: data, rawDataLength: data.data.length }));
      },
    };
  })
);

export default useGlobalState;
