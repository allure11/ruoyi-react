import {downLoadXlsx} from '@/utils/downloadfile';
import {request} from '@umijs/max';
import type {MenuType, MenuListParams} from './data.d';
import {SYSTEM_PATH} from "../../../../config/modulePath";


// 查询菜单权限列表
export async function getMenuList(params?: MenuListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`${SYSTEM_PATH}/menu/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询菜单权限详细
export function getMenu(menuId: number) {
  return request(`${SYSTEM_PATH}/menu/${menuId}`, {
    method: 'GET',
  });
}

// 查询菜单权限详细
export function getMenuTree() {
  return request(`${SYSTEM_PATH}/menu/treeselect`, {
    method: 'GET',
  });
}

// 新增菜单权限
export async function addMenu(params: MenuType) {
  return request(`${SYSTEM_PATH}/menu`, {
    method: 'POST',
    data: params,
  });
}

// 修改菜单权限
export async function updateMenu(params: MenuType) {
  return request(`${SYSTEM_PATH}/menu`, {
    method: 'PUT',
    data: params,
  });
}

// 删除菜单权限
export async function removeMenu(ids: string) {
  return request(`${SYSTEM_PATH}/menu/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出菜单权限
export function exportMenu(params?: MenuListParams) {
  return downLoadXlsx(`${SYSTEM_PATH}/menu/export`, {params}, `menu_${new Date().getTime()}.xlsx`);
}
