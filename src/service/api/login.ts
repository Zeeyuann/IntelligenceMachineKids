import { request } from '../request';

export function sendMsg(mobile: string) {
  return request<Api.Auth.LoginToken>({
    url: 'aiweb/sendcode',
    method: 'post',
    data: {
      mobile
    }
  });
}

export function fetchLogin(mobile: string, code: string) {
  return request<Api.Auth.token>({
    url: 'aiweb/login',
    method: 'post',
    data: {
      mobile,
      code
    }
  });
}

export function wxCodeLogin(code: string) {
  return request<Api.Auth.token>({
    url: 'aiweb/codelogin',
    method: 'post',
    data: {
      code
    }
  });
}

export function fetchOffSpringId() {
  return request<Api.Auth.offSpriingId[]>({
    url: 'aiweb/offsprings',
    method: 'post'
  });
}

export function fetchUserInfo(Offspriingid?: string | number) {
  return request<Api.Auth.offSpriingId>({
    url: 'aiweb/center/detail',
    headers: {
      Offspriingid
    },
    method: 'post'
  });
}
