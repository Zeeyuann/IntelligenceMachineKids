<script setup lang="ts">
import useCountInterval from '@/hooks/common/count';
import { getEvaluate, getEvaluateQuestion } from '@/service/api';
import { useSubjectStore } from '@/store/modules/subject';
import { markedRender } from '@/utils/highlight';
import { useRouterPush } from '@/hooks/common/router';

const { routerPushByKey } = useRouterPush();

const subjectStore = useSubjectStore() as any;
subjectStore.clearAnswerList();

const { formattedTime, start, stop } = useCountInterval();
start();

const quetionList: any = computed<any>(() =>
  Object.keys(subjectStore.questionList).length > 0 ? subjectStore.questionList.quesList : []
);

const subNo = ref(0);

const percentage = computed(() => Math.floor(((subNo.value + 1) / quetionList.value.length) * 100));

const selectValue = computed({
  get() {
    return subjectStore.answerList[subNo.value]?.userAnswer || '';
  },
  set() {}
});

(async () => {
  if (Object.keys(subjectStore.questionList).length === 0) {
    const { data, error } = await getEvaluateQuestion(subjectStore.subjectInfo?.params);
    if (!error) {
      console.log(data);
      subjectStore.setQuestionList(data);
      nextTick(() => {
        renderMath();
      });
    }
  }
})();

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
    subNo.value += 1;
  }
};

const handleSubmit = async () => {
  if (!selectValue.value) {
    window.$message?.info('请选择答案哦');
    return;
  }
  console.log(subjectStore.answerList);
  // return;

  const data = {
    evaluateId: subjectStore.questionList.evaluateId,
    useTimes: stop() * 1000,
    answers: subjectStore.answerList
  };
  console.log(stop());
  const { data: reportData, error } = await getEvaluate(data);
  if (!error) {
    console.log(reportData);
    console.log(stop());

    routerPushByKey('test-report', { query: { id: reportData.evaluateId } });
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
              <template #suffix>/{{ quetionList.length }}</template>
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
              <div class="mb-22px text-18px font-500" v-html="markedRender(question.title)"></div>
              <div class="flex-1">
                <NRadioGroup
                  v-model:value="selectValue"
                  class="titlegroup w-full flex flex-col items-center !h-42px"
                  @update:value="val => subjectStore.handleAddAnswer(val, index, question)"
                >
                  <NRadioButton
                    v-for="(item, anindex) in question.questionOptions"
                    :key="item.questionId"
                    :class="`${anindex !== question.questionOptions.length - 1 ? 'mb-16px' : ''}`"
                    class="flex-1 items-center !h-full !flex"
                    :value="item.optionContent"
                  >
                    <div class="maths" v-html="markedRender(item.optionContent)"></div>
                  </NRadioButton>
                </NRadioGroup>
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
            v-if="subNo !== quetionList.length - 1"
            :disabled="subNo === quetionList.length - 1"
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
