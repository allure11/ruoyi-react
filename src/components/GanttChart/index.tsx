import {Gantt, Task, ViewMode} from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import React, {Key, useEffect, useState} from "react";
import {Table} from "antd";
import {GanttType} from "@/components/GanttChart/typing";

/**
 * @author IronMan
 * 甘特图
 */
export default ({
                    tableColumns,
                    tableWidth = 300,
                    data,
                    defaultExpandedRowKeys = [],
                    onExpandedChange = (expandedRows) => {
                    },
                    handleSelect = (task, isSelected) => {
                    },
                    onDataChange = (data) => {
                    },
                    viewMode = ViewMode.Day
                }: GanttType.GanttProps): React.JSX.Element => {
    const [tasks, setTasks] = useState<GanttType.GanttDataType<any>>(data)
    const [expandedRows, setExpandedRows] = useState<readonly Key[]>(defaultExpandedRowKeys);
    const [newData, setNewData] = useState<GanttType.GanttDataType<any>>(data)

    useEffect(() => {
        handleExpanderClick()
    }, [expandedRows]);
    useEffect(() => {
        onDataChange(newData);
    }, [newData]);

    /**
     * 展开
     */
    const handleExpanderClick = () => {
        const newTask: Task[] = []
        newData.forEach((task: GanttType.GanttDataType<any>) => {
            newTask.push(task)
            if (expandedRows.includes(task.id)) {
                task.children.forEach((children: Task) => {
                    newTask.push(children)
                })
            }
        })
        setTasks(newTask);
    };

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
        let newTasks = tasks.map((t: Task) => (t.id === task.id ? task : t));
        setNewData(changeData(task, data))
        if (task.project) {
            const [start, end] = getStartEndDateForProject(newTasks, task.project);
            const project =
                newTasks[newTasks.findIndex((t: Task) => t.id === task.project)];
            if (project.start.getTime() !== start.getTime() || project.end.getTime() !== end.getTime()) {
                const changedProject = {...project, start, end};
                setNewData(changeData(changedProject, data))
                newTasks = newTasks.map((t: Task) =>
                    t.id === task.project ? changedProject : t
                );
            }
        }
        setTasks(newTasks);
    };

    /**
     * 更改表格数据起始时间
     * @param task
     * @param children
     */
    const changeData = (task: GanttType.GanttDataType<any>, children: GanttType.GanttDataType<any>[]) => {
        // 检查输入是否有效
        if (!children || !Array.isArray(children)) {
            throw new Error("Invalid input: children must be an array.");
        }
        return children.map((item) => {
            if (item.id === task.id) {
                return {...item, start: task.start, end: task.end};
            } else {
                if (item.children && Array.isArray(children)) {
                    item.children = changeData(task, item.children);
                }
                return item;
            }
        });
    }


    return (<>
        <Gantt tasks={tasks}
               onDateChange={handleTaskChange}
               onSelect={handleSelect}
               locale='zh'
               viewMode={viewMode}
               headerHeight={55}
               rowHeight={55}
               TaskListHeader={() => <></>}
               TaskListTable={(params) => {
                   return <Table columns={tableColumns}
                                 dataSource={newData}
                                 style={{width: tableWidth}}
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
