import {request} from 'umi';
import type {ListItemDataType} from './data.d';

export async function queryCurrentUserInfo(): Promise<{ data: API.GetUserInfoResult }> {
  return {data: await request('/system/user/getInfo')}
}

export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: ListItemDataType[] } }> {
  return request('/api/fake_list_Detail', {
    params,
  });
}
