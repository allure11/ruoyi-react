import {downLoadXlsx} from '@/utils/downloadfile';
import {request} from '@umijs/max';
import type {OperlogType, OperlogListParams} from './data.d';
import {SYSTEM_PATH} from "../../../../config/modulePath";

// 查询操作日志记录列表
export async function getOperlogList(params?: OperlogListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`${SYSTEM_PATH}/operlog/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询操作日志记录详细
export function getOperlog(operId: number) {
  return request(`${SYSTEM_PATH}/operlog/${operId}`, {
    method: 'GET',
  });
}

// 新增操作日志记录
export async function addOperlog(params: OperlogType) {
  return request(`${SYSTEM_PATH}/operlog`, {
    method: 'POST',
    data: params,
  });
}

// 修改操作日志记录
export async function updateOperlog(params: OperlogType) {
  return request(`${SYSTEM_PATH}/operlog`, {
    method: 'PUT',
    data: params,
  });
}

// 删除操作日志记录
export async function removeOperlog(ids: string) {
  return request(`${SYSTEM_PATH}/operlog/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出操作日志记录
export function exportOperlog(params?: OperlogListParams) {
  return downLoadXlsx(`${SYSTEM_PATH}/operlog/export`, {params}, `oper_log_${new Date().getTime()}.xlsx`);
}

// 清空操作日志
export async function cleanOperlog() {
  return request(`${SYSTEM_PATH}/operlog/clean`, {
    method: 'DELETE',
  });
}
