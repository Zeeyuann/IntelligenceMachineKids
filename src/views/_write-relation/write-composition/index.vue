<script lang="ts" setup>
import type { UploadFileInfo, UploadInst } from 'naive-ui';
import { useLoading } from '@sa/hooks';
import { useUpload } from '@/hooks/common/upload';
import { conversation } from '@/service/api';
// import { useFileStore } from '@/store/modules/file/index';
import { markedRender } from '@/utils/highlight';
const { list, customUploadFile, handleRemove } = useUpload();

const { loading, startLoading, endLoading } = useLoading();

// const fileStore = useFileStore();
// fileStore.clearUploadedFile();

interface Data {
  prompt: string;
  sysuer: string;
}

const route: any = useRoute();
const hasQuery = computed(() => Object.keys(route.query).length > 0);
const temp: any = reactive({});

if (hasQuery) {
  Object.assign(temp, JSON.parse(route.query.item));
  console.log('🚀 ~ temp:', temp);
}

const drawActice = ref(false);

function handleDraw() {
  drawActice.value = true;
}

// 剪切板
const { copy, isSupported } = useClipboard();

async function handleCopy(text: string) {
  if (!isSupported) {
    window.$message?.error('您的浏览器不支持Clipboard API');
    return;
  }

  await copy(text);
  window.$message?.success(`复制成功!`);
}

// 输入相关
const prompt = ref('');

const fileList = ref<UploadFileInfo[]>(list.value);

const chatList = reactive<any>([]);

// 清空
const uploadRef = ref<UploadInst | null>(null);
const handleRestForm = () => {
  prompt.value = '';
  uploadRef.value?.clear();
  fileList.value = [];
};

// 滚动
const scrollBar = ref<any>(null);
const isComplete = ref(false);

function handleScroll() {
  const { start, stop } = useTimeoutFn(handleScroll, 1000);
  start();
  if (isComplete.value) {
    stop();
  }
  nextTick(() => {
    const content: any = document.querySelector('.n-scrollbar-container');
    if (content?.scrollHeight > content?.clientHeight) {
      scrollBar.value.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
    }
    isComplete.value = false;
  });
}

const cid = ref<string>('');
// 文本生成
const handleGenerate = async (data: any, forShow: any) => {
  const { data: textData, error } = await conversation(data);
  if (!error) {
    await nextTick();
    cid.value = textData.completion_tokens;
    const index = chatList.length - 1;
    chatList[index] = { ...forShow, ...textData };
    handleScroll();
  }
  endLoading();
  handleRestForm();
};

// 按钮生成
const handleGenerateFromBtn = async () => {
  if (loading.value) {
    window?.$message?.info('请稍等');
    return;
  }
  if (!prompt.value.trim()) {
    window?.$message?.info('请输入内容');
    return;
  }

  isComplete.value = false;
  startLoading();

  const forShow = {
    isSending: true,
    completion_tokens: undefined,
    prompt: prompt.value,
    content: ' '
  };

  chatList.push(forShow);
  handleScroll();

  const data: Data = {
    sysuer: temp.id,
    prompt: prompt.value
  };

  handleGenerate(data, forShow);
};

const handleTypeComplete = async (item: any) => {
  item.isSending = false;
};

onMounted(() => {});
</script>

<template>
  <div class="box-border size-full flex flex-col of-hidden pb-40px pt-30px">
    <!-- title -->
    <div v-loading="true" class="mb-20px box-border flex flex-col items-center pl-560px pr-214px">
      <div class="w-full flex items-center justify-between overflow-visible">
        <div class="animate__animated animate__fadeInLeft mr-127px flex-1 text-24px text-#3D3D3D">
          {{ temp.title }}
        </div>
        <div class="animate__animated animate__fadeInRight">
          <!--
 <NButton
            class="box-border rd-14px text-18px text-#181818 font-600 !h-54px !w-153px !border-none !bg-white"
            size="large"
          >
            <icon-local-green-plus />
            <span class="ml8px">新建对话</span>
          </NButton>
-->
          <NButton
            class="ml-30px box-border rd-14px text-18px text-#181818 font-600 !h-54px !w-54px !border-none !bg-white"
            size="large"
            @click="handleDraw"
          >
            <icon-local-clock class="scale-100" />
          </NButton>
          <NDrawer v-model:show="drawActice" width="50%" placement="right">
            <NDrawerContent>
              <template #header>
                <div class="w-full flex items-center justify-between">
                  文本创作记录
                  <icon-local-close class="cursor-pointer" @click="drawActice = false" />
                </div>
              </template>
              <div class="box-border w-full">
                <div
                  v-for="item in 10"
                  :key="item"
                  class="hisitem mb-10px box-border w-full flex flex-col cursor-pointer border border-#DADADA rd-14px p-16px"
                >
                  <div class="mi text-14px font-500">
                    请帮我写一首关于春天的作文，要重点描述春天的绿色和花朵的鲜艳。
                  </div>
                  <div class="flex items-center">
                    <div
                      class="mi my-10px mr-8px flex items-center justify-center rd-14px bg-#F5F8F7 px-10px py5px text-12px"
                    >
                      写景
                    </div>
                  </div>
                  <div class="mi line-clamp-3 text-12px text-#666666 line-height-20px">
                    请帮我写一首关于春天的作文，要重点描述春天的绿色和花朵的鲜艳。请帮我写一首关于春天的作文，要重点描述春天的绿色和花朵的鲜艳。请帮我写一首关于春天的作文，要重点描述春天的绿色和花朵的鲜艳。请帮我写一首关于春天的作文，要重点描述春天的绿色和花朵的鲜艳。
                  </div>
                </div>
              </div>
            </NDrawerContent>
          </NDrawer>
        </div>
      </div>
    </div>
    <!-- 对话 -->
    <NScrollbar
      ref="scrollBar"
      class="animate__animated content animate__fadeIn mb-16px box-border flex flex-col flex-1 px-560px"
    >
      <div class="box-border w-full flex flex-col rd-14px bg-#ffffff px-16px pb-20px pt-24px">
        <div class="mb-8px ml-10px flex items-center">
          <icon-local-hi class="scale-200" />
          <span v-if="false" class="mi ml-15px text-18px font-600">晚上好！</span>
        </div>
        <div class="text-16px line-height-24px">
          {{ temp.prologue }}
        </div>
      </div>
      <div v-for="item in chatList" :key="item.create_time" class="each my-16px flex flex-col">
        <!-- ask -->
        <div
          class="mb-16px box-border w-[fit-content] self-end rd-bl-12px rd-br-2px rd-lt-12px rd-rt-12px p-16px text-14px text-white font-500"
          :style="{ background: ' linear-gradient(180deg, #2B2D24 0%, #0B0C09 100%), #FFFFFF' }"
        >
          {{ item.prompt }}
          <div class="flex items-center">
            <template v-if="item.file_ids && item.file_ids.indexOf('jpg' || 'png') > 0">
              <NImage object-fit="cover" class="w-full" :src="item.file_ids" />
            </template>
            <template
              v-else-if="item.file_ids && item.file_ids.indexOf('txt' || 'doc' || 'pdf' || 'xls' || 'xlsx') > 0"
            >
              <icon-ph:file class="mr-5px h-16px w-16px" />
              {{ item.file_ids }}
            </template>
          </div>
        </div>
        <!-- answer -->
        <div
          class="box-border w-full flex flex-col rd-bl-12px rd-br-12px rd-lt-2px rd-rt-12px bg-white p-16px text-14px font-500"
        >
          <template v-if="item.isSending">
            <VueTyped
              v-if="item.content"
              :strings="[markedRender(item.content)]"
              @complete="isComplete = true"
              @reset="handleTypeComplete(item)"
            />
          </template>

          <div v-else class="span" v-html="markedRender(item.content)"></div>
          <div v-if="item.content" class="tool self-end justify-items-end">
            <NButton
              class="box-border rd-14px text-18px text-#181818 font-600 !h-54px !w-54px !border-none !bg-white"
              size="large"
              @click="handleCopy(item.content)"
            >
              <icon-local-copy-write class="scale-100" />
            </NButton>
          </div>
          <div v-if="false" class="mb-16px border-b border-b-#E6E6E6"></div>
          <div v-if="false" class="text-12px font-400">
            <div class="mb-5px">你可能还想问</div>
            <div class="mb-5px cursor-pointer">·以秋天为主题，写一篇描绘秋天景色的文章。</div>
          </div>
        </div>
      </div>
    </NScrollbar>
    <!-- 输入框 -->
    <div class="animate__animated animate__fadeIn px-560px">
      <!-- 上传和tag -->
      <div class="mb-16px w-full flex items-center justify-between">
        <div class="flex flex-1 items-center">
          <div v-if="false" class="mi mr-8px rd-14px bg-white px-10px py5px text-14px">写景助手</div>
        </div>
        <NUpload
          ref="uploadRef"
          action="#"
          :default-file-list="fileList"
          accept=".txt,.doc.pdf,.jpg,.png,.xls,.xlsx"
          class="w-unset"
          :max="1"
          :custom-request="customUploadFile"
          list-type="image"
          @remove="handleRemove"
        >
          <NButton quaternary class="!text-#4D4D4D">
            <icon-local-plus />
            <span class="ml-8px">上传文件</span>
          </NButton>
        </NUpload>
      </div>
      <div class="box-border w-full flex items-center rd-14px bg-white p-25px">
        <div class="box-border w-full flex flex-col">
          <!-- <span class="mi text-14px text-#7A808D">写一篇作文，题目为</span> -->
          <NInput
            v-model:value="prompt"
            placeholder="输入你的需求，按[Enter]发送"
            type="textarea"
            size="small"
            :autosize="{
              minRows: 2,
              maxRows: 2
            }"
            @keydown.enter.prevent="handleGenerateFromBtn"
          />
        </div>
        <NButton
          :loading="loading"
          :color="`${prompt.trim() ? '#181818' : '#F4F5F7'}`"
          :disabled="prompt.trim() ? false : true || loading"
          class="!h-42px !w-42px !rd-12px !text-#4D4D4D"
          @click="handleGenerateFromBtn"
        >
          <icon-local-send />
        </NButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.n-button) {
  --n-border: none !important;
  --n-border-focus: none !important;
  --n-border-hover: none !important;
}
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
:deep(.btn1:not(.btn1--disabled):hover) {
  background: #ffffff !important;
}
:deep(.btn1:not(.btn1--disabled):focus) {
  background: #ffffff !important;
}
:deep(.n-drawer-header__main) {
  width: 100%;
}
.hisitem {
  transition: all 0.3s ease;
}
.hisitem:hover {
  box-shadow:
    0 1px 2px -2px rgba(0, 0, 0, 0.08),
    0 3px 6px 0 rgba(0, 0, 0, 0.06),
    0 5px 12px 4px rgba(0, 0, 0, 0.04);
}
</style>
