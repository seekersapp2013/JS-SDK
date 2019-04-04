import Utils from '../utils'
import Async from '../request/async'

export function put(key, value, timeToLive, asyncHandler) {
  if (!key || !Utils.isString(key)) {
    throw new Error('Cache Key must be non empty String')
  }

  if (timeToLive instanceof Async) {
    asyncHandler = timeToLive
    timeToLive = undefined
  }

  if (timeToLive && !Utils.isNumber(timeToLive)) {
    throw new Error('Cache timeToLive must be Number')
  }

  if (Utils.isObject(value) && value.constructor !== Object) {
    value.___class = value.___class || Utils.getClassName(value)
  }

  if (asyncHandler) {
    asyncHandler = Utils.wrapAsync(asyncHandler)
  }

  return this.backendless.request.put({
    url         : this.backendless.urls.cacheItem(key) + ((timeToLive) ? '?timeout=' + timeToLive : ''),
    headers     : { 'Content-Type': 'application/json' },
    data        : JSON.stringify(value),
    isAsync     : !!asyncHandler,
    asyncHandler: asyncHandler
  })
}
