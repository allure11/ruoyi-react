import type {RequestConfig} from '@umijs/max';
import {message, notification} from 'antd';
import {clearSessionToken, getAccessToken, getRefreshToken, getTokenExpireTime} from "@/access";
import {history} from "@@/core/history";
import {LoginPageUrl} from "@/utils/utils";

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
  code?: number;
  msg?: string;
}

const codeMessage: Record<number, string> = {
  10000: '系统未知错误，请反馈给管理员',
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
// 更换令牌的时间区间
const checkRegion = 5 * 60 * 1000;
export const loginPath = '/user/login';
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const {success, data, errorCode, errorMessage, showType} =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = {errorCode, errorMessage, showType, data};
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const {errorMessage, errorCode} = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(error.response.data.msg || `Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },
  // 请求拦截器
  requestInterceptors: [
    (url: string, options: any) => {
      const headers = options.headers ? options.headers : [];
      if (headers['Authorization'] === '' || headers['Authorization'] == null) {
        const expireTime = getTokenExpireTime();
        if (expireTime) {
          const left = Number(expireTime) - new Date().getTime();
          const refreshToken = getRefreshToken();
          if (left < checkRegion && refreshToken) {
            if (left < 0) {
              clearSessionToken();
              history.push(LoginPageUrl);
            }
          } else {
            const accessToken = getAccessToken();
            if (accessToken) {
              headers['Authorization'] = `Bearer ${accessToken}`;
            }
          }
        } else {
          clearSessionToken();
          history.push(LoginPageUrl);
        }
        return {
          url,
          options: {...options, headers},
        };
      } else {
        return {
          url,
          options,
        };
      }
    }
  ],
  // 响应拦截器
  responseInterceptors: [
    (response) => {
      const {status} = response;
      if (status === 401 || status === 403) {
        const msg = codeMessage[status] || codeMessage[10000]
        message.warning(`${status} ${msg}`)
      }
      return response;
    },
    (response) => {
      const {code, msg} = response.data as ResponseStructure
      if (code === 401) {
        const msg = codeMessage[code] || codeMessage[10000]
        message.warning(`${code} ${msg}`)
        history.push(loginPath)
      }
      if (code !== 200 && msg !== undefined) {
        message.warning(msg)
      }
      return response;
    }
  ],
};
