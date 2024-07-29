import {Gantt, Task, ViewMode} from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import React, {useEffect, useState} from "react";
import {Table, TableColumnsType} from "antd";
import {GanttDataType} from "@/components/GanttForG2/typing";

export default (): React.JSX.Element => {
  const data: GanttDataType<any>[] = [
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

  const [tasks, setTasks] = useState(data)
  const [expandedRows, setExpandedRows] = useState([]);
  const handleExpanderClick = () => {
    console.log(expandedRows)
    const newTask = []
    data.forEach(t => {
      newTask.push(t)
      if (expandedRows.includes(t.id)) {
        t.children.forEach(c => {
          newTask.push(c)
        })
      }
    })
    setTasks(newTask);
  };
  useEffect(() => {
    handleExpanderClick()
  }, [expandedRows]);

  const getStartEndDateForProject = (tasks: Task[], projectId: string) => {
    const projectTasks = tasks.filter((t) => t.project === projectId);
    let start = projectTasks[0].start;
    let end = projectTasks[0].end;

    for (let i = 0; i < projectTasks.length; i++) {
      const task = projectTasks[i];
      if (start.getTime() > task.start.getTime()) {
        start = task.start;
      }
      if (end.getTime() < task.end.getTime()) {
        end = task.end;
      }
    }
    return [start, end];
  };

  const handleTaskChange = (task: Task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t) => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = {...project, start, end};
        newTasks = newTasks.map((t) =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const listColumns: ListColumn[] = [
    {
      title: '任务名称',
      dataIndex: 'id',
      width: '150px',
    },
    {
      title: '开始时间',
      dataIndex: 'start',
      width: '150px',
      ellipsis: true,
      render: (start: Date) => {
        return start.toLocaleString()
      }
    }
  ];

  return (<>
    <Gantt tasks={tasks}
           onDateChange={handleTaskChange}
           locale='zh'
           viewMode={ViewMode.Hour}
           headerHeight={55}
           rowHeight={55}
           TaskListHeader={() => <></>}
           TaskListTable={({tasks, rowWidth}) => {
             return <Table columns={listColumns}
                           dataSource={data}
                           style={{width: 300}}
                           pagination={false}
                           expandable={{
                             expandedRowKeys: expandedRows,
                             onExpandedRowsChange: (expandedRows) => {
                               setExpandedRows(expandedRows)
                             },
                             onExpand: (expanded, record) => {
                               handleExpanderClick(record)
                             }
                           }}/>
           }}
    />
  </>)
}
