import { store } from '@/store';
export const useFileStore = defineStore(
  'file-store',
  () => {
    const uploadedFile = ref<File | null>(null);
    const setUploadedFile = (file: File | null) => {
      uploadedFile.value = file;
    };
    const clearUploadedFile = () => {
      uploadedFile.value = null;
    };
    return {
      uploadedFile,
      setUploadedFile,
      clearUploadedFile
    };
  },
  {
    persist: {
      enabled: true
    }
  }
);
// Need to be used outside the setup
export function useFileStoreWithOut() {
  return useFileStore(store);
}
