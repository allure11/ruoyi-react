import {downLoadXlsx} from '@/utils/downloadfile';
import {request} from '@umijs/max';
import {formatTreeSelectData} from '@/utils/utils';
import type {DataNode} from 'antd/lib/tree';
import type {UserType, UserListParams} from './data.d';
import {SYSTEM_PATH} from "../../../../config/modulePath";

// 查询用户信息列表
export async function getUserList(params?: UserListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`${SYSTEM_PATH}/user/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询用户信息详细
export function getUser(userId: number) {
  return request(`${SYSTEM_PATH}/user/${userId}`, {
    method: 'GET',
  });
}

// 新增用户信息
export async function addUser(params: UserType) {
  return request(`${SYSTEM_PATH}/user`, {
    method: 'POST',
    data: params,
  });
}

// 修改用户信息
export async function updateUser(params: UserType) {
  return request(`${SYSTEM_PATH}/user`, {
    method: 'PUT',
    data: params,
  });
}

// 删除用户信息
export async function removeUser(ids: string) {
  return request(`${SYSTEM_PATH}/user/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出用户信息
export function exportUser(params?: UserListParams) {
  return downLoadXlsx(`${SYSTEM_PATH}/user/export`, {params}, `user_${new Date().getTime()}.xlsx`);
}

export function updateUserProfile(data: API.CurrentUser) {
  return request(`${SYSTEM_PATH}/user/profile`, {
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword,
    newPassword
  }
  return request(`${SYSTEM_PATH}/user/profile/updatePwd`, {
    method: 'put',
    params: data
  })
}

// 用户头像上传
export function uploadAvatar(data: any) {
  return request(`${SYSTEM_PATH}/user/profile/avatar`, {
    method: 'post',
    data: data
  })
}

// 获取数据列表
export function getDeptTree(params: any): Promise<DataNode[]> {
  return new Promise((resolve) => {
    const queryString = new URLSearchParams(params).toString();
    request(`${SYSTEM_PATH}/user/deptTree?${queryString}`, {
      method: 'get',
    }).then((res) => {
      if (res && res.code === 200) {
        const treeData = formatTreeSelectData(res.data);
        resolve(treeData);
      } else {
        resolve([]);
      }
    });
  });
}
