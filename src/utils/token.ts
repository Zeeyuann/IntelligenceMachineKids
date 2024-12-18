import { localStg } from '@/utils/storage';
export default function getToken() {
  const data = JSON.parse(localStg.get('token') as string);
  if (data) {
    const { token, expireTime } = data;
    if (Date.now() < expireTime) {
      return token; // 未过期，返回Token
    }
    localStg.remove('token'); // 已过期，清除Token
    return null;
  }
  return null;
}
