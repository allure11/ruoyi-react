import {downLoadXlsx} from '@/utils/downloadfile';
import {request} from '@umijs/max';
import type {ConfigType, ConfigListParams} from './data.d';
import {SYSTEM_PATH} from "../../../../config/modulePath";


// 查询参数配置列表
export async function getConfigList(params?: ConfigListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`${SYSTEM_PATH}/config/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询参数配置详细
export function getConfig(configId: number) {
  return request(`${SYSTEM_PATH}/config/${configId}`, {
    method: 'GET',
  });
}

// 新增参数配置
export async function addConfig(params: ConfigType) {
  return request(`${SYSTEM_PATH}/config`, {
    method: 'POST',
    data: params,
  });
}

// 修改参数配置
export async function updateConfig(params: ConfigType) {
  return request(`${SYSTEM_PATH}/config`, {
    method: 'PUT',
    data: params,
  });
}

// 删除参数配置
export async function removeConfig(ids: string) {
  return request(`${SYSTEM_PATH}/config/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出参数配置
export function exportConfig(params?: ConfigListParams) {
  return downLoadXlsx(`${SYSTEM_PATH}/config/export`, {params}, `config_${new Date().getTime()}.xlsx`);
}
