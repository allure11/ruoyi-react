import {TableColumnsType} from 'antd';
import React from 'react';
import {GanttData} from "@/pages/tool/builder/data";
import {GanttType} from "@/components/GanttChart/typing";
import {ViewMode} from "gantt-task-react";
import GanttChart from "@/components/GanttChart";

/**
 *
 * @author whiteshader@163.com
 *
 * */

export type FormBuilderProps = {};

const FormBuilder: React.FC<FormBuilderProps> = () => {

  const listColumns: TableColumnsType<GanttType.GanttDataType<any>> = [
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

  return (
    <>
      {/*甘特图*/}
      <GanttChart tableColumns={listColumns}
                  data={GanttData}
                  viewMode={ViewMode.Hour}
                  defaultExpandedRowKeys={['Task1']}
                  onExpandedChange={(expandedRows) => {
                    console.log(expandedRows, 111)
                  }}/>
    </>
  );
};

export default FormBuilder;
