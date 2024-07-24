import {downLoadXlsx} from '@/utils/downloadfile';
import {request} from '@umijs/max';
import type {NoticeType, NoticeListParams} from './data.d';
import {SYSTEM_PATH} from "../../../../config/modulePath";


// 查询通知公告列表
export async function getNoticeList(params?: NoticeListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`${SYSTEM_PATH}/notice/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询通知公告详细
export function getNotice(noticeId: number) {
  return request(`${SYSTEM_PATH}/notice/${noticeId}`, {
    method: 'GET',
  });
}

// 新增通知公告
export async function addNotice(params: NoticeType) {
  return request(`${SYSTEM_PATH}/notice`, {
    method: 'POST',
    data: params,
  });
}

// 修改通知公告
export async function updateNotice(params: NoticeType) {
  return request(`${SYSTEM_PATH}/notice`, {
    method: 'PUT',
    data: params,
  });
}

// 删除通知公告
export async function removeNotice(ids: string) {
  return request(`${SYSTEM_PATH}/notice/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出通知公告
export function exportNotice(params?: NoticeListParams) {
  return downLoadXlsx(`${SYSTEM_PATH}/notice/export`, {params}, `notice_${new Date().getTime()}.xlsx`);
}
