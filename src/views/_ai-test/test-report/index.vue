<script setup lang="ts">
import html2canvas from 'html2canvas';
import printJS from 'print-js';
import { useEcharts } from '@/hooks/common/echarts';
import { chatPieOptions, createColumns, createSubjectColumns, fullPieOptions, lineOption, pieOptions } from './data';

const { domRef: pieRef } = useEcharts(() => pieOptions, { onRender() {} });
const { domRef: fullPieRef } = useEcharts(() => fullPieOptions, { onRender() {} });
const { domRef: wechatPieRef } = useEcharts(() => chatPieOptions, { onRender() {} });
const { domRef: lineRef } = useEcharts(() => lineOption, { onRender() {} });

// 试卷分析

const analylisList = [
  {
    label: '学科',
    key: ''
  },
  {
    label: '分数',
    key: ''
  },
  {
    label: '知识点书',
    key: ''
  },
  {
    label: '综合难度',
    key: ''
  },
  {
    label: '正确率',
    key: ''
  }
];

// 题目分布
const seperateColumns = [
  {
    title: '难度系数',
    key: 'title'
  },
  {
    title: '题数',
    key: 'title'
  },
  {
    title: '占分',
    key: 'title'
  },
  {
    title: '做对数',
    key: 'title'
  },
  {
    title: '做错数',
    key: 'title'
  },
  {
    title: '正确率',
    key: 'title'
  }
];
const data = [
  { no: 3, title: '1', length: '4:18' },
  { no: 4, title: '1', length: '4:48' },
  { no: 12, title: '1', length: '7:27' }
];

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
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div v-if="windowWidth > 768" class="box-border px-230px py-20px">
    <main class="box-border size-full flex flex-col rd-10px bg-white p-16px">
      <div
        class="topbg box-border h-218px w-full flex items-center justify-between rd-10px py-60px pl-60px pr-328px text-white"
      >
        <div>
          <div class="almm titlebg mb-20px text-26px text-white">恭喜完成测试</div>
          <div class="mb5px text-14px">测试得分</div>
          <div class="text-18px font-600">100</div>
        </div>
        <div>
          <div class="flex items-center text-13px">
            <span>报告ID：</span>
            <span>20240912849234</span>
          </div>
          <div class="my8px flex items-center text-13px">
            <span>科目：</span>
            <span>数学</span>
          </div>
          <div class="flex items-center text-13px">
            <span>用时：</span>
            <span>177S</span>
          </div>
        </div>
        <div class="h64px w-1px bg-white"></div>
        <div>
          <div class="flex items-center text-13px">
            <span>日期：2024-09-10 14：42</span>
            <span>2024-09-10 14：42</span>
          </div>
          <div class="my8px flex items-center text-13px">
            <span>测试范围：</span>
            <span>数学</span>
          </div>
        </div>
        <div>
          <NButton class="mr10px rd-18px text-white" @click="capture">本机打印</NButton>
          <NButton class="rd-18px text-white">微信分享</NButton>
        </div>
      </div>
      <div ref="captureDiv" class="content w-full flex flex-col">
        <div class="line1 mt16px flex items-center">
          <div class="boder-#D8D8D8 mr16px box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title text-16px text-#000000 font-600">评测结果等级评定</div>
            <div class="flex-center flex-col flex-1">
              <div ref="pieRef" class="size-full"></div>
              <div class="mi w-343px text-12px text-#666666">
                *根据教育部《关于普通高中学业水平考试的实施意见》(教基二(2016)7号)所给的标准，以等级呈现成绩，位次由高到低为A至E等级。
                其中A等级15%，B等级30%，C等级30%，D、E等级共25%，智能提分系统参照此文件，在义务教育阶段同等适用。
              </div>
            </div>
          </div>
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title flex items-center text-16px text-#000000 font-600">
              TDL指标
              <span class="mi ml-13px text-12px text-#666666">T=Think D=Develop L=Learning Ability</span>
            </div>
            <div class="box-border flex-center flex-col flex-1 px-126px">
              <div class="h-54px w-full flex-center rd-14px bg-#2CB6FF text-#ffffff">28.0</div>
              <div class="mi mb-32px mt-5px text-12px text-#666666">TDL数值越高表示该环节的水平越高,最高值是30</div>
              <div class="grid grid-cols-3 w-full gap-x-16px">
                <div class="h-54px w-full flex-center flex-col rd-10px bg-#EFF7FE">
                  <div class="text-18px text-#2CB6FF font-600">115</div>
                  <div class="mi text-12px text-#666666">平均答题时间</div>
                </div>
                <div class="h-54px w-full flex-center flex-col rd-10px bg-#EFF7FE">
                  <div class="text-18px text-#2CB6FF font-600">100.0%</div>
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
                      <div class="mi text-12px text-#666666">6/10</div>
                    </NProgress>
                  </div>
                  <div class="mi mt6px text-12px text-#666666">平均难度</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="line2 mt16px flex items-center">
          <div class="boder-#D8D8D8 mr16px box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title mb-16px text-16px text-#000000 font-600">试卷分析</div>
            <div class="w-full flex flex-col flex-1">
              <NDescriptions label-align="center" class="w-full" label-placement="left" bordered>
                <NDescriptionsItem v-for="item in analylisList" :key="item.label" :label="item.label">
                  {{ item.label }}
                </NDescriptionsItem>
              </NDescriptions>
              <div ref="fullPieRef" class="box-border w-full flex-1 pt-20px"></div>
            </div>
          </div>
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title mb-16px flex items-center text-16px text-#000000 font-600">题目分布</div>
            <div class="flex-center flex-1">
              <NDataTable :columns="seperateColumns" align="center" :data="data" bordered :single-line="false" />
            </div>
          </div>
        </div>
        <div class="line3 mt16px flex items-center">
          <div class="boder-#D8D8D8 mr16px box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title mb-16px text-16px text-#000000 font-600">评测结果综合评估知识点掌握度</div>
            <div class="flex-center flex-1 of-hidden">
              <NScrollbar class="w-full flex-1">
                <div v-for="item in 10" :key="item" class="mb-12px flex flex-col">
                  <div class="mi mb-16px text-14px">
                    1.第二单元 万以内数的加法和减法(一) /两位数加两位数的口算方法(不进位)
                  </div>
                  <NDescriptions label-align="center" class="zw w-full" label-placement="left" bordered>
                    <NDescriptionsItem block label="相关题目">
                      <div class="flex items-center">
                        <div
                          class="mr-10px h-22px w-22px flex items-center justify-center border border-#0ECBCB rd-50% text-12px text-#0ECBCB"
                        >
                          16
                        </div>
                        <div
                          class="mr-10px h-22px w-22px flex items-center justify-center border border-#0ECBCB rd-50% text-12px text-#0ECBCB"
                        >
                          16
                        </div>
                      </div>
                    </NDescriptionsItem>
                  </NDescriptions>
                  <NDescriptions label-align="center" class="zw w-full" label-placement="left" bordered>
                    <NDescriptionsItem block label="相关题目">
                      <NProgress
                        type="line"
                        :percentage="50"
                        :height="13"
                        :show-indicator="false"
                        color="#2FBF78"
                        rail-color="#DBDCDF"
                      ></NProgress>
                    </NDescriptionsItem>
                  </NDescriptions>
                  <NDescriptions label-align="center" class="zw w-full" label-placement="left" bordered>
                    <NDescriptionsItem block label="相关题目">
                      <div class="flex items-center">
                        <div class="mi mr-10px h-20px w-54px flex-center rd-100px bg-#2FBF78 text-12px text-white">
                          掌握
                        </div>
                      </div>
                    </NDescriptionsItem>
                  </NDescriptions>
                </div>
              </NScrollbar>
            </div>
          </div>
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title mb-16px flex items-center text-16px text-#000000 font-600">知识点关系图</div>
            <div class="flex flex-col flex-1">
              <div class="mi mb-16px text-12px text-#666666">
                *先打印计划、再学习巩固，最后在打印稿上记录下学习后的2次复测成绩，让你的进步随时可见
              </div>
              <NDataTable
                class="gx flex-1"
                :columns="createColumns()"
                flex-height
                align="left"
                :data="data"
                bordered
                :single-line="false"
              />
            </div>
          </div>
        </div>
        <div class="line3 mt16px flex items-center">
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title mb-16px flex items-center text-16px text-#000000 font-600">
              评测结果综合评估知识点掌握度
            </div>
            <div class="flex flex-col flex-1">
              <div class="mi text-12px text-#111111">
                结合本次测评的核心知识点分布，通过大数据分析技术，基于学科知识点认知图谱的算法模型，精准推荐快速有效提分的知识点。我们认为应该优先学习和提升以下知识点，如果在以下知识点能达到预期掌握水平，预计在下次测评中可以提升
              </div>
              <div ref="lineRef" class="box-border w-full flex-1 pt-16px"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <div v-else class="box-border py-20px">
    <main class="box-border w-full flex flex-col rd-10px bg-white p-0px">
      <div class="topbg box-border w-full flex flex-col items-center justify-between rd-10px p24px text-white">
        <div class="flex flex-col items-center">
          <div class="almm titlebg mb-20px text-26px text-white">恭喜完成测试</div>
          <div class="mb5px text-14px">测试得分</div>
          <div class="text-18px font-600">100</div>
        </div>
        <div class="flex items-center">
          <div class="flex-1">
            <div class="flex items-center text-13px">
              <span>报告ID：</span>
              <span>20240912849234</span>
            </div>
            <div class="my8px flex items-center text-13px">
              <span>科目：</span>
              <span>数学</span>
            </div>
            <div class="flex items-center text-13px">
              <span>用时：</span>
              <span>177S</span>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-center text-13px">
              <span>日期：2024-09-10 14：42</span>
              <span>2024-09-10 14：42</span>
            </div>
            <div class="my8px flex items-center text-13px">
              <span>测试范围：</span>
              <span>数学</span>
            </div>
          </div>
        </div>
        <div>
          <NButton class="mr10px rd-18px text-white" @click="capture">本机打印</NButton>
          <NButton class="rd-18px text-white">微信分享</NButton>
        </div>
      </div>
      <div ref="captureDiv" class="content w-full flex flex-col">
        <div class="line1 mt16px flex items-center">
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
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
        <div class="line1 mt16px flex items-center">
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title flex items-center text-16px text-#000000 font-600">
              TDL指标
              <span class="mi ml-13px text-12px text-#666666">T=Think D=Develop L=Learning Ability</span>
            </div>
            <div class="box-border flex-center flex-col flex-1 px-20px">
              <div class="h-54px w-full flex-center rd-14px bg-#2CB6FF text-#ffffff">28.0</div>
              <div class="mi mb-32px mt-5px text-12px text-#666666">TDL数值越高表示该环节的水平越高,最高值是30</div>
              <div class="grid grid-cols-3 w-full gap-x-16px">
                <div class="h-54px w-full flex-center flex-col rd-10px bg-#EFF7FE">
                  <div class="text-18px text-#2CB6FF font-600">115</div>
                  <div class="mi text-12px text-#666666">平均答题时间</div>
                </div>
                <div class="h-54px w-full flex-center flex-col rd-10px bg-#EFF7FE">
                  <div class="text-18px text-#2CB6FF font-600">100.0%</div>
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
                      <div class="mi text-12px text-#666666">6/10</div>
                    </NProgress>
                  </div>
                  <div class="mi mt6px text-12px text-#666666">平均难度</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="line2 mt16px flex items-center">
          <div class="boder-#D8D8D8 box-border h-700px flex flex-col flex-1 border rd-10px p24px">
            <div class="title mb-16px text-16px text-#000000 font-600">试卷分析</div>
            <div class="w-full flex flex-col flex-1">
              <NDescriptions :column="1" label-align="center" class="w-full" label-placement="left" bordered>
                <NDescriptionsItem v-for="item in analylisList" :key="item.label" :label="item.label">
                  {{ item.label }}
                </NDescriptionsItem>
              </NDescriptions>
              <div ref="wechatPieRef" class="box-border w-full flex-1 pt-20px"></div>
            </div>
          </div>
        </div>
        <div class="line3 mt16px flex items-center">
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title mb-16px flex items-center text-16px text-#000000 font-600">知识点关系图</div>
            <div class="flex flex-col flex-1">
              <NDataTable
                class="gx flex-1"
                :columns="createSubjectColumns()"
                flex-height
                align="left"
                :data="data"
                bordered
                :single-line="false"
              />
            </div>
          </div>
        </div>
        <div class="line3 mt16px flex items-center">
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title mb-16px text-16px text-#000000 font-600">评测结果综合评估知识点掌握度</div>
            <div class="flex-center flex-1 of-hidden">
              <NScrollbar class="w-full flex-1">
                <div v-for="item in 10" :key="item" class="mb-12px flex flex-col">
                  <div class="mi mb-16px text-14px">
                    1.第二单元 万以内数的加法和减法(一) /两位数加两位数的口算方法(不进位)
                  </div>
                  <NDescriptions label-align="center" class="zw w-full" label-placement="left" bordered>
                    <NDescriptionsItem block label="相关题目">
                      <div class="flex items-center">
                        <div
                          class="mr-10px h-22px w-22px flex items-center justify-center border border-#0ECBCB rd-50% text-12px text-#0ECBCB"
                        >
                          16
                        </div>
                        <div
                          class="mr-10px h-22px w-22px flex items-center justify-center border border-#0ECBCB rd-50% text-12px text-#0ECBCB"
                        >
                          16
                        </div>
                      </div>
                    </NDescriptionsItem>
                  </NDescriptions>
                  <NDescriptions label-align="center" class="zw w-full" label-placement="left" bordered>
                    <NDescriptionsItem block label="相关题目">
                      <NProgress
                        type="line"
                        :percentage="50"
                        :height="13"
                        :show-indicator="false"
                        color="#2FBF78"
                        rail-color="#DBDCDF"
                      ></NProgress>
                    </NDescriptionsItem>
                  </NDescriptions>
                  <NDescriptions label-align="center" class="zw w-full" label-placement="left" bordered>
                    <NDescriptionsItem block label="相关题目">
                      <div class="flex items-center">
                        <div class="mi mr-10px h-20px w-54px flex-center rd-100px bg-#2FBF78 text-12px text-white">
                          掌握
                        </div>
                      </div>
                    </NDescriptionsItem>
                  </NDescriptions>
                </div>
              </NScrollbar>
            </div>
          </div>
        </div>
        <div class="line3 mt16px flex items-center">
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title mb-16px flex items-center text-16px text-#000000 font-600">知识点关系图</div>
            <div class="flex flex-col flex-1">
              <div class="mi mb-16px text-12px text-#666666">
                *先打印计划、再学习巩固，最后在打印稿上记录下学习后的2次复测成绩，让你的进步随时可见
              </div>
              <NDataTable
                class="gx flex-1"
                :columns="createColumns()"
                flex-height
                align="left"
                :data="data"
                bordered
                :single-line="false"
              />
            </div>
          </div>
        </div>
        <div class="line3 mt16px flex items-center">
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title mb-16px flex items-center text-16px text-#000000 font-600">
              评测结果综合评估知识点掌握度
            </div>
            <div class="flex flex-col flex-1">
              <div class="mi text-12px text-#111111">
                结合本次测评的核心知识点分布，通过大数据分析技术，基于学科知识点认知图谱的算法模型，精准推荐快速有效提分的知识点。我们认为应该优先学习和提升以下知识点，如果在以下知识点能达到预期掌握水平，预计在下次测评中可以提升
              </div>
              <div ref="lineRef" class="box-border w-full flex-1 pt-16px"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
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
:deep(.n-data-table-th__title) {
  text-align: center;
}
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
</style>
