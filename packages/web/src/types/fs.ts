import { RootState } from "./store";

export interface FileReadHandlers {
  onload: (result: string, event: ProgressEvent<FileReader>) => void;
  onerror: (event: ProgressEvent<FileReader>) => void;
  onprogress: (event: ProgressEvent<FileReader>) => void;
  onabort: (event: ProgressEvent<FileReader>) => void;
}

export interface URLDownload {
  name: string;
  url: string;
}

export interface FileSchema {
  encryption: Pick<RootState, 'encryption'>["encryption"];
  data: string;
}
