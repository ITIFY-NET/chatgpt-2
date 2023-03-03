/* eslint-disable no-underscore-dangle */

function build(success = true, data, meta = {}) {
  let errorMessage = meta.message
  return {
    success,
    status: meta.code ? parseInt(meta.code, 10) : undefined,
    message: errorMessage,
    err: meta?.err || undefined,
    data: data || undefined
  }
}
export default {
  build
}
