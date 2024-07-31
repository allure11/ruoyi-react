import {TableColumnsType} from "antd";
import {Task, ViewMode} from "gantt-task-react";
import {Key} from "react";


declare namespace GanttType {

  type GanttDataType<T> = Task | T;

  type GanttProps = {
    /**
     * 列
     */
    tableColumns: TableColumnsType<T>;
    /**
     * 表格宽度
     */
    tableWidth?: number;
    /**
     * 数据
     */
    data: GanttDataType<T>[];
    /**
     * 默认展开行
     */
    defaultExpandedRowKeys?: readonly Key[];
    /**
     * 展开行变化回调
     */
    onExpandedChange?: (expandedRows) => void;
    /**
     * 选中回调
     */
    handleSelect?: (task: Task, isSelected: boolean) => void;
    /**
     * 视图模式
     */
    viewMode?: ViewMode;
    /**
     * 数据修改回调
     */
    onDataChange?: (data: GanttDataType<T>[]) => void;
  }
}
