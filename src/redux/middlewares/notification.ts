import { defaultTypeSuffixes } from './loadingbar'
import { notification } from 'antd'
const notificationMiddleware = () => (next: any) => (action: any) => {
  const [_PENDING, _FULFILLED, REJECTED] = defaultTypeSuffixes
  const isRejected = new RegExp(`${REJECTED}$`, 'g')

  if (action.type.match(isRejected)) {
    notification.error({
      message:
        action.error.code && action.error.message
          ? `${action.error.code}: ${action.error.message}`
          : action.error.message,
    })
  }

  return next(action)
}

export { notificationMiddleware }
