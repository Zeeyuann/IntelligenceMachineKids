import { defineStore } from 'pinia';
import { ref } from 'vue';
import { store } from '../../index';
export const useLoginTypeStore = defineStore('loginTypeStore', () => {
  const type: any = ref('pwd-login');

  const showModal = ref(false);

  const setType = (val: UnionKey.LoginModule) => {
    type.value = val;
  };
  function show() {
    showModal.value = true;
  }

  function close() {
    showModal.value = false;
  }

  function toggle() {
    showModal.value = !showModal.value;
  }
  return {
    type,
    setType,
    showModal,
    show,
    close,
    toggle
  };
});

// Need to be used outside the setup
export function useLoginTypeStoreWithOut() {
  return useLoginTypeStore(store);
}
