<script setup lang="ts"></script>

<template>
  <div class="box-border px-230px">
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
          <NButton class="mr10px rd-18px text-white">本机打印</NButton>
          <NButton class="rd-18px text-white">微信分享</NButton>
        </div>
      </div>
      <div class="content w-full flex flex-col">
        <div class="line1 mt16px flex items-center">
          <div class="boder-#D8D8D8 mr16px box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title text-16px text-#000000 font-600">评测结果等级评定</div>
            <div class="flex-center flex-1">1</div>
          </div>
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title flex items-center text-16px text-#000000 font-600">
              TDL指标
              <span class="mi ml-13px text-12px text-#666666">T=Think D=Develop L=Learning Ability</span>
            </div>
            <div class="flex-center flex-1">1</div>
          </div>
        </div>
        <div class="line2 mt16px flex items-center">
          <div class="boder-#D8D8D8 mr16px box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title text-16px text-#000000 font-600">试卷分析</div>
            <div class="flex-center flex-1">1</div>
          </div>
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title flex items-center text-16px text-#000000 font-600">题目分布</div>
            <div class="flex-center flex-1">1</div>
          </div>
        </div>
        <div class="line3 mt16px flex items-center">
          <div class="boder-#D8D8D8 mr16px box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title text-16px text-#000000 font-600">评测结果综合评估知识点掌握度</div>
            <div class="flex-center flex-1">1</div>
          </div>
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title flex items-center text-16px text-#000000 font-600">知识点关系图</div>
            <div class="flex-center flex-1">1</div>
          </div>
        </div>
        <div class="line3 mt16px flex items-center">
          <div class="boder-#D8D8D8 box-border h-330px flex flex-col flex-1 border rd-10px p24px">
            <div class="title flex items-center text-16px text-#000000 font-600">评测结果综合评估知识点掌握度</div>
            <div class="flex-center flex-1">1</div>
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
</style>
