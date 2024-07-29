import {GanttType} from "@/components/GanttChart/typing";

export const GanttData: GanttType.GanttDataType<any>[] = [
  {
    key: 'Task1',
    id: 'Task1',
    type: 'project',
    // 完成度
    progress: 45,
    name: "task1",
    start: new Date("2018-04-18 03:27:49"),
    end: new Date("2018-04-18 04:34:50"),
    styles: {
      backgroundColor: '#ffde82'
    },
    children: [
      {
        key: 'Task2',
        id: 'Task2',
        type: 'task',
        // 完成度
        progress: 10,
        name: "task2",
        start: new Date("2018-04-18 03:27:49"),
        end: new Date("2018-04-18 03:41:50"),
        styles: {
          backgroundColor: '#ffde82'
        }
      },
      {
        key: 'Task3',
        id: 'Task3',
        type: 'task',
        // 完成度
        progress: 10,
        name: "task3",
        start: new Date("2018-04-18 03:27:49"),
        end: new Date("2018-04-18 03:41:50"),
        styles: {
          backgroundColor: '#ffde82'
        }
      },
      {
        key: 'Task4',
        id: 'Task4',
        type: 'task',
        // 完成度
        progress: 10,
        name: "task4",
        start: new Date("2018-04-18 03:27:49"),
        end: new Date("2018-04-18 03:41:50"),
        styles: {
          backgroundColor: '#ffde82'
        }
      }
    ]
  }
];
