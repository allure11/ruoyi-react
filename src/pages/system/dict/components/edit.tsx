import React, {useEffect, useRef} from 'react';
import ProForm, {ProFormText, ProFormRadio, ProFormTextArea, ProFormInstance} from '@ant-design/pro-form';
import {Form, Modal} from 'antd';
import {useIntl, FormattedMessage} from 'umi';
import type {DictTypeType} from '../data.d';

export type DictTypeFormValueType = Record<string, unknown> & Partial<DictTypeType>;

export type DictTypeFormProps = {
  onCancel: (flag?: boolean, formVals?: DictTypeFormValueType) => void;
  onSubmit: (values: DictTypeFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<DictTypeType>;
  statusOptions: any;
};

const DictTypeForm: React.FC<DictTypeFormProps> = (props) => {

  const form = useRef<ProFormInstance>();

  const {statusOptions} = props;

  useEffect(() => {
    form.current?.resetFields();
    form.current?.setFieldsValue({
      dictId: props.values.dictId,
      dictName: props.values.dictName,
      dictType: props.values.dictType,
      status: props.values.status,
      createBy: props.values.createBy,
      createTime: props.values.createTime,
      updateBy: props.values.updateBy,
      updateTime: props.values.updateTime,
      remark: props.values.remark,
    });
  }, [form, props]);

  const intl = useIntl();
  const handleOk = () => {
    form.current?.submit();
  };
  const handleCancel = () => {
    props.onCancel();
    form.current?.resetFields();
  };
  const handleFinish = (values: Record<string, any>) => {
    console.log(1)
    props.onSubmit(values as DictTypeFormValueType);
  };

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: 'system.DictType.modify',
        defaultMessage: '编辑DictType',
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <ProForm formRef={form} onFinish={handleFinish} initialValues={props.values} layout={'horizontal'}
               submitter={false}>
        <ProFormText
          name="dictId"
          label={intl.formatMessage({
            id: 'system.DictType.dict_id',
            defaultMessage: '字典主键',
          })}
          width="xl"
          placeholder="请输入字典主键"
          disabled
          hidden={!props.values.dictId}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入字典主键！" defaultMessage="请输入字典主键！"/>,
            },
          ]}
        />
        <ProFormText
          name="dictName"
          label={intl.formatMessage({
            id: 'system.DictType.dict_name',
            defaultMessage: '字典名称',
          })}
          width="xl"
          placeholder="请输入字典名称"
          rules={[
            {
              required: true,
              message: <FormattedMessage id="请输入字典名称！" defaultMessage="请输入字典名称！"/>,
            },
          ]}
        />
        <ProFormText
          name="dictType"
          label={intl.formatMessage({
            id: 'system.DictType.dict_type',
            defaultMessage: '字典类型',
          })}
          width="xl"
          placeholder="请输入字典类型"
          rules={[
            {
              required: true,
              message: <FormattedMessage id="请输入字典类型！" defaultMessage="请输入字典类型！"/>,
            },
          ]}
        />
        <ProFormRadio.Group
          valueEnum={statusOptions}
          name="status"
          label={intl.formatMessage({
            id: 'system.DictType.status',
            defaultMessage: '状态',
          })}
          width="xl"
          labelCol={{span: 24}}
          placeholder="请输入状态"
          rules={[
            {
              required: true,
              message: <FormattedMessage id="请输入状态！" defaultMessage="请输入状态！"/>,
            },
          ]}
        />
        <ProFormTextArea
          name="remark"
          label={intl.formatMessage({
            id: 'system.DictType.remark',
            defaultMessage: '备注',
          })}
          width="xl"
          placeholder="请输入备注"
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入备注！" defaultMessage="请输入备注！"/>,
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default DictTypeForm;
