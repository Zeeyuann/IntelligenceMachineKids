import { localStg } from '@/utils/storage';

/** Get token */
export function getToken() {
  return localStg.get('token') || '';
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
      user_id: 0
    }
  );
}

/** Clear auth storage */
export function clearAuthStorage() {
  localStg.remove('token');
  localStg.remove('Offspriingid');
  localStg.remove('UserInfo');
}
