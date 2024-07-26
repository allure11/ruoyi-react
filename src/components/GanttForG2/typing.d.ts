declare namespace Gantt {
  type GanttDataType = {
    task: string;
    startTime: string;
    endTime: string;
    status: number | string;
    range?: any[]
  }
}
