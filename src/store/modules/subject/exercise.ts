import { store } from '@/store';
export const useExerciseSubjectStore = defineStore(
  'ExerciseSubject',
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

    // eslint-disable-next-line max-params
    const handleAddAnswer = (val: any, index: any, question: any) => {
      const { id, kpoints, difficultyLevel, answer, difficulty } = question;
      // const item = questionOptions.find((ele: any) => ele.optionContent === val);
      const obj = {
        knowledgeId: kpoints.map((item: any) => item.id).join(','),
        questionId: Number(id),
        difficulty,
        isright: Number(answer.includes(val)),
        difficultyLevel,
        userAnswer: val
      };
      console.log('🚀 ~ handleAddAnswer ~ obj:', obj);
      answerList.value[index] = obj;
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
export function useExerciseSubjectStoreWithOut() {
  return useExerciseSubjectStore(store);
}
