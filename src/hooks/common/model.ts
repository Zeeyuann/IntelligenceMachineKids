import { ref } from 'vue';
export function useShowModel() {
  const showModal = ref(false);

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
    showModal,
    show,
    close,
    toggle
  };
}
