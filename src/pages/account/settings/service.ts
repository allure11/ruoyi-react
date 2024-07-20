import { request } from 'umi';
import type { GeographicItemType } from './data';

export async function queryCurrentUserInfo(): Promise<{ data: API.GetUserInfoResult }> {
  return { data: await request('/getInfo') }
}

export async function queryProvince(): Promise<{ data: GeographicItemType[] }> {
  return request('/geographic/province');
}

export async function queryCity(province: string): Promise<{ data: GeographicItemType[] }> {
  return request(`/geographic/city/${province}`);
}

export async function query() {
  return request('/users');
}
