// /**
//  * 系统模块路由
//  */
// export const SYSTEM_PATH: string = '${SYSTEM_PATH}';
// /**
//  * 日志模块路由
//  */
// export const MONITOR_PATH: string = '/monitor';
// /**
//  * 权限模块路由
//  */
// export const AUTH_PATH: string = '';
// /**
//  * 定时任务模块路由
//  */
// export const JOB_PATH: string = '/monitor';
// /**
//  * 登录日志路由
//  */
// export const LOG_PATH: string = '/monitor';
// /**
//  * 在线用户路由
//  */
// export const ONLINE_PATH: string = '/monitor';
// /**
//  * 验证码地址
//  */
// export const CAPTCHA_IMAGE_URL: string = '/captchaImage';
// /**
//  * 用户信息地址
//  */
// export const GET_INFO_URL: string = `${SYSTEM_PATH}`;

/**
 * 微服务版本路由
 */
export const SYSTEM_PATH: string = `/system`;
export const MONITOR_PATH: string = `/monitor`;
export const LOG_PATH: string = `${SYSTEM_PATH}`;
export const ONLINE_PATH: string = `${SYSTEM_PATH}`;
export const AUTH_PATH: string = `/auth`;
export const JOB_PATH: string = `/schedule`;
export const CAPTCHA_IMAGE_URL: string = `/code`;
export const GET_INFO_URL: string = `${SYSTEM_PATH}/user`;

