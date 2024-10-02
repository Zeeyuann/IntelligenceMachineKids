import { store } from '@/store';
export const useSubjectStore = defineStore(
  'subject',
  () => {
    const subjectInfo = ref({});

    const questionList = ref({});

    const answerList = ref<any>([]);

    const setInfo = (val: any) => {
      subjectInfo.value = val;
    };

    const setQuestionList = (val: any) => {
      questionList.value = val;
    };

    const clearQuestionList = () => {
      questionList.value = {};
    };

    const handleAddAnswer = (val: any, index: any) => {
      answerList.value[index] = val;
      // const index = answerList.value.findIndex((item: any) => item === val);
      // if (index !== -1) {
      //   answerList.value[index] = val;
      // } else {
      //   answerList.value.push(val);
      // }
    };

    const clearAnswerList = () => {
      answerList.value = [];
    };

    return {
      subjectInfo,
      answerList,
      questionList,
      handleAddAnswer,
      clearAnswerList,
      setQuestionList,
      clearQuestionList,
      setInfo
    };
  },
  { persist: { enabled: true } }
);
// Need to be used outside the setup
export function useSubjectStoreWithOut() {
  return useSubjectStore(store);
}
