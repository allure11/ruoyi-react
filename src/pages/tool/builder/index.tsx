import {TableColumnsType} from 'antd';
import React, {useState} from 'react';
import {GanttData} from "@/pages/tool/builder/data";
import {GanttType} from "@/components/GanttChart/typing";
import {ViewMode} from "gantt-task-react";
import GanttChart from "@/components/GanttChart";

export type FormBuilderProps = {};

const FormBuilder: React.FC<FormBuilderProps> = () => {

    const listColumns: TableColumnsType<GanttType.GanttDataType<any>> = [
        {
            title: '任务名称',
            dataIndex: 'id',
            width: 150,
        },
        {
            title: '开始时间',
            dataIndex: 'start',
            width: 150,
            ellipsis: true,
            render: (start: Date) => {
                return start.toLocaleString()
            }
        },
        {
            title: '结束时间',
            dataIndex: 'end',
            width: 150,
            ellipsis: true,
            render: (start: Date) => {
                return start.toLocaleString()
            }
        }
    ];
    const [data, setData] = useState(GanttData);

    return (
        <>
            <GanttChart tableColumns={listColumns}
                        tableWidth={450}
                        data={data}
                        viewMode={ViewMode.Hour}
                        defaultExpandedRowKeys={['Task1']}
                        onExpandedChange={(expandedRows) => {
                            console.log(expandedRows, 111)
                        }}
                        handleSelect={(task, isSelected) => {
                            console.log(task, isSelected)
                        }}
                        onDataChange={(data) => {
                            console.log(data)
                        }}
            />
        </>
    );
};

export default FormBuilder;
