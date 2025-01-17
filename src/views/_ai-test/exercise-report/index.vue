<script setup lang="ts">
import html2canvas from 'html2canvas';
import printJS from 'print-js';
import dayjs from 'dayjs';
import type { DataTableColumns } from 'naive-ui';
import { useEcharts } from '@/hooks/common/echarts';
// import { useSubjectStore } from '@/store/modules/subject';
import { getExerciseReport } from '@/service/api';
import { useRouterPush } from '@/hooks/common/router';
import QuestionDetail from '@/components/custom/question-detail.vue';
import VideoStudy from '@/components/custom/video-study.vue';
import { pieOptions } from './data';
import IconLocalJiexiplay from '~icons/local/jiexiplay';

const { routerPushByKey } = useRouterPush();

const { domRef: pieRef, updateOptions: updatePieOptions } = useEcharts(() => pieOptions, { onRender() {} });

const route = useRoute();

const questionData = ref([]);

const synthesizeList: any = ref([]);

const captureDiv = ref(null); // 获取要截取的div
const imageUrl = ref<any>(null); // 存储截图生成的图片地址
const capture = () => {
  if (captureDiv.value) {
    html2canvas(captureDiv.value).then(canvas => {
      // 将画布转换为图片 URL
      imageUrl.value = canvas.toDataURL('image/png');
      printJS({
        printable: [imageUrl.value],
        type: 'image',
        header: '测试报告',
        imageStyle: 'width:100%;'
      });
      console.log('🚀 ~ html2canvas ~ imageUrl:', imageUrl);
    });
  }
};
const windowWidth = ref(window.innerWidth);

function handleResize() {
  windowWidth.value = window.innerWidth;
  console.log('🚀 ~ handleResize ~ window.innerWidth:', window.innerWidth);
}

const subjectTepmp: any = ref({});
onMounted(async () => {
  window.addEventListener('resize', handleResize);

  const { data: reportData, error } = await getExerciseReport(route.query?.token as string, { taskId: route.query.id });
  if (!error) {
    console.log(reportData);
    subjectTepmp.value = reportData;

    questionData.value = reportData.quesPatterns;

    synthesizeList.value = reportData.evaluationResults;

    updatePieOptions((option: any) => {
      return {
        ...option,
        series: [
          {
            ...option.series[0],
            data: [{ value: reportData.score * 100, name: '等级评定' }]
          }
        ]
      };
    });
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const worngWitdth = ref('35%');

const showDraw = ref(false);
const activeQuesiontionId = ref(0);

const handleShowDraw = (id: number) => {
  worngWitdth.value = '35%';
  showDraw.value = true;
  activeQuesiontionId.value = id;
};

const handleBack = (item: any) => {
  worngWitdth.value = '80%';
  showDraw.value = true;
  activeQuesiontionId.value = item.questionId;
};

const showVideoDraw = ref(false);
const activeVideoId = ref(0);
const handleOpenVideo = (id: number) => {
  showVideoDraw.value = true;
  activeVideoId.value = id;
};

function createBigColumns(): DataTableColumns {
  return [
    {
      title: '序号',
      key: 'key',
      width: 55,
      render: (_, index) => {
        return `${index + 1}`;
      }
    },
    {
      title: '知识点',
      key: 'knowledgeName'
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          'div',
          {
            class: 'bg-#2CB6FF flex items-center justify-center rd-12px w-55px h-18px cursor-pointer',
            style: { width: '70px' },
            onClick: async () => {
              showVideoDraw.value = true;
              activeVideoId.value = row.knowledgeId as number;
            }
          },
          [h(IconLocalJiexiplay), h('div', { class: 'ml-10px' }, '学习')]
        );
      }
    }
  ];
}
function createSmallColumns(): DataTableColumns {
  return [
    {
      title: '序号',
      key: 'key',
      width: 55,
      render: (_, index) => {
        return `${index + 1}`;
      }
    },
    {
      title: '知识点',
      key: 'knowledgeName'
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          'div',
          {
            class: 'bg-#2CB6FF flex items-center justify-center rd-12px w-55px h-18px cursor-pointer',
            style: { width: '70px' },
            onClick: async () => {
              showVideoDraw.value = true;
              activeVideoId.value = row.knowledgeId as number;
            }
          },
          [h(IconLocalJiexiplay), h('div', { class: 'ml-10px' }, '学习')]
        );
      }
    }
  ];
}
</script>

<template>
  <div v-if="windowWidth > 1389" class="box-border px-230px py-20px">
    <main class="topbg box-border size-full flex flex-col items-center rd-10px bg-white p-16px">
      <!-- 头 -->
      <div class="box-border w-full flex flex-col rd-10px px-60px py-30px">
        <div class="flex items-center justify-between text-white">
          <div>
            <div class="almm titlebg mb-20px text-26px text-white">恭喜完成测试</div>
            <div class="mb5px text-14px">测试得分</div>
            <div class="text-18px font-600">{{ subjectTepmp?.score * 100 }}</div>
          </div>
          <div>
            <div class="flex items-center text-13px">
              <span>报告ID：</span>
              <span>{{ subjectTepmp?.taskId }}</span>
            </div>
            <div class="my8px flex items-center text-13px">
              <span>科目：</span>
              <span>{{ subjectTepmp?.courseName }}</span>
            </div>
          </div>
          <div class="h64px w-1px bg-white"></div>
          <div>
            <div class="flex items-center text-13px">
              <span>
                日期：
                <span>{{ dayjs(subjectTepmp?.startTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
              </span>
            </div>
            <div class="my8px flex items-center text-13px">
              <span>测试范围：</span>
              <span>{{ subjectTepmp?.courseName }}</span>
            </div>
          </div>
          <div>
            <NButton class="mr10px rd-18px text-white" @click="capture">本机打印</NButton>
            <NButton class="rd-18px text-white" @click="routerPushByKey('classroom')">返回首页</NButton>
          </div>
        </div>
        <div class="grid grid-cols-3 mt-24px w-full gap-x-16px">
          <div class="h-54px w-full flex-center flex-col rd-10px bg-#EFF7FE">
            <div v-if="Object.keys(subjectTepmp).length > 0" class="text-18px text-#2CB6FF font-600">
              {{ subjectTepmp?.countTime ? subjectTepmp?.countTime + 's' : '' }}
            </div>
            <div class="mi text-12px text-#666666">平均答题时间</div>
          </div>
          <div class="h-54px w-full flex-center flex-col rd-10px bg-#EFF7FE">
            <div class="text-18px text-#2CB6FF font-600">{{ Math.round(subjectTepmp?.accuracy * 100) }}%</div>
            <div class="mi text-12px text-#666666">正确率</div>
          </div>
          <div class="h-54px w-full flex-center flex-col rd-10px bg-#EFF7FE">
            <div class="box-border w-full px-10px text-18px text-#2CB6FF font-600">
              <NProgress type="line" :percentage="50" status="error" :height="13" color="#1A89EF" rail-color="#DBDCDF">
                <div class="mi text-12px text-#666666">{{ subjectTepmp?.tdlBlock?.avgDifficulty }}/10</div>
              </NProgress>
            </div>
            <div class="mi mt6px text-12px text-#666666">平均难度</div>
          </div>
        </div>
      </div>

      <div ref="captureDiv" class="content max-w-500px w-full flex flex-col self-center rd-10px bg-white">
        <!-- 评测结果等级评定 -->
        <div class="line1 flex items-center">
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 rd-10px p24px">
            <div class="title text-16px text-#000000 font-600">评测结果等级评定</div>
            <div class="flex-center flex-col flex-1">
              <div ref="pieRef" class="size-full"></div>
              <div class="mi w-343px text-12px text-#666666">
                *根据教育部《关于普通高中学业水平考试的实施意见》(教基二(2016)7号)所给的标准，以等级呈现成绩，位次由高到低为A至E等级。
                其中A等级15%，B等级30%，C等级30%，D、E等级共25%，智能提分系统参照此文件，在义务教育阶段同等适用。
              </div>
            </div>
          </div>
        </div>
        <!-- 题目解析 -->
        <div class="line1 flex items-center">
          <div class="boder-#D8D8D8 box-border flex flex-col flex-1 rd-10px p24px">
            <div class="title mb12px text-16px text-#000000 font-600">题目解析</div>
            <div class="grid grid-cols-1 gap-y-15px">
              <div
                v-for="(item, index) in subjectTepmp?.questionAnswers"
                :key="item.id"
                class="h-40px w-full flex cursor-pointer items-center justify-between rd-12px bg-#F4F5F7 px-16px shadow-sm transition-all-300 hover:shadow-lg"
                @click="handleShowDraw(item.questionId)"
              >
                <div class="flex items-center">
                  <div class="mr-30px text-14px text-#3d3d3d">第{{ index + 1 }}题</div>
                  <template v-if="item.isRight">
                    <icon-local-jiexig />
                  </template>
                  <template v-else>
                    <icon-local-jiexix />
                  </template>
                </div>
                <div class="flex items-center">
                  <div class="mr-8px text-[rgba(0,0,0,0.6)]">问题解析</div>
                  <icon-local-jiexir />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 知识点解析 -->
        <div class="line1 flex items-center">
          <div class="boder-#D8D8D8 box-border flex flex-col flex-1 rd-10px p24px">
            <div class="title mb12px text-16px text-#000000 font-600">知识点解析</div>
            <div class="grid grid-cols-1">
              <NDataTable
                align="center"
                :columns="createBigColumns()"
                :data="subjectTepmp?.knowledges"
                :bordered="false"
              />
            </div>
          </div>
        </div>

        <!-- btn -->
        <!--
 <div class="box-border w-full flex flex-col items-center px24px pb20px">
          <div class="mb-10px h54px w-343px flex cursor-pointer items-center justify-center rd-12px bg-#2CB6FF">
            <icon-local-jiexib />
            <span class="ml10px text-18px text-#ffffff font-600">举一反三,智能推题</span>
          </div>
          <div class="text-12px text-#000000">基于当前错题智能生成新的练习题</div>
        </div>
-->
      </div>
    </main>
  </div>
  <div v-else class="box-border px-20px py-20px">
    <main class="topbg box-border w-full flex flex-col items-center rd-10px p-0px">
      <!-- 头 -->
      <div class="box-border w-full flex flex-col items-center justify-between rd-10px p24px text-white">
        <div class="flex flex-col items-center">
          <div class="almm titlebg text-26px text-white">恭喜完成测试</div>
          <div class="flex items-center">
            <div class="text-14px">测试得分</div>
            <div class="ml-20px text-18px font-600">{{ subjectTepmp?.score * 100 }}</div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex-1">
            <div class="w-[200px] flex items-center text-13px">
              <span>报告ID：</span>
              <span>{{ subjectTepmp?.taskId }}</span>
            </div>
            <div class="my8px flex items-center text-13px">
              <span>科目：</span>
              <span>{{ subjectTepmp?.courseName }}</span>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-center text-13px">
              <span>
                日期：
                <span>{{ dayjs(subjectTepmp?.startTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
              </span>
            </div>
            <div class="my8px flex items-center text-13px">
              <span>测试范围：</span>
              <span>{{ subjectTepmp?.courseName }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-y-10px">
            <div class="h-54px w-full flex-center flex-col rd-10px bg-#EFF7FE">
              <div v-if="Object.keys(subjectTepmp).length > 0" class="text-18px text-#2CB6FF font-600">
                {{ subjectTepmp?.countTime ? subjectTepmp?.countTime + 's' : '' }}
              </div>
              <div class="mi text-12px text-#666666">平均答题时间</div>
            </div>
            <div class="h-54px w-full flex-center flex-col rd-10px bg-#EFF7FE">
              <div class="text-18px text-#2CB6FF font-600">{{ Math.round(subjectTepmp?.accuracy * 100) }}%</div>
              <div class="mi text-12px text-#666666">正确率</div>
            </div>
            <div class="h-54px w-full flex-center flex-col rd-10px bg-#EFF7FE">
              <div class="box-border w-full px-10px text-18px text-#2CB6FF font-600">
                <NProgress
                  type="line"
                  :percentage="50"
                  status="error"
                  :height="13"
                  color="#1A89EF"
                  rail-color="#DBDCDF"
                >
                  <div class="mi text-12px text-#666666">{{ subjectTepmp?.tdlBlock?.avgDifficulty }}/10</div>
                </NProgress>
              </div>
              <div class="mi mt6px text-12px text-#666666">平均难度</div>
            </div>
          </div>
        </div>
        <div>
          <!-- <NButton class="mr10px rd-18px text-white" @click="capture">本机打印</NButton> -->
          <!-- <NButton class="rd-18px text-white">微信分享</NButton> -->
        </div>
      </div>
      <div ref="captureDiv" class="content max-w-375px w-full flex flex-col rd-tl-14px rd-tr-14px bg-white">
        <div class="line1 flex items-center">
          <div class="boder-#D8D8D8 box-border box-border h-330px flex flex-col flex-1 rd-10px p24px">
            <div class="title text-16px text-#000000 font-600">评测结果等级评定</div>
            <div class="flex-center flex-col flex-1">
              <div ref="pieRef" class="box-border w-full flex-1"></div>
              <div class="mi w-full text-12px text-#666666">
                *根据教育部《关于普通高中学业水平考试的实施意见》(教基二(2016)7号)所给的标准，以等级呈现成绩，位次由高到低为A至E等级。
                其中A等级15%，B等级30%，C等级30%，D、E等级共25%，智能提分系统参照此文件，在义务教育阶段同等适用。
              </div>
            </div>
          </div>
        </div>

        <!-- 题目解析 -->
        <div class="line1 flex items-center">
          <div class="boder-#D8D8D8 box-border flex flex-col flex-1 rd-10px p24px">
            <div class="title mb12px text-16px text-#000000 font-600">题目解析</div>
            <div class="grid grid-cols-1 gap-y-15px">
              <div
                v-for="(item, index) in subjectTepmp?.questionAnswers"
                :key="item.id"
                class="h-40px w-full flex cursor-pointer items-center justify-between rd-12px bg-#F4F5F7 px-16px shadow-sm transition-all-300 hover:shadow-lg"
                @click="handleBack(item)"
              >
                <div class="flex items-center">
                  <div class="mr-30px text-14px text-#3d3d3d">第{{ index + 1 }}题</div>
                  <template v-if="item.isRight">
                    <icon-local-jiexig />
                  </template>
                  <template v-else>
                    <icon-local-jiexix />
                  </template>
                </div>
                <div class="flex items-center">
                  <div class="mr-8px text-[rgba(0,0,0,0.6)]">问题解析</div>
                  <icon-local-jiexir />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 知识点解析 -->
        <div class="line1 flex items-center">
          <div class="boder-#D8D8D8 box-border flex flex-col flex-1 rd-10px p24px">
            <div class="title mb12px text-16px text-#000000 font-600">知识点解析</div>
            <div class="grid grid-cols-1">
              <NDataTable
                align="center"
                :columns="createSmallColumns()"
                :data="subjectTepmp?.knowledges"
                :bordered="false"
              />
            </div>
          </div>
        </div>

        <!-- btn -->
        <div v-if="false" class="box-border w-full flex flex-col items-center px24px pb20px">
          <div class="mb-10px h54px w-343px flex cursor-pointer items-center justify-center rd-12px bg-#2CB6FF">
            <icon-local-jiexib />
            <span class="ml10px text-18px text-#ffffff font-600">举一反三,智能推题</span>
          </div>
          <div class="text-12px text-#000000">基于当前错题智能生成新的练习题</div>
        </div>
      </div>
    </main>
  </div>
  <NDrawer v-model:show="showDraw" close-on-esc :width="worngWitdth" content-class="bluebg" placement="right">
    <NDrawerContent :native-scrollbar="false" title="错题详解" closable>
      <QuestionDetail :id="activeQuesiontionId" @open-video="handleOpenVideo" />
    </NDrawerContent>
  </NDrawer>
  <NDrawer
    v-model:show="showVideoDraw"
    block-scroll
    width="100%"
    close-on-esc
    height="80%"
    content-class="bluebg"
    placement="bottom"
  >
    <NDrawerContent closable body-content-class="h-full flex" :native-scrollbar="false" title="知识点学习">
      <VideoStudy :id="activeVideoId" />
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
.topbg {
  background: linear-gradient(180deg, #2cb6ff 10%, #a1ecff 100%), #d8d8d8;
}
.titlebg {
  background: linear-gradient(180deg, #ffffff 50%, #d2efff 88%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
:deep(.n-descriptions-table-header) {
  background: #eff7fe !important;
}
:deep(.n-descriptions-table-content) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
/* :deep(.n-data-table-th__title) {
  text-align: center;
} */
:deep(.n-data-table-th) {
  background-color: #eff7fe !important;
}
:deep(.zw .n-descriptions-table-header) {
  width: 120px;
}
:deep(.zw .n-descriptions-table-content) {
  display: flex !important;
  align-items: center !important;
  justify-content: start !important;
}
:deep(.gx .n-data-table-th__title) {
  text-align: left;
}
:deep(.btnbg) {
  background: linear-gradient(180deg, #2cb6ff 10%, #a1ecff 100%), #d8d8d8;
  --n-border: 1px solid transparent !important;
  --n-border-hover: 1px solid transparent !important;
  --n-border-pressed: 1px solid transparent !important;
  --n-border-focus: 1px solid transparent !important;
  --n-border-disabled: 1px solid transparent !important;
}
</style>
