import { store } from '@/store';
export const useVideosStore = defineStore(
  'video',
  () => {
    const finishList = ref<any>([]);

    const handleAddFinish = (title: string) => {
      const existingVideoIndex = finishList.value.findIndex((video: any) => video === title);

      if (existingVideoIndex !== -1) {
        finishList.value[existingVideoIndex] = title;
      } else {
        finishList.value.push(title);
      }
    };
    return {
      finishList,
      handleAddFinish
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage
        }
      ]
    }
  }
);
// Need to be used outside the setup
export function useVideoStoreWithOut() {
  return useVideosStore(store);
}
