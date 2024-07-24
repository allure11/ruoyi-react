import {request} from '@umijs/max';
import type {OnlineUserListParams} from './data.d';
import {SYSTEM_PATH} from "../../../../config/modulePath";

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

// 查询在线用户列表
export async function getOnlineUserList(params?: OnlineUserListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`${SYSTEM_PATH}/online/list?${queryString}`, {
    data: params,
    method: 'GET',
  });
}

// 强退用户
export async function forceLogout(tokenId: string) {
  return request(`${SYSTEM_PATH}/online/${tokenId}`, {
    method: 'DELETE',
  });
}
