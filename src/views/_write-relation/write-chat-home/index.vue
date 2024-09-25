<script setup lang="ts">
import type { UploadFileInfo } from 'naive-ui';
import { useRouterPush } from '@/hooks/common/router';
const { routerPushByKey } = useRouterPush();

const prompt = ref('');

const fileList = ref<UploadFileInfo[]>([]);

const hanldInput = () => {
  if (!prompt.value.trim()) {
    window?.$message?.info('请输入内容');
    return;
  }
  routerPushByKey('write-chat', { query: { prompt: prompt.value } });
};

const handleGoBack = () => {
  routerPushByKey('write');
};
</script>

<template>
  <div class="box-border size-full flex justify-center bg-#F5F7FA pt-220px">
    <div class="box-border w-768px flex flex-col items-center">
      <div class="animate__animated animate__fadeInLeft logo flex cursor-pointer" @click="handleGoBack">
        <SystemLogo class="text-32px text-primary" />
        <h2 class="ddjb pl-8px text-22px text-#0B0B0B font-bold transition duration-300 ease-in-out">
          {{ $t('system.title') }}
        </h2>
      </div>
      <div class="animate__animated animate__fadeInRight my-36px text-18px text-#3d3d3d">
        有问题，为什么不问问神奇海螺呢？
      </div>
      <!-- 输入框 -->
      <div
        class="animate__animated animate__fadeInLeft box-border w-768px flex flex-col items-center rd-14px bg-white p-25px"
      >
        <NInput
          v-model:value="prompt"
          placeholder="输入你的需求，按[Enter]发送"
          type="textarea"
          size="small"
          :autosize="{
            minRows: 3,
            maxRows: 3
          }"
          @keydown.enter.prevent="hanldInput"
        />
        <div class="mt-10px w-full flex items-center justify-between">
          <NUpload
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            :default-file-list="fileList"
            accept=".txt,.doc.pdf"
            :max="1"
            list-type="image"
          >
            <NButton quaternary class="!text-#4D4D4D">
              <icon-local-plus />
              <span class="ml-8px">上传文件</span>
            </NButton>
          </NUpload>
          <NButton
            :color="`${prompt.trim() ? '#181818' : '#F4F5F7'}`"
            :disabled="prompt.trim() ? false : true"
            class="!h-36px !w-36px !rd-12px !text-#4D4D4D"
            @click="hanldInput"
          >
            <icon-local-send />
          </NButton>
        </div>
      </div>
      <!-- 功能 -->
      <div class="animate__animated animate__fadeInRight mt-34px w-full">
        <div class="mb-16px text-15px text-#7A808D">快来探索这些功能</div>
        <div class="flex items-center">
          <NButton
            class="mr-16px box-border box-border h-48px w-186px flex items-center justify-between rd-14px bg-#ffffff px-16px"
          >
            <div class="flex items-center">
              <icon-local-write-logo class="scale-300" />
              <span class="ml-12px text-15px">帮我写作</span>
            </div>
            <img src="../../../assets/imgs/rightarrow.png" class="h-8.5px w-8.5px" alt="" />
          </NButton>
          <NButton
            class="mr-16px box-border box-border h-48px w-186px flex items-center justify-between rd-14px bg-#ffffff px-16px"
          >
            <div class="flex items-center">
              <icon-local-ttp class="scale-200" />
              <span class="ml-12px text-15px">文生图</span>
            </div>
            <img src="../../../assets/imgs/rightarrow.png" class="h-8.5px w-8.5px" alt="" />
          </NButton>
          <NButton
            class="mr-16px box-border box-border h-48px w-186px flex items-center justify-between rd-14px bg-#ffffff px-16px"
          >
            <div class="flex items-center">
              <icon-local-ptp class="scale-200" />
              <span class="ml-12px text-15px">图生图</span>
            </div>
            <img src="../../../assets/imgs/rightarrow.png" class="h-8.5px w-8.5px" alt="" />
          </NButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.n-input) {
  --n-border: border: none !important;
  --n-border-disabled: border: none !important;
  --n-border-hover: border: none !important;
  --n-border-focus: border: none !important;
  --n-box-shadow-focus: none !important;
}
:deep(.n-input-wrapper) {
  padding-left: unset !important;
}
:deep(.n-input__textarea-el) {
  color: #7a808d;
}
:deep(.n-upload) {
  display: flex;
  align-items: center;
}
:deep(.n-upload-file-list) {
  margin-top: unset;
  margin-left: 10px;
}
:deep(.n-button__content) {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
