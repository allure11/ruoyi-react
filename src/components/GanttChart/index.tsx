import {Gantt, Task, ViewMode} from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import React, {Key, useEffect, useState} from "react";
import {Table} from "antd";
import {GanttType} from "@/components/GanttChart/typing";

export default ({
                  tableColumns,
                  data,
                  defaultExpandedRowKeys = [],
                  onExpandedChange = (expandedRows) => {
                  },
                  viewMode = ViewMode.Day
                }: GanttType.GanttProps): React.JSX.Element => {


  const [tasks, setTasks] = useState(data)
  const [expandedRows, setExpandedRows] = useState<readonly Key[]>(defaultExpandedRowKeys);

  /**
   * 展开
   */
  const handleExpanderClick = () => {
    const newTask: Task[] = []
    data.forEach(task => {
      newTask.push(task)
      if (expandedRows.includes(task.id)) {
        task.children.forEach((children: Task) => {
          newTask.push(children)
        })
      }
    })
    setTasks(newTask);
  };
  useEffect(() => {
    handleExpanderClick()
  }, [expandedRows]);


  /**
   * 重新获取项目开始结束时间
   * @param tasks
   * @param projectId
   */
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

  /**
   * 拖动调整任务时间
   * @param task
   */
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


  return (<>
    <Gantt tasks={tasks}
           onDateChange={handleTaskChange}
           locale='zh'
           viewMode={viewMode}
           headerHeight={55}
           rowHeight={55}
           TaskListHeader={() => <></>}
           TaskListTable={(params) => {
             return <Table columns={tableColumns}
                           dataSource={data}
                           style={{width: 300}}
                           pagination={false}
                           expandable={{
                             expandedRowKeys: expandedRows,
                             onExpandedRowsChange: (expandedRows) => {
                               setExpandedRows(expandedRows);
                               onExpandedChange(expandedRows)
                             }
                           }}/>
           }}
    />
  </>)
}
