import { create } from "zustand";

interface IStore {
  username?: string;
  setUsername: (username: string) => void;
  tableData: ITableData;
  pushTableData: (data: ITableData) => void;
  clearTableData: () => void;
  setTableData: (data: ITableData) => void;
}

// TODO: 用immer和slice改造全局状态
const useGlobalState = create<IStore>()((set) => {
  return {
    setUsername(username) {
      set(() => ({ username }));
    },
    tableData: {
      columns: [],
      data: [],
    },
    pushTableData: (data) => {
      set((state) => ({
        tableData: {
          columns: data.columns,
          data: [...state.tableData.data, ...data.data],
        },
      }));
    },
    clearTableData: () => {
      set(() => ({
        tableData: {
          columns: [],
          data: [],
        },
      }));
    },
    setTableData: (data) => {
      set(() => ({ tableData: data }));
    },
  };
});

export default useGlobalState;
