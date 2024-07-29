import {TableColumnsType} from "antd";

declare namespace GanttType {
  type GanttDataType<T> = DataType | TableColumnsType<T>;

  type DataType = {
    start: string;
    end: string;
    name: string;
    id: string;
    status: number;
    type: string;
    progress: number;
    isDisabled: boolean;
    styles: any;
  }
}
