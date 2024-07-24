import {request} from '@umijs/max';
import {MONITOR_PATH} from "../../../../config/modulePath";


// 查询缓存名称列表
export function listCacheName() {
  return request(`${MONITOR_PATH}/cache/getNames`, {
    method: 'get'
  })
}

// 查询缓存键名列表
export function listCacheKey(cacheName: string) {
  if (!cacheName || cacheName.length === 0) {
    return new Promise(() => [])
  }
  return request(`${MONITOR_PATH}/cache/getKeys/` + cacheName, {
    method: 'get'
  })
}

// 查询缓存内容
export function getCacheValue(cacheName: string, cacheKey: string) {
  return request(`${MONITOR_PATH}/cache/getValue/` + cacheName + '/' + cacheKey, {
    method: 'get'
  })
}

// 清理指定名称缓存
export function clearCacheName(cacheName: string) {
  return request(`${MONITOR_PATH}/cache/clearCacheName/` + cacheName, {
    method: 'delete'
  })
}

// 清理指定键名缓存
export function clearCacheKey(cacheKey: string) {
  return request(`${MONITOR_PATH}/cache/clearCacheKey/` + cacheKey, {
    method: 'delete'
  })
}

// 清理全部缓存
export function clearCacheAll() {
  return request(`${MONITOR_PATH}/cache/clearCacheAll`, {
    method: 'delete'
  })
}
