import { request } from '../request';

export function fetchRoles(data: any) {
  return request<any>({
    url: 'aiweb/chatai/sysuser',
    method: 'post',
    data
  });
}
