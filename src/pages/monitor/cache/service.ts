import {request} from '@umijs/max';
import {MONITOR_PATH} from "../../../../config/modulePath";


// 获取服务器信息
export async function getCacheInfo() {
  return request(`${MONITOR_PATH}/cache`, {
    method: 'GET',
  });
}
