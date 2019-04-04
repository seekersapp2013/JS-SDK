import Utils from '../utils'

export function contains(key, asyncHandler) {
  if (!key || !Utils.isString(key)) {
    throw new Error('Cache Key must be non empty String')
  }

  if (asyncHandler) {
    asyncHandler = Utils.wrapAsync(asyncHandler)
  }

  return this.backendless.request.get({
    url         : this.backendless.urls.cacheItemCheck(key),
    isAsync     : !!asyncHandler,
    asyncHandler: asyncHandler
  })
}
