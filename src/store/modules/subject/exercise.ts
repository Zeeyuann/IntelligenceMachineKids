import { store } from '@/store';
export const useExerciseSubjectStore = defineStore(
  'ExerciseSubject',
  () => {
    const subjectInfo = ref({});

    const questionList = ref({});

    const answerList = ref<any>([]);

    const mutiVal = ref<any>([]);

    const setInfo = (val: any) => {
      subjectInfo.value = val;
    };

    const setQuestionList = (val: any) => {
      questionList.value = val;
    };

    const clearQuestionList = () => {
      questionList.value = {};
    };

    const handleAddAnswer = (val: any, index: any, question: any) => {
      const { questionId, knowledges, difficulty_level, difficulty, question: ques } = question;
      // const item = questionOptions.find((ele: any) => ele.optionContent === val);
      const obj = {
        knowledgeId: knowledges.map((item: any) => item.id).join(','),
        questionId: Number(questionId),
        difficulty,
        isRight: Number(ques?.answer?.anSqs?.[0]?.ans.map((item: any) => item.html).includes(val)),
        difficultyLevel: difficulty_level,
        userAnswer: val
      };
      console.log('🚀 ~ handleAddAnswer ~ obj:', obj);
      answerList.value[index] = obj;
    };
    // eslint-disable-next-line max-params
    const handleAddMutiAnswer = (val: any, index: any, question: any, originQuestion: any) => {
      console.log('🚀 ~ handleAddMutiAnswer ~ originQuestion:', originQuestion);
      console.log('🚀 ~ handleAddMutiAnswer ~ question:', question);
      const forPush = {
        val,
        form: question?.html
      };
      mutiVal.value.push(forPush);
      const { questionId, knowledges, difficulty_level, difficulty, question: ques } = originQuestion;
      // const item = questionOptions.find((ele: any) => ele.optionContent === val);
      const obj = {
        knowledgeId: knowledges.map((item: any) => item.id).join(','),
        questionId: Number(questionId),
        difficulty,
        isRight: Number(ques?.answer?.anSqs?.[0]?.ans.map((item: any) => item.html).includes(val)),
        difficultyLevel: difficulty_level,
        userAnswer: val
      };
      console.log('🚀 ~ handleAddMutiAnswer ~ mutiVal:', mutiVal);

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
      handleAddMutiAnswer,
      setInfo
    };
  },
  { persist: { enabled: true } }
);
// Need to be used outside the setup
export function useExerciseSubjectStoreWithOut() {
  return useExerciseSubjectStore(store);
}
