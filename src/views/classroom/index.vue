<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';
import IconLocalFolder from '~icons/local/folder';

const FORM_LIST: any = reactive([
  {
    label: '请选择班级',
    key: 'value1',
    placeholder: h(
      'div',
      {
        class: 'flex items-center'
      },
      {
        default: () => [h(IconLocalFolder), h('span', { class: 'ml-10px' }, '请选择班级')]
      }
    ),
    option: [
      {
        label: "Everybody's Got Something to Hide Except Me and My Monkey",
        value: 'song0',
        disabled: true
      },
      {
        label: 'Drive My Car',
        value: 'song1'
      },
      {
        label: 'Norwegian Wood',
        value: 'song2'
      }
    ]
  },
  {
    label: '请选科目',
    key: 'value2',
    placeholder: h(
      'div',
      {
        class: 'flex items-center'
      },
      {
        default: () => [h(IconLocalFolder), h('span', { class: 'ml-10px' }, '请选科目')]
      }
    ),
    option: [
      {
        label: "Everybody's Got Something to Hide Except Me and My Monkey",
        value: 'song0',
        disabled: true
      },
      {
        label: 'Drive My Car',
        value: 'song1'
      },
      {
        label: 'Norwegian Wood',
        value: 'song2'
      }
    ]
  },
  {
    label: '请选择版本',
    key: 'value3',
    placeholder: h(
      'div',
      {
        class: 'flex items-center'
      },
      {
        default: () => [h(IconLocalFolder), h('span', { class: 'ml-10px' }, '请选择版本')]
      }
    ),
    option: [
      {
        label: "Everybody's Got Something to Hide Except Me and My Monkey",
        value: 'song0',
        disabled: true
      },
      {
        label: 'Drive My Car',
        value: 'song1'
      },
      {
        label: 'Norwegian Wood',
        value: 'song2'
      }
    ]
  },
  {
    label: '请选择难度',
    key: 'value4',
    placeholder: h(
      'div',
      {
        class: 'flex items-center'
      },
      {
        default: () => [h(IconLocalFolder), h('span', { class: 'ml-10px' }, '请选择难度')]
      }
    ),
    option: [
      {
        label: "Everybody's Got Something to Hide Except Me and My Monkey",
        value: 'song0',
        disabled: true
      },
      {
        label: 'Drive My Car',
        value: 'song1'
      },
      {
        label: 'Norwegian Wood',
        value: 'song2'
      }
    ]
  }
]);

const rules = {
  value1: { required: true, message: '请选择班级' },
  value2: { required: true, message: '请选科目' },
  value3: { required: true, message: '请选择版本' },
  value4: { required: true, message: '请选择难度' }
};

const { formRef, validate } = useNaiveForm();
const model: any = reactive({
  value1: undefined,
  value2: undefined,
  value3: undefined,
  value4: undefined
});

async function handleSubmit() {
  await validate();

  // request
  window.$message?.success('1');
}
</script>

<template>
  <DarkModeContainer class="flex-center flex-col p-unset">
    <header class="bg box-border flex flex-col justify-center pl-234px">
      <div class="text-60px text-#0B0B0B font-400">王队长成长营</div>
      <div class="title almm text-65px font-700">孩子的第一堂AI课</div>
      <div class="text-34px text-#000000 font-400">Superx自研大模型，智能高效全能问答</div>
      <NButton type="primary" class="global-btn my-48px h-68px !w-233px !text-22px !font-600" round block>
        开始写作
      </NButton>
    </header>
    <main class="contentbg box-border flex flex-col items-center justify-center">
      <div class="text-65px text-#2a2a2a font-700">AI精准测</div>
      <div class="mb-70px mt-16px text-24px text-#3d3d3d font-400">精准识别学科知识薄弱点，查漏补缺助学习</div>
      <div class="w-614px">
        <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
          <NFormItem v-for="item in FORM_LIST" :key="item.key" :path="item.key">
            <NSelect v-model:value="model[item.key]" :placeholder="item.placeholder" :options="item.option" />
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
    </main>
  </DarkModeContainer>
</template>

<style scoped>
.bg {
  width: 100%;
  height: 860px;
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
  height: 1155px;
  background: url('https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/image/contentbg.png') no-repeat;
  background-size: cover;
}
:deep(.n-base-selection .n-base-selection-label) {
  background-color: #f4f5f7;
}
:deep(.n-base-selection-placeholder__inner) {
  font-size: 16px;
  font-family: Syht;
  color: #1a1a1a;
}
</style>
