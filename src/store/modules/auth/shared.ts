import { localStg } from '@/utils/storage';

/** Get token */
export function getToken() {
  const expireTime = localStg.get('expireTime');
  const token = localStg.get('token');
  if (token && expireTime) {
    if (Date.now() < expireTime) {
      return token;
    }
    localStg.remove('expireTime');
    localStg.remove('token'); // 已过期，清除Token
    return '';
  }
  return '';
}
export function getOffSpriingId() {
  return localStg.get('Offspriingid') || '';
}
export function getUserInfoPreisit() {
  return (
    localStg.get('UserInfo') || {
      avatar: '',
      birthday: 0,
      create_time: null,
      delete_time: null,
      update_time: null,
      description: '',
      id: 0,
      name: '',
      sex: 0,
      status: 0,
      user_id: null,
      vip_time: 0
    }
  );
}

/** Clear auth storage */
export function clearAuthStorage() {
  localStg.remove('token');
  localStg.remove('Offspriingid');
  localStg.remove('UserInfo');
  localStg.remove('expireTime');
}
