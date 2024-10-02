<script setup lang="ts">
// import katex from 'katex';
// import { marked } from 'marked';
import useCountInterval from '@/hooks/common/count';
import { fetchQuestions, fetchUserevaluate } from '@/service/api';
import { useSubjectStore } from '@/store/modules/subject';
import { markedRender } from '@/utils/highlight';

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
    return subjectStore.answerList[subNo.value] || '';
  },
  set() {}
});
(async () => {
  if (Object.keys(subjectStore.questionList).length === 0) {
    const { data, error } = await fetchQuestions(subjectStore.subjectInfo?.params);
    if (!error) {
      console.log(data);
      subjectStore.setQuestionList(data);
    }
  }
})();

const handlePre = () => {
  if (subNo.value > 0) {
    subNo.value -= 1;
    // renderMarkdown(); // 在切换问题时调用
  }
};
const handleNext = () => {
  if (!selectValue.value) {
    window.$message?.info('请选择答案哦');
    return;
  }
  if (subNo.value < quetionList.value.length - 1) {
    subNo.value += 1;
    // renderMarkdown(); // 在切换问题时调用
  }
};

const handleSubmit = async () => {
  console.log(subjectStore.answerList);

  const data = {
    evaluateId: subjectStore.questionList.evaluateId,
    useTimes: stop() * 1000,
    answers: subjectStore.answerList
  };
  const { data: reportData, error } = await fetchUserevaluate(data);
  if (!error) {
    console.log(reportData);
  }
};

// const cleanedString = originalString.replace(/<span class="mathdisplay">(.*?)<\/span>/g, '$1');

// console.log(cleanedString);
// function escapeLatex(latex: any) {
//   return latex
//     .replace(/\\/g, '\\\\') // 转义反斜杠
//     .replace(/\\left/g, '\\left\\') // 转义 \left
//     .replace(/\\right/g, '\\right\\') // 转义 \left
//     .replace(/\{/g, '\\{') // 转义左大括号
//     .replace(/\}/g, '\\}') // 转义右大括号
//     .replace(/\$/g, '\\$') // 转义美元符号
//     .replace(/&/g, '\\&') // 转义和符号
//     .replace(/_/g, '\\_') // 转义下划线
//     .replace(/%/g, '\\%') // 转义百分号
//     .replace(/#/g, '\\#') // 转义井号
//     .replace(/~/g, '\\~') // 转义波浪号
//     .replace(/</g, '\\lt') // 转义小于符号
//     .replace(/>/g, '\\gt'); // 转义大于符号
// }
// function renderMarkdown() {
//   const content = document.getElementsByClassName('mathdisplay');
//   if (content) {
//     Array.from(content).forEach(element => {
//       if (!element.classList.contains('rendered')) {
//         // 检查是否已渲染
//         const latex = element.textContent as string;
//         console.log('🚀 ~ Array.from ~ latex:', latex);

//         try {
//           katex.render(latex, element, {
//             displayMode: false,
//             leqno: false,
//             fleqn: false,
//             throwOnError: false,
//             errorColor: '#cc0000',
//             strict: 'warn',
//             output: 'mathml',
//             trust: false,
//             macros: {
//               '\\x': '\\\\x',
//               '\\y': '\\\\y',
//               '\\ax': '\\\\ax',
//               '\\bx': '\\\\bx',
//               '{': '\\{',
//               '{{': '\\{{',
//               '}': '\\}',
//               '\\\\{': '\\\\\\\\{',
//               '\\*': '\\\\*'
//             }
//           });
//           element.classList.add('rendered'); // 添加标志
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     });
//   }
// }
// const parseMath = (text: any) => {
//   return text.replace(/<span class="mathdisplay">([^<]+)<\/span>/g, (_, formula) => {
//     return formula;
//   });
// };
// const removeMathDisplay = text => {
//   const cleanedString = text.replace(/<span class="mathdisplay">(.*?)<\/span>/g, '$1');
//   console.log('🚀 ~ removeMathDisplay ~ cleanedString:', cleanedString);
//   console.log('🚀 ~ removeMathDisplay ~ text:', text);
//   return cleanedString;
// };

onMounted(() => {
  // renderMarkdown();
});
</script>

<template>
  <div class="testbg">
    <main class="box-border size-full flex flex-col flex-1 px-230px py-16px text-#000000">
      <div class="top box-border h-90px w-full flex items-center justify-between rd-10px bg-white px-40px py-35px">
        <div class="flex items-center text-24px text-#FF9500 font-600">
          <icon-local-timeclock class="mr-5px" />
          {{ formattedTime }}
        </div>
        <div class="text-28px font-600">{{ subjectStore.subjectInfo?.title }}</div>
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
        class="bot mt-16px box-border w-full flex flex-col flex-1 items-center justify-between rd-10px bg-white px-350px pb-24px pt-54px"
      >
        <template v-for="(question, index) in quetionList" :key="question.questionId">
          <div v-show="index === subNo" class="box-border w-full flex flex-1 of-hidden">
            <NScrollbar class="animate__fadeIn animate__animated box-border w-full flex flex-col flex-1 pb-16px">
              <div class="mb-22px text-18px font-500" v-html="markedRender(question.title)"></div>
              <div class="flex-1">
                <NRadioGroup
                  v-model:value="selectValue"
                  class="titlegroup w-full flex flex-col items-center !h-42px"
                  @update:value="val => subjectStore.handleAddAnswer(val, index)"
                >
                  <NRadioButton
                    v-for="(item, anindex) in question.questionOptions"
                    :key="item.questionId"
                    :class="`${anindex !== question.questionOptions.length - 1 ? 'mb-16px' : ''}`"
                    class="flex-1 items-center !h-full !flex"
                    :value="item.optionContent"
                  >
                    <div v-html="markedRender(item.optionContent)"></div>
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
