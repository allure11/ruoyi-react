import {downLoadXlsx} from '@/utils/downloadfile';
import {request} from '@umijs/max';
import type {RoleType, RoleListParams} from './data.d';
import {SYSTEM_PATH} from "../../../../config/modulePath";

// 查询角色信息列表
export async function getRoleList(params?: RoleListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`${SYSTEM_PATH}/role/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询角色信息详细
export function getRole(roleId: number) {
  return request(`${SYSTEM_PATH}/role/${roleId}`, {
    method: 'GET',
  });
}

// 新增角色信息
export async function addRole(params: RoleType) {
  return request(`${SYSTEM_PATH}/role`, {
    method: 'POST',
    data: params,
  });
}

// 修改角色信息
export async function updateRole(params: RoleType) {
  return request(`${SYSTEM_PATH}/role`, {
    method: 'PUT',
    data: params,
  });
}

// 删除角色信息
export async function removeRole(ids: string) {
  return request(`${SYSTEM_PATH}/role/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出角色信息
export async function exportRole(params?: RoleListParams) {
  return downLoadXlsx(`${SYSTEM_PATH}/role/export`, {params}, `role_${new Date().getTime()}.xlsx`)
}

// 获取角色菜单列表
export function getRoleMenuList(id: number) {
  return request(`${SYSTEM_PATH}/menu/roleMenuTreeselect/${id}`, {
    method: 'get',
  });
}
