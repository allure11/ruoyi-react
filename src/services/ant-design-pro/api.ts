import {request} from '@umijs/max';
import {MenuDataItem} from "@umijs/route-utils";
import {createIcon} from "@/utils/IconUtil";
import {AUTH_PATH, CAPTCHA_IMAGE_URL, SYSTEM_PATH, GET_INFO_URL, GET_ROUTERS_URL} from "../../../config/modulePath";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    permissions?: [],
    roles?: [],
    user: API.CurrentUser;
  }>(GET_INFO_URL + '/getInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>(AUTH_PATH + '/logout', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: {
  password?: string;
  type: string;
  autoLogin?: boolean;
  uuid: string;
  username?: string
}, options?: { [p: string]: any }) {
  return request<API.LoginResult>(AUTH_PATH + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送验证码 POST /login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: Record<string, any>,
) {
  return request<API.FakeCaptcha>('/login/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取验证码 */
export async function getCaptchaImage() {
  return request(CAPTCHA_IMAGE_URL, {
    headers: {},
  })
}

/** 获取手机验证码 */
export async function getMobileCaptcha(mobile: string) {
  return request(`/login/captcha?mobile=${mobile}`);
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>(AUTH_PATH + '/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(AUTH_PATH + '/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>(AUTH_PATH + '/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>(AUTH_PATH + '/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

export async function getRouters(): Promise<API.GetRoutersResult> {
  return request(`${GET_ROUTERS_URL}/getRouters`);
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>(AUTH_PATH + '/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}

export function convertCompatRouters(childrens: API.RoutersMenuItem[]): MenuDataItem[] {
  return childrens.map((item: API.RoutersMenuItem) => {
    const meta = item.meta || {};
    return {
      path: item.path,
      icon: createIcon(meta.icon || ''),
      name: meta.title || '',
      routes: item.children ? convertCompatRouters(item.children) : undefined,
      hideChildrenInMenu: item.hidden,
      hideInMenu: item.hidden,
      component: item.component,
      authority: item.perms,
    };
  });
}

export async function getRoutersInfo(): Promise<MenuDataItem[]> {
  return getRouters().then((res) => {
    return convertCompatRouters(res.data);
  });
}

export function getMatchMenuItem(path: string, menuData: MenuDataItem[] | undefined): MenuDataItem[] {
  if (!menuData)
    return [];
  let items: MenuDataItem[] = [];
  menuData.forEach((item) => {
    if (item.path) {
      if (item.path === path) {
        items.push(item);
        return;
      }
      if (path.length >= item.path?.length) {
        const exp = `${item.path}/*`;
        if (path.match(exp)) {
          if (item.routes) {
            const subpath = path.substr(item.path.length + 1);
            const subItem: MenuDataItem[] = getMatchMenuItem(subpath, item.routes);
            items = items.concat(subItem);
          } else {
            const paths = path.split('/');
            if (paths.length >= 2 && paths[0] === item.path && paths[1] === 'index') {
              items.push(item);
            }
          }
        }
      }
    }
  });
  return items;
}
