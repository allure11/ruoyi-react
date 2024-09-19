import {PlusOutlined, DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import type {FormInstance} from 'antd';
import {Button, message, Modal, Row, Col, Descriptions, Upload, Radio, theme, UploadFile} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import {useIntl, FormattedMessage, useAccess} from 'umi';
import {FooterToolbar} from '@ant-design/pro-layout';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import Card from 'antd/es/card';
import type {UserType, UserListParams} from './data.d';
import {
  getUserList,
  getUser,
  removeUser,
  addUser,
  updateUser,
  exportUser,
  updateUserPwd,
  getDeptTree, exportTemplate, importData,
} from './service';
import UpdateForm from './components/edit';
import {getDict} from '../dict/service';
import ResetPwd from './components/ResetPwd';
import DeptTree from './components/DeptTree';
import type {DataNode} from 'antd/lib/tree';
import {getPostList} from '../post/service';
import {getRoleList} from '../role/service';
import styles from "@/pages/process/basics/materiel/style.less";
import useMessage from "antd/lib/message/useMessage";

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: UserType) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addUser({...fields});
    hide();
    if (resp.code === 200) {
      message.success('添加成功');
    }
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: UserType) => {
  const hide = message.loading('正在配置');
  try {
    const resp = await updateUser(fields);
    hide();
    if (resp.code === 200) {
      message.success('配置成功');
    }
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: UserType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const resp = await removeUser(selectedRows.map((row) => row.userId).join(','));
    hide();
    if (resp.code === 200) {
      message.success('删除成功，即将刷新');
    }
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: UserType) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.userId];
    const resp = await removeUser(params.join(','));
    hide();
    if (resp.code === 200) {
      message.success('删除成功，即将刷新');
    }
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

/**
 * 导出数据
 *
 * @param id
 */
const handleExport = async () => {
  const hide = message.loading('正在导出');
  try {
    await exportUser();
    hide();
    message.success('导出成功');
    return true;
  } catch (error) {
    hide();
    message.error('导出失败，请重试');
    return false;
  }
};

const UserTableList: React.FC = () => {

  const {useToken} = theme;
  const {token} = useToken();
  const [messageApi, messageContext] = useMessage();
  const formTableRef = useRef<FormInstance>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resetPwdModalVisible, setResetPwdModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<UserType>();
  const [selectedRowsState, setSelectedRows] = useState<UserType[]>([]);

  const [selectDept, setSelectDept] = useState<any>({id: 0});

  const [sexOptions, setSexOptions] = useState<any>([]);
  const [statusOptions, setStatusOptions] = useState<any>([]);

  const [postIds, setPostIds] = useState<string[]>();
  const [postList, setPostList] = useState<string[]>();
  const [roleIds, setRoleIds] = useState<string[]>();
  const [roleList, setRoleList] = useState<string[]>();
  const [deptTree, setDeptTree] = useState<DataNode[]>();
  const [editType, setEditType] = useState<string>('add')

  const access = useAccess();

  const [modal, contextHolder] = Modal.useModal();
  const [uploadParam, setUploadParam] = React.useState<{
    file: UploadFile[];
    updateSupport: any;
  }>({
    file: [],
    updateSupport: 1
  });

  const [editModal, setEditModal] = React.useState<any>({
    title: '导入',
    open: false,
    hideModal: () => {
      setEditModal({...editModal, open: false})
    },
    onOk: () => {
    },
    initialValues: {state: true},
    okText: '确认',
    cancelText: '取消',
  })

  /** 国际化配置 */
  const intl = useIntl();

  useEffect(() => {
    getDict('sys_user_sex').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setSexOptions(opts);
      }
    });
    getDict('sys_normal_disable').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setStatusOptions(opts);
      }
    });
  }, []);

  const columns: ProColumns<UserType>[] = [
    {
      title: <FormattedMessage id="system.User.user_id" defaultMessage="编号"/>,
      dataIndex: 'userId',
      valueType: 'textarea',
      hideInSearch: true,
      ellipsis: true,
      width: 70
    },
    {
      title: <FormattedMessage id="system.User.dept_id" defaultMessage="部门ID"/>,
      dataIndex: 'deptId',
      valueType: 'select',
      hideInSearch: true,
      ellipsis: true,
      width: 100,
      render: (_, record) => {
        return record.dept?.deptName;
      },
    },
    {
      title: <FormattedMessage id="system.User.user_name" defaultMessage="用户账号"/>,
      dataIndex: 'userName',
      valueType: 'text',
      ellipsis: true,
      width: 100
    },
    {
      title: <FormattedMessage id="system.User.nick_name" defaultMessage="用户昵称"/>,
      dataIndex: 'nickName',
      valueType: 'text',
      hideInSearch: true,
      ellipsis: true,
      width: 100
    },
    {
      title: <FormattedMessage id="system.User.email" defaultMessage="用户邮箱"/>,
      dataIndex: 'email',
      valueType: 'text',
      hideInSearch: true,
      ellipsis: true,
      width: 100
    },
    {
      title: <FormattedMessage id="system.User.phonenumber" defaultMessage="手机号码"/>,
      dataIndex: 'phonenumber',
      valueType: 'text',
      ellipsis: true,
      width: 100
    },
    {
      title: <FormattedMessage id="system.User.status" defaultMessage="帐号状态"/>,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusOptions,
      ellipsis: true,
      width: 80
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作"/>,
      dataIndex: 'option',
      width: 190,
      fixed: 'right',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          key="edit"
          hidden={!access.hasPerms('system:user:edit')}
          onClick={() => {
            const fetchUserInfo = async (userId: number) => {
              setEditType('edit');
              const res = await getUser(userId);
              setPostIds(res.postIds);
              setPostList(
                res.posts.map((item: any) => {
                  return {
                    value: item.postId,
                    label: item.postName,
                  };
                }),
              );
              setRoleIds(res.roleIds);
              setRoleList(
                res.roles.map((item: any) => {
                  return {
                    value: item.roleId,
                    label: item.roleName,
                  };
                }),
              );
            };
            fetchUserInfo(record.userId);
            getDeptTree({}).then((treeData) => {
              setDeptTree(treeData);
            });
            setModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="编辑"/>
        </Button>,
        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          hidden={!access.hasPerms('system:user:remove')}
          onClick={async () => {
            modal.confirm({
              title: '删除',
              content: '确定删除该项吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await handleRemoveOne(record);
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
        >
          <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除"/>
        </Button>,
        <Button
          type="link"
          size="small"
          key="resetpwd"
          hidden={!access.hasPerms('system:user:edit')}
          onClick={() => {
            setResetPwdModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="system.User.reset.password" defaultMessage="密码重置"/>
        </Button>,
      ],
    },
  ];

  return (
    <>
      <Row gutter={[16, 24]} wrap={false}>
        <Col lg={6} md={24} style={{minWidth: 280}}>
          <Card>
            <DeptTree
              onSelect={async (value: any) => {
                setSelectDept(value);
                if (actionRef.current) {
                  formTableRef?.current?.submit();
                }
              }}
            />
          </Card>
        </Col>
        <Col lg={18} md={24}>
          <ProTable<UserType>
            headerTitle={intl.formatMessage({
              id: 'pages.searchTable.title',
              defaultMessage: '信息',
            })}
            scroll={{x: 800}}
            actionRef={actionRef}
            formRef={formTableRef}
            rowKey="userId"
            key="userList"
            search={{
              labelWidth: 120,
            }}
            toolBarRender={() => [
              <Button
                type="primary"
                key="add"
                hidden={!access.hasPerms('system:user:add')}
                onClick={async () => {
                  if (selectDept.id === '' || selectDept.id == null) {
                    message.warning('请选择左侧父级节点');
                  } else {
                    setEditType('add')
                    getDeptTree({}).then((treeData) => {
                      setDeptTree(treeData);
                      setCurrentRow(undefined);
                      setModalVisible(true);
                    });
                    getPostList().then((res) => {
                      if (res.code === 200) {
                        setPostList(
                          res.rows.map((item: any) => {
                            return {
                              value: item.postId,
                              label: item.postName,
                            };
                          }),
                        );
                      }
                    });
                    getRoleList().then((res) => {
                      if (res.code === 200) {
                        setRoleList(
                          res.rows.map((item: any) => {
                            return {
                              value: item.roleId,
                              label: item.roleName,
                            };
                          }),
                        );
                      }
                    });
                  }
                }}
              >
                <PlusOutlined/>{' '}
                <FormattedMessage id="pages.searchTable.new" defaultMessage="新建"/>
              </Button>,
              <Button
                type="primary"
                key="remove"
                hidden={selectedRowsState?.length === 0 || !access.hasPerms('system:user:remove')}
                onClick={async () => {
                  modal.confirm({
                    title: '删除',
                    content: '确定删除该项吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                      const success = await handleRemove(selectedRowsState);
                      if (success) {
                        setSelectedRows([]);
                        actionRef.current?.reloadAndRest?.();
                      }
                    },
                  });
                }}
              >
                <DeleteOutlined/>
                <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除"/>
              </Button>,
              <Button type="primary" key="primary" onClick={async () => {
                setEditModal({
                  ...editModal, open: true
                });
              }}>
                导入
              </Button>,
              <Button
                type="primary"
                key="export"
                hidden={!access.hasPerms('system:user:export')}
                onClick={async () => {
                  handleExport();
                }}
              >
                <PlusOutlined/>
                <FormattedMessage id="pages.searchTable.export" defaultMessage="导出"/>
              </Button>,
            ]}
            request={(params) =>
              getUserList({...params, deptId: selectDept.id} as UserListParams).then((res) => {
                return {
                  data: res.rows,
                  total: res.total,
                  success: true,
                };
              })
            }
            columns={columns}
            rowSelection={{
              onChange: (_, selectedRows) => {
                setSelectedRows(selectedRows);
              },
            }}
          />
        </Col>
      </Row>
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择"/>
              <a style={{fontWeight: 600}}>{selectedRowsState.length}</a>
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项"/>
            </div>
          }
        >
          <Button
            key="remove"
            hidden={!access.hasPerms('system:user:remove')}
            onClick={async () => {
              modal.confirm({
                title: '删除',
                content: '确定删除该项吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                  const success = await handleRemove(selectedRowsState);
                  if (success) {
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                  }
                },
              });
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除"/>
          </Button>
        </FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (values) => {
          let success = false;
          if (values.userId) {
            success = await handleUpdate({...values} as UserType);
          } else {
            success = await handleAdd({...values} as UserType);
          }
          if (success) {
            setModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setModalVisible(false);
          setCurrentRow(undefined);
        }}
        open={modalVisible}
        values={currentRow || {}}
        sexOptions={sexOptions}
        statusOptions={statusOptions}
        posts={postList || []}
        postIds={postIds || []}
        roles={roleList || []}
        roleIds={roleIds || []}
        depts={deptTree || []}
      />

      <ResetPwd
        onSubmit={async (value: any) => {
          const success = await updateUserPwd(value.oldPassword, value.newPassword);
          if (success) {
            setResetPwdModalVisible(false);
            setSelectedRows([]);
            setCurrentRow(undefined);
            message.success('密码重置成功。');
          }
        }}
        onCancel={() => {
          setResetPwdModalVisible(false);
          setSelectedRows([]);
          setCurrentRow(undefined);
        }}
        resetPwdModalVisible={resetPwdModalVisible}
        values={currentRow || {}}
      />


      <Modal
        title={editModal.title}
        open={editModal.open}
        onOk={() => {
          if (uploadParam.file.length === 0) {
            messageApi.warning('请选择文件');
            return
          }
          importData({...uploadParam, file: uploadParam.file[0]}).then(res => {
            if (res.code === 200) {
              messageApi.success(res.msg);
              setEditModal({...editModal, open: false});
              actionRef.current?.reload();
            } else {
              messageApi.warning(res.msg);
            }
          })
        }}
        onCancel={editModal.hideModal}
        okText={editModal.okText}
        cancelText={editModal.cancelText}
      >
        <Descriptions
          column={1}
          labelStyle={{
            color: token.colorText
          }}
          items={[
            {
              key: '1',
              label: '下载导入模板',
              children: <a onClick={() => {
                exportTemplate()
              }}>用户导入模板.xlsx</a>,
            },
            {
              key: '2',
              label: (<span className={styles.requiredField}>选择文件</span>),
              children: <>
                <Upload
                  onRemove={(file) => {
                    const index = uploadParam.file.indexOf(file);
                    const newFileList = uploadParam.file.slice();
                    newFileList.splice(index, 1);
                    setUploadParam({...uploadParam, file: [...newFileList]});
                  }}
                  beforeUpload={(file) => {
                    setUploadParam({...uploadParam, file: [file]});
                    return false;
                  }}
                  fileList={uploadParam.file}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined/>} size="small">上传</Button>
                </Upload></>,
            },
            {
              key: '3',
              label: '是否更新已经存在的用户数据',
              children: <>
                <Radio.Group onChange={(value) => {
                  setUploadParam({...uploadParam, updateSupport: value.target.value})
                }} value={uploadParam.updateSupport}>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </>,
            },]}/>
      </Modal>
      {contextHolder}
      {messageContext}
    </>
  );
};

export default UserTableList;
