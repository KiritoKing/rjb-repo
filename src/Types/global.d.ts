interface IFileInfo {
  title: string;
  status: "ok" | "error" | "pending";
  blob: Blob;
}

interface IStringDict {
  [key: string]: string;
}
