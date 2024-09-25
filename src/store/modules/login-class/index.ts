import { store } from '@/store';
export const useLoginClassStore = defineStore('login-class', () => {
  const flag = ref(false);
  const setFlag = (val: boolean) => {
    flag.value = val;
  };
  return {
    flag,
    setFlag
  };
});
// Need to be used outside the setup
export function useLoginClassStoreWithOut() {
  return useLoginClassStore(store);
}
