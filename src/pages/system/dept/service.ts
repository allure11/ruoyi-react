import {downLoadXlsx} from '@/utils/downloadfile';
import {request} from '@umijs/max';
import type {DeptType, DeptListParams} from './data.d';
import {SYSTEM_PATH} from "../../../../config/modulePath";

// 查询部门列表
export async function getDeptList(params?: DeptListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`${SYSTEM_PATH}/dept/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询部门列表（排除节点）
export function getDeptListExcludeChild(deptId: number) {
  return request(`${SYSTEM_PATH}/dept/list/exclude/${deptId}`, {
    method: 'get',
  });
}

// 查询部门详细
export function getDept(deptId: number) {
  return request(`${SYSTEM_PATH}/dept/${deptId}`, {
    method: 'GET',
  });
}

// 新增部门
export async function addDept(params: DeptType) {
  return request(`${SYSTEM_PATH}/dept`, {
    method: 'POST',
    data: params,
  });
}

// 修改部门
export async function updateDept(params: DeptType) {
  return request(`${SYSTEM_PATH}/dept`, {
    method: 'PUT',
    data: params,
  });
}

// 删除部门
export async function removeDept(ids: string) {
  return request(`${SYSTEM_PATH}/dept/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出部门
export function exportDept(params?: DeptListParams) {
  return downLoadXlsx(`${SYSTEM_PATH}/dept/export`, {params}, `dept_${new Date().getTime()}.xlsx`);
}
