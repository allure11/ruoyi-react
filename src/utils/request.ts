// /* eslint-disable @typescript-eslint/dot-notation */
// /** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
// import { extend } from 'umi-request';
// import { history } from 'umi';
// import { message, notification } from 'antd';
// import { clearSessionToken, getAccessToken, getRefreshToken, getTokenExpireTime } from '../access';
// import { LoginPageUrl } from './utils';
// import defaultSettings from '../../config/defaultSettings';
// import {RequestConfig} from "@umijs/max";
// import {errorConfig} from "@/requestErrorConfig";
//
import { request } from '@umijs/max';
export default request;

//
// /** 异常处理程序 */
// const errorHandler = (error: { response: Response }): Response => {
//   const { response } = error;
//   if (response && response.status) {
//     const errorText = codeMessage[response.status] || response.statusText;
//     const { status, url } = response;
//
//     notification.error({
//       message: `请求错误 ${status}: ${url}`,
//       description: errorText,
//     });
//   } else if (!response) {
//     notification.error({
//       description: '您的网络发生异常，无法连接服务器',
//       message: '网络异常',
//     });
//   }
//   return response;
// };
//
// function createClient () {
//   /** 配置request请求时的默认参数 */
//   return extend({
//     errorHandler, // 默认错误处理
//     credentials: 'include', // 默认请求是否带上cookie
//     prefix: "/",
//   });
// }
//
// /**
//  * @name request 配置，可以配置错误处理
//  * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
//  * @doc https://umijs.org/docs/max/request#配置
//  */
// // 更换令牌的时间区间
// const checkRegion = 5 * 60 * 1000;
// export const request: RequestConfig = {
//   baseURL: 'http://127.0.0.1:8000',
//   errorConfig,
//   requestInterceptors: [(url: string, options: any) => {
//     // console.log('-------------------------')
//     console.log('request:', url);
//     const headers = options.headers ? options.headers : [];
//     if (headers['Authorization'] === '' || headers['Authorization'] == null) {
//       const expireTime = getTokenExpireTime();
//       if (expireTime) {
//         const left = Number(expireTime) - new Date().getTime();
//         const refreshToken = getRefreshToken();
//         if (left < checkRegion && refreshToken) {
//           if (left < 0) {
//             clearSessionToken();
//             history.push(LoginPageUrl);
//           }
//         } else {
//           const accessToken = getAccessToken();
//           if (accessToken) {
//             headers['Authorization'] = `Bearer ${accessToken}`;
//           }
//         }
//       } else {
//         clearSessionToken();
//         history.push(LoginPageUrl);
//         return {url:"",
//           options:""};
//       }
//       // console.log(headers)
//       return {
//         url,
//         options: {...options, headers},
//       };
//     } else {
//       return {
//         url,
//         options,
//       };
//     }
//   }],
//   responseInterceptors:[
//     (response) => {
//       const {status} = response;
//       if (status === 401 || status === 403) {
//         const msg = codeMessage[status] || codeMessage[10000]
//         message.warning(`${status} ${msg}`)
//       }
//       return response;
//     }
//   ]
// }
