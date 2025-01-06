<script setup lang="ts">
import dayjs from 'dayjs';
import { useNaiveForm } from '@/hooks/common/form';
import { getEvaluateGrade, getEvaluatePress, getEvaluateSubject } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';
import { useRouterPush } from '@/hooks/common/router';
import { useLoginClassStore } from '@/store/modules/login-class';
import IconLocalFolder from '~icons/local/folder';

const { routerPushByKey } = useRouterPush();
const authStore = useAuthStore();
const loginClassStore = useLoginClassStore();

const rules = {
  gradeId: { required: true, message: '请选择年级' },
  subjectId: { required: true, message: '请选科目' },
  pressName: { required: true, message: '请选择版本' },
  value4: { required: true, message: '请选择难度' }
};

const { formRef, validate } = useNaiveForm();
const model: any = reactive({
  gradeId: undefined,
  subjectId: undefined,
  pressName: undefined,
  value4: undefined
});

const FORM_LIST: any = reactive([
  {
    label: '请选择年级',
    labelField: 'gradeName',
    valueField: 'gradeId',
    key: 'gradeId',
    placeholder: h(
      'div',
      {
        class: 'flex items-center'
      },
      {
        default: () => [h(IconLocalFolder), h('span', { class: 'ml-10px' }, '请选择年级')]
      }
    ),
    option: []
  },
  {
    label: '请选科目',
    key: 'subjectId',
    labelField: 'subjectName',
    valueField: 'subjectId',
    disabled: computed(() => !model.gradeId),
    placeholder: h(
      'div',
      {
        class: 'flex items-center'
      },
      {
        default: () => [h(IconLocalFolder), h('span', { class: 'ml-10px' }, '请选科目')]
      }
    ),
    option: []
  },
  {
    label: '请选择版本',
    disabled: computed(() => !model.subjectId),
    key: 'pressName',
    placeholder: h(
      'div',
      {
        class: 'flex items-center'
      },
      {
        default: () => [h(IconLocalFolder), h('span', { class: 'ml-10px' }, '请选择版本')]
      }
    ),
    option: []
  }
  // {
  //   label: '请选择难度',
  //   key: 'value4',
  //   placeholder: h(
  //     'div',
  //     {
  //       class: 'flex items-center'
  //     },
  //     {
  //       default: () => [h(IconLocalFolder), h('span', { class: 'ml-10px' }, '请选择难度')]
  //     }
  //   ),
  //   option: [
  //     {
  //       label: "Everybody's Got Something to Hide Except Me and My Monkey",
  //       value: 'song0',
  //       disabled: true
  //     },
  //     {
  //       label: 'Drive My Car',
  //       value: 'song1'
  //     },
  //     {
  //       label: 'Norwegian Wood',
  //       value: 'song2'
  //     }
  //   ]
  // }
]);

(async () => {
  const { data, error } = await getEvaluateGrade();
  console.log('🚀 ~ data:', data);
  if (!error) {
    Object.assign(FORM_LIST[0], { option: data });
  }
})();

watch([() => model.gradeId, () => model.subjectId], async ([gid, sid]) => {
  const { data: subject, error } = await getEvaluateSubject(gid);
  if (!error) {
    Object.assign(FORM_LIST[1], { option: subject });
  }
  if (!sid) return;
  const { data: version, error: versionError } = await getEvaluatePress(gid, sid);
  if (!versionError) {
    Object.assign(FORM_LIST[2], { option: version.map((item: string) => ({ label: item, value: item })) });
  }
});
const go = () => {
  routerPushByKey('study');
};

const view = ref();
const view2 = ref();

const intoView = () => {
  view.value.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
};

const intoLianView = () => {
  view2.value.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
};

async function handleSubmit() {
  // window?.$message?.info('版本功能升级中,请耐心等待');
  // return;
  if (!authStore.isLogin) {
    loginClassStore.setFlag(true);
    window?.$message?.info('请先登录哦');
    setTimeout(() => {
      loginClassStore.setFlag(false);
    }, 1000);
    return;
  }

  if (authStore.userInfo.vip_time < dayjs().valueOf()) {
    window?.$message?.error('抱歉,您没有使用权限');
    return;
  }
  console.log(model);
  console.log(FORM_LIST);

  await validate();
  const { gradeId, subjectId, pressName } = model;
  routerPushByKey('test-home', { query: { gradeId, subjectId, pressName } });
}
</script>

<template>
  <DarkModeContainer class="flex-center flex-col p-unset">
    <header
      class="bg box-border flex flex-col justify-center lg:h-770px xl:h-860px lg:px-100px xl:pl-234px xl:pl-234px lg:!bg-center"
    >
      <div class="scale-50 lg:scale-90 xl:scale-100">
        <div class="text-60px text-#0B0B0B font-400">
          <img class="h-75px w-408px" src="/src/assets/imgs/classlogo.png" alt="" />
        </div>
        <div class="title almm text-65px font-700">家庭必修的第一堂AI课</div>
        <div class="text-34px text-#000000 font-400">AI辅学，孩子好成绩</div>
        <div class="flex items-center">
          <NButton
            type="primary"
            class="global-btn my-48px mr-40px h-68px !w-233px !text-22px !font-600"
            round
            block
            @click="go"
          >
            <icon-local-startplay class="mr-10px" />
            开始学习
          </NButton>
          <NButton
            type="primary"
            class="global-btn my-48px mr-40px h-68px !w-233px !text-22px !font-600"
            round
            block
            @click="intoView"
          >
            AI精准测
          </NButton>
          <NButton
            v-if="false"
            type="primary"
            class="global-btn my-48px h-68px !w-233px !text-22px !font-600"
            round
            block
            @click="intoLianView"
          >
            AI精准练
          </NButton>
        </div>
      </div>
    </header>
    <main class="contentbg box-border flex flex-col items-center justify-center">
      <div ref="view" class="flex flex-col items-center justify-center">
        <div class="text-65px text-#2a2a2a font-700">AI精准测</div>
        <div class="mb-70px mt-16px text-24px text-#3d3d3d font-400">精准识别学科知识薄弱点，查漏补缺助学习</div>
        <div class="w-614px">
          <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
            <NFormItem v-for="item in FORM_LIST" :key="item.key" :path="item.key">
              <NSelect
                v-model:value="model[item.key]"
                :value-field="item.valueField"
                :disabled="item.disabled"
                :label-field="item.labelField"
                :placeholder="item.placeholder"
                :options="item.option"
              />
            </NFormItem>
            <NButton
              type="primary"
              class="global-btn my-48px h-64px !w-full !text-22px !font-600"
              round
              block
              @click="handleSubmit"
            >
              立即开始
            </NButton>
          </NForm>
        </div>
      </div>
      <div v-if="false" ref="view2" class="flex flex-col items-center justify-center">
        <div class="text-65px text-#2a2a2a font-700">AI精准练</div>
        <div class="mb-70px mt-16px text-24px text-#3d3d3d font-400">哪里不会练哪里，今日任务在这里</div>
        <div class="grid grid-cols-3 w-614px gap-16px">
          <div
            v-for="item in 9"
            :key="item"
            class="alph relative box-border h-215px w-full flex flex-col cursor-pointer justify-between rd-16px bg-[rgba(44,182,255,0.78)] p-16px text-14px text-white transition-all transition-duration-200 ease-in-out hover:shadow-lg"
          >
            <div class="self-center text-18px">语文</div>
            <div class="flex items-center">
              <span>题 量:</span>
              <span>10题</span>
            </div>
            <div class="flex items-start">
              <span>知识点:</span>
              <div class="flex flex-col items-start">
                <span>内容知识点1</span>
                <span>内容知识点2</span>
                <span>内容知识点3</span>
              </div>
            </div>
            <div class="flex items-center">
              <span>来 源:</span>
              <span>错题本生成</span>
            </div>
            <NButton class="whitebtn rd-12px bg-white text-#2CB6FF">查看报告</NButton>
            <div
              class="absolute right-0 top-0 box-border h-20px flex items-center justify-center rd-lb-10px p-5px text-12px"
              :class="`${true ? 'bg-#00B578' : 'bg-#FA5151'}`"
            >
              <icon-local-dui />
              <span class="ml-5px">已完成</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </DarkModeContainer>
</template>

<style scoped>
.bg {
  width: 100%;

  background: url('https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/image/webbg2.png') no-repeat;
  background-size: cover;
}
.title {
  font-variation-settings: 'opsz' auto;
  font-feature-settings: 'kern' on;
  background: linear-gradient(82deg, #000000 64%, #352a2a 78%, #774d4d 96%), #0b0b0b;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.contentbg {
  width: 100%;
  background: url('https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/image/contentbg.png') no-repeat;
  background-size: cover;
  padding-bottom: 40px;
}
:deep(.n-base-selection .n-base-selection-label) {
  background-color: #f4f5f7;
}
:deep(.n-base-selection-placeholder__inner) {
  font-size: 16px;
  font-family: Syht;
  color: #1a1a1a;
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
</style>
