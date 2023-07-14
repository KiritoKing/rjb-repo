import { Sheet, Typography } from "@mui/joy";
import UploadButton from "./UploadButton";
import { useCallback, useEffect, useState } from "react";
import FileList from "./FileList";
import useCsv from "@/Hooks/useCsv";
import useGlobalState from "@/Hooks/useGlobalState";
import useAxios from "@/Hooks/useAxios";
import useApi from "@/Hooks/useApi";
import { toast } from "sonner";
import { useImmer } from "use-immer";

const FileManager = () => {
  // const setTableData = useStore((state) => state.setTableData);
  const [csvFiles, setCsvFiles] = useImmer<CsvFileItem[]>([]);

  const appendCsv = useCallback(
    (raw: File) => {
      const item: CsvFileItem = {
        title: raw.name,
        blob: raw,
        status: "pending",
      };
      setCsvFiles((draft) => {
        draft.push(item);
      });
    },
    [setCsvFiles]
  );

  const api = useApi("", 5000);

  const handleUpload = async (file: File) => {
    appendCsv(file);
    // 上传文件
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { status, data: resp } = await api.post<
        AxiosResponse<UploadResponse>
      >("model/fileUpload", formData);
      if (status === 200) {
        const { code, data, msg } = resp;
        if (code !== 0 || !data) {
          throw new Error(msg);
        } else {
          setCsvFiles((draft) => {
            draft.forEach((item) => {
              if (item.blob === file) {
                item.status = "ok";
                item.id = data.fileId;
                item.previewData = {
                  columns: data.columns,
                  data: data.preview,
                };
              }
            });
          });
          toast.success("上传成功");
        }
      }
    } catch (e) {
      setCsvFiles((draft) => {
        draft.forEach((item) => {
          if (item.blob === file) {
            item.status = "error";
          }
        });
      });
      console.log(e);
      if (e instanceof Error) {
        toast.error(`上传失败：${e.message}`);
      }
    }
  };

  const handleDelete = async (index: number) => {
    const { id } = csvFiles[index];
    if (!id) {
      setCsvFiles((draft) => {
        draft.splice(index, 1);
      });
      toast.success("删除成功");
    } else {
      try {
        const { status, data: resp } = await api.post<AxiosResponse<null>>(
          "model/fileRemove",
          {},
          { params: { id } }
        );
        if (status === 200) {
          const { code, msg } = resp;
          if (code !== 0) {
            throw new Error(msg);
          } else {
            setCsvFiles((draft) => {
              draft.splice(index, 1);
            });
            toast.success("删除成功");
          }
        }
      } catch (e) {
        console.log(e);
        if (e instanceof Error) {
          toast.error(`删除失败：${e.message}`);
        }
      }
    }
    console.log(id);
  };

  return (
    <Sheet sx={{ mt: 2 }}>
      <Sheet
        sx={{
          mx: 2,
          px: 4,
          py: 2,
          border: "1px dashed gray",
          borderRadius: "10px",
        }}
      >
        <Sheet sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography sx={{ flex: 1 }} level="h5" component="span">
            选择要上传的文件
          </Typography>
          <UploadButton onUpload={handleUpload} />
        </Sheet>
        <FileList files={csvFiles} onDeleteItem={handleDelete} />
      </Sheet>
    </Sheet>
  );
};

export default FileManager;
