<script setup lang="ts">
import useCountInterval from '@/hooks/common/count';
import { getTaskAnswer, getTaskQuestion } from '@/service/api';
import { useExerciseSubjectStore } from '@/store/modules/subject/exercise';
import { useRouterPush } from '@/hooks/common/router';

const { routerPushByKey } = useRouterPush();
const route = useRoute();

const subjectStore = useExerciseSubjectStore() as any;
subjectStore.clearAnswerList();
subjectStore.clearQuestionList();

const taskId = ref(route.query.id);

watchEffect(async () => {
  const { data, error } = await getTaskQuestion({ taskId: taskId.value });
  if (!error) {
    console.log(data);
    (data as any).questions = (data as any)?.questions.filter((item: any) => item.question?.stem?.type === '选择题');
    subjectStore.setQuestionList(data.questions);
    nextTick(() => {
      renderMath();
    });
  }
});

const { formattedTime, start, stop } = useCountInterval();
start();

const questionIndex: any = ref(0); // 当前题目索引
let startTime = 0; // 当前题的开始时间
const times: any = ref([]); // 记录每道题的时间

// 开始一道题
const startQuestion = () => {
  startTime = Date.now(); // 记录当前时间戳
};

// 结束一道题
const endQuestion = () => {
  const endTime = Date.now(); // 获取结束时间戳
  const duration = (endTime - startTime) / 1000; // 计算耗时（秒）
  times.value[questionIndex.value] = Math.round(duration);
};

// 初始化第一题计时
startQuestion();

const quetionList: any = computed<any>(() =>
  Object.keys(subjectStore.questionList)?.length > 0 ? subjectStore.questionList : []
);
console.log('🚀 ~ quetionList:', quetionList);

const subNo = ref(0);

const percentage = computed(() => Math.floor(((subNo.value + 1) / quetionList.value?.length) * 100));

const selectValue = computed({
  get() {
    if (subjectStore.answerList[subNo.value]?.type === '复合题') {
      return subjectStore.answerList[subNo.value]?.knowledgeId || '';
    }
    return subjectStore.answerList[subNo.value]?.userAnswer || '';
  },
  set() {}
});

// (async () => {
//   if (Object.keys(subjectStore.questionList).length === 0) {
//     const { data, error } = await getTaskQuestion({ taskId: useRoute().query.id });
//     if (!error) {
//       console.log(data);
//       subjectStore.setQuestionList(data);
//       nextTick(() => {
//         renderMath();
//       });
//     }
//   }
// })();

const handlePre = () => {
  if (subNo.value > 0) {
    subNo.value -= 1;
  }
};
const handleNext = () => {
  if (!selectValue.value) {
    window.$message?.info('请选择答案哦');
    return;
  }

  if (subNo.value < quetionList.value.length - 1) {
    endQuestion(); // 记录当前题目的时间
    questionIndex.value += 1; // 跳转到下一题
    startQuestion(); // 开始下一题计时
    subNo.value += 1;
  }
};

const handleSubmit = async () => {
  if (!selectValue.value) {
    window.$message?.info('请选择答案哦');
    return;
  }
  endQuestion();
  console.log(times);

  // return;

  const data = {
    taskId: taskId.value,
    countTime: stop(),
    answerBodyList: subjectStore.answerList.map((item: any, index: any) => ({ ...item, time: times.value[index] }))
  };
  console.log('🚀 ~ handleSubmit ~ data:', data);
  const { data: reportData, error } = await getTaskAnswer(data);
  if (!error) {
    console.log(reportData);
    console.log(stop());

    routerPushByKey('exercise-report', { query: { id: reportData.taskId } });
  }
};
function renderMath() {
  // 检查 MathJax 是否已加载
  if (window.MathJax) {
    window.MathJax.typeset();
    // .then(() => {
    //   console.log('MathJax 渲染完成');
    //   text.value = 'cg';
    // })
    // .catch((err: any) => {
    //   console.error('MathJax 渲染失败', err);
    //   text.value = 'sb';
    // });
  }
}

onMounted(() => {
  nextTick(() => {
    renderMath();
  });
});
</script>

<template>
  <div class="testbg">
    <main class="box-border size-full flex flex-col flex-1 px-40px py-16px text-#000000 xl:px-230px">
      <div class="top box-border h-90px w-full flex items-center justify-between rd-10px bg-white px-40px py-35px">
        <div class="flex items-center text-24px text-#FF9500 font-600">
          <icon-local-timeclock class="mr-5px" />
          {{ formattedTime }}
        </div>
        <div class="text-22px font-600 xl:text-28px">{{ subjectStore.subjectInfo?.title }}</div>
        <div class="w-250px flex flex-col items-end">
          <div class="h-26px flex items-end text-14px">
            <span class="mb-5px text-[rgba(0,0,0,0.6)]">答题进度</span>
            <NStatistic class="" :value="subNo + 1">
              <template #suffix>/{{ quetionList?.length }}</template>
            </NStatistic>
          </div>
          <NProgress type="line" color="#2CB6FF" :percentage="percentage" indicator-placement="inside" processing />
        </div>
      </div>
      <div
        class="bot mt-16px box-border w-full flex flex-col flex-1 items-center justify-between rd-10px bg-white px-50px pb-24px pt-54px xl:px-350px"
      >
        <template v-for="(question, index) in quetionList" :key="question.questionId">
          <div v-show="index === subNo" class="box-border w-full flex flex-1 of-hidden">
            <NScrollbar class="animate__fadeIn animate__animated box-border w-full flex flex-col flex-1 pb-16px">
              <div class="mb-22px text-18px font-500" v-html="question?.question?.stem?.html"></div>
              <div class="flex-1">
                <!-- 选择题 -->
                <NRadioGroup
                  v-if="question?.question?.stem?.type === '选择题'"
                  v-model:value="selectValue"
                  class="titlegroup w-full flex flex-col items-center !h-42px"
                  @update:value="val => subjectStore.handleAddAnswer(val, index, question)"
                >
                  <NRadioButton
                    v-for="(item, anindex) in question?.question?.stem?.og?.ogOps || question?.question?.stem?.sqs"
                    :key="item.index"
                    :class="`${anindex !== question?.question?.stem?.og?.ogOps?.length - 1 ? 'mb-16px' : ''}`"
                    class="flex-1 items-center !h-unset !flex"
                    :value="item.index"
                  >
                    <div class="maths flex items-center" v-html="`${item.index}. ${item.html}`"></div>
                  </NRadioButton>
                </NRadioGroup>
                <!-- 复合题 -->
                <template v-else-if="false && question?.question?.stem?.type === '复合题'">
                  <div class="flex flex-col">
                    <div
                      v-for="(subItem, subIndex) in question?.question?.stem?.sqs"
                      :key="subItem.html"
                      class="box-border w-full flex flex-col flex-1 pb-16px"
                    >
                      <div class="mb-22px text-18px font-500" v-html="`${subIndex + 1}. ${subItem?.html}`"></div>
                      <div class="flex">
                        <NRadioGroup
                          v-model:value="selectValue"
                          class="titlegroup w-full flex flex-col flex-1 items-center !h-full"
                          @update:value="val => subjectStore.handleAddAnswer(val, index, question)"
                        >
                          <NRadioButton
                            v-for="(subInside, anindex) in subItem?.og?.ogOps"
                            :key="subInside.index"
                            :class="`${anindex !== question?.question?.stem?.og?.ogOps?.length - 1 ? 'mb-16px' : ''}`"
                            class="flex-1 items-center !h-unset !flex"
                            :value="subInside.index"
                            @click="subjectStore.handleAddMutiAnswer(subInside.index, index, subInside, question)"
                          >
                            <div class="maths flex items-center" v-html="`${subInside.index}. ${subInside.html}`"></div>
                          </NRadioButton>
                        </NRadioGroup>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </NScrollbar>
          </div>
        </template>

        <div class="box-border w-full flex items-center justify-between">
          <NButton
            :disabled="subNo === 0"
            class="whitebtn mr-16px h-42px w-full flex-1 bg-white !rd-14px"
            @click="handlePre"
          >
            上一题
          </NButton>
          <NButton
            v-if="subNo !== quetionList?.length - 1"
            :disabled="subNo === quetionList?.length - 1"
            class="conbtn h-42px w-full flex-1 bg-#2CB6FF !rd-14px"
            @click="handleNext"
          >
            下一题
          </NButton>
          <NButton v-else class="conbtn h-42px w-full flex-1 bg-#2CB6FF !rd-14px" @click="handleSubmit">提交</NButton>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
:deep(.n-scrollbar-container) {
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.testbg {
  background: linear-gradient(180deg, #d2efff 11%, #f8f8fa 34%, #f5f5f5 43%);
}
:deep(.n-radio-button--checked, .n-radio-button--focus) {
  --n-button-text-color-active: #2cb6ff !important;
  --n-button-border-color-active: #2cb6ff !important;
  --n-button-box-shadow-focus: inset 0 0 0 1px #2cb6ff, 0 0 0 2px rgba(24, 24, 24, 0.2);
}
:deep(.n-radio-group__splitor) {
  display: none;
}
:deep(.n-radio-button) {
  width: 100%;
  font-size: 18px;
  border-top-left-radius: 6px !important;
  border-top-right-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
  border-bottom-left-radius: 6px !important;
  border-right: 1px solid var(--n-button-border-color);
  border-left: 1px solid var(--n-button-border-color);
}
:deep(.n-radio-button__state-border) {
  border-radius: 6px;
}
:deep(.whitebtn) {
  --n-ripple-color: #2cb6ff !important;
  --n-text-color: #2cb6ff !important;
  --n-text-color-hover: #2cb6ff !important;
  --n-text-color-pressed: #2cb6ff !important;
  --n-text-color-focus: #2cb6ff !important;
  --n-border-hover: 1px solid #2cb6ff !important;
  --n-border-pressed: 1px solid #2cb6ff !important;
  --n-border-focus: 1px solid #2cb6ff !important;
  --n-color-hover: #ffffff !important;
  --n-color-pressed: #ffffff !important;
  --n-color-focus: #ffffff !important;
  --n-border-hover: 1px solid #2cb6ff !important;
  --n-border: 1px solid #2cb6ff !important;
}
:deep(.conbtn) {
  --n-ripple-color: #2cb6ff !important;
  --n-text-color: #ffffff !important;
  --n-text-color-hover: #ffffff !important;
  --n-text-color-pressed: #ffffff !important;
  --n-text-color-focus: #ffffff !important;
  --n-border-hover: 1px solid #2cb6ff !important;
  --n-border-pressed: 1px solid #2cb6ff !important;
  --n-border-focus: 1px solid #2cb6ff !important;
  --n-color-hover: #2cb6ff !important;
  --n-color-pressed: #2cb6ff !important;
  --n-color-focus: #2cb6ff !important;
  --n-border: none !important;
}
</style>
