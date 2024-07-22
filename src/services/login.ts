import request from '@/utils/request';

/** 发送验证码 POST /login/captcha */
export async function getFakeCaptcha (
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

// 获取验证码
export async function getCaptchaImage () {
  return request('/code', {
    headers: {
    },
  })
}

// 获取手机验证码
export async function getMobileCaptcha (mobile: string) {
  return request(`/login/captcha?mobile=${mobile}`);
}
