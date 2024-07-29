import {Card} from 'antd';
import React from 'react';
import GanttChart from "@/components/GanttChart";
import GanttForG2 from "@/components/GanttForG2";

/**
 *
 * @author whiteshader@163.com
 *
 * */

export type FormBuilderProps = {};

const FormBuilder: React.FC<FormBuilderProps> = () => {
  return (
    <>
      {/*<GanttChart/>*/}
      <GanttForG2/>
    </>
  );
};

export default FormBuilder;
