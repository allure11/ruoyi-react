import {downLoadXlsx} from '@/utils/downloadfile';
import {request} from '@umijs/max';
import type {DictDataType, DictDataListParams} from './data.d';
import {SYSTEM_PATH} from "../../../../config/modulePath";


// 查询字典数据列表
export async function getDictDataList(params?: DictDataListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`${SYSTEM_PATH}/dict/data/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询字典数据详细
export function getDictData(dictCode: string) {
  return request(`${SYSTEM_PATH}/dict/data/${dictCode}`, {
    method: 'GET',
  });
}

// 新增字典数据
export async function addDictData(params: DictDataType) {
  return request(`${SYSTEM_PATH}/dict/data`, {
    method: 'POST',
    data: params,
  });
}

// 修改字典数据
export async function updateDictData(params: DictDataType) {
  return request(`${SYSTEM_PATH}/dict/data`, {
    method: 'PUT',
    data: params,
  });
}

// 删除字典数据
export async function removeDictData(ids: string) {
  return request(`${SYSTEM_PATH}/dict/data/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出字典数据
export function exportDictData(params?: DictDataListParams) {
  return downLoadXlsx(`${SYSTEM_PATH}/dict/data/export`, {params}, `dict_data_${new Date().getTime()}.xlsx`);
}
