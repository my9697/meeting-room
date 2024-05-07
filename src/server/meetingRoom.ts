import myRequest from './axios/index'

export function list(
  status: string,
  capacity: string,

  equipment: string
) {
  return myRequest.get({
    url: '/meeting-room/list',
    params: {
      status,
      capacity,

      equipment
    }
  })
}

export function book(data: Record<string, any>) {
  return myRequest.get({
    url: '/meeting-room/update',
    params: {
      data
    }
  })
}
