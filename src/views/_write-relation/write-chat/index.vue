<script lang="ts" setup>
import type { UploadFileInfo, UploadInst } from 'naive-ui';
import { useLoading } from '@sa/hooks';
import { useUpload } from '@/hooks/common/upload';
import { ocraiSolve } from '@/service/api';
import { useFileStore } from '@/store/modules/file/index';
import { markedRender } from '@/utils/highlight';
// import { audioInstance, initializeAudio } from '@/utils/audio';
import 'v3-infinite-loading/lib/style.css';
import { useRouterPush } from '@/hooks/common/router';

const { routerBack } = useRouterPush();

// const playAudio = async (content: string) => {
//   await initializeAudio(content);

//   if (audioInstance.value) {
//     audioInstance.value();
//   } else {
//     console.error('音频未加载或播放方法不可用');
//   }
// };

const { list, customUploadFile, handleRemove } = useUpload();

const { loading, startLoading, endLoading } = useLoading();

const fileStore = useFileStore();
// fileStore.clearUploadedFile();

interface Data {
  app_id: string;
  conversation_id: string;
  file: File;
  query: string;
}

const route = useRoute();
console.log('🚀 ~ route:', route.query);
const hasQuery = computed(() => Object.keys(route.query).length > 0);

// const drawActice = ref(false);

// function handleDraw() {
//   drawActice.value = true;
// }

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
      if (!scrollBar.value) return;
      scrollBar.value?.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
    }
    isComplete.value = false;
    renderMath();
  });
}

const cid = ref<string>('');
// 文本生成
const handleGenerate = async (data: any, forShow: any) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key as keyof Data]);
    });
    const { data: textData, error } = await ocraiSolve(formData);
    if (!error) {
      await nextTick();

      cid.value = textData.sessionId;
      const index = chatList.length - 1;
      chatList[index] = { ...forShow, ...textData };
      handleScroll();
    }
    endLoading();
    handleRestForm();
  } catch (error) {
    console.log('🚀 ~ handleGenerate ~ error:', error);
    window?.$message?.error('生成失败,请稍后再试');
  }
};
// 从文本首页生成
const handleGenerateFromHome = async (temp: any) => {
  isComplete.value = false;
  startLoading();
  const forShow = {
    // coin: undefined,
    // isSending: true,
    // conversation_id: cid.value || '',
    // query: route.query.query,
    // content: ` `,
    // create_time: undefined,
    // offspring_id: undefined,
    // file_ids: route.query.file,
    // user_id: undefined,
    isSending: true,
    imgUrl: route.query.file,
    answer: `生成中...`,
    question: ''
  };
  chatList.push(forShow);
  handleScroll();

  const { app_id } = temp;
  // const data: Data = {
  //   app_id,
  //   conversation_id: cid.value || '',
  //   file: fileStore.uploadedFile as File,
  //   query
  // };
  console.log('🚀 ~ handleGenerateFromHome ~ data.list:', fileStore);

  const data = {
    appid: app_id,
    image: fileStore.uploadedFile
  };

  handleGenerate(data, forShow);
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
    coin: undefined,
    isSending: true,
    conversation_id: undefined,
    query: prompt.value,
    content: ' ',
    create_time: undefined,
    offspring_id: undefined,
    file_ids: list.value[0],
    user_id: undefined
  };
  chatList.push(forShow);
  handleScroll();

  const data: Data = {
    app_id: route.query.app_id as string,
    conversation_id: cid.value || '',
    file: fileStore.uploadedFile as File,
    query: prompt.value
  };

  handleGenerate(data, forShow);
};

const handleTypeComplete = async (item: any) => {
  item.isSending = false;
};
const temp: any = reactive({});
if (hasQuery) {
  Object.assign(temp, route.query);
  handleGenerateFromHome(temp);
}

// const textHistory = ref<any>([]);
// const query = reactive({
//   page: 1,
//   pageSize: 10
// });
// 绘图列表
// const stateInstance = ref<any>(null);

// const hanldeLoad = async (state: any) => {
//   stateInstance.value = state;
//   const { data, error } = await getConversationList(query);
//   if (!error) {
//     textHistory.value.push(...data.data);
//     if (data.data.length < query.pageSize) state.complete();
//     else {
//       state.loaded();
//     }
//     query.page += 1;
//   } else {
//     state.error();
//   }
// };

onMounted(() => {});
</script>

<template>
  <div class="bg box-border size-full flex flex-col of-hidden pb-40px pt-30px">
    <!-- title -->
    <div v-loading="true" class="mb-20px box-border flex flex-col items-center px-50px xl:pl-560px xl:pr-214px">
      <div class="w-full flex items-center justify-between overflow-visible">
        <div class="animate__animated animate__fadeInLeft mr-127px flex-1 text-24px text-#3D3D3D">
          {{ route.query.title }}
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
        </div>
      </div>
    </div>
    <!-- 对话 -->
    <NScrollbar
      ref="scrollBar"
      class="animate__animated content animate__fadeIn mb-16px box-border flex flex-col flex-1 px-50px xl:px-560px"
    >
      <template v-if="true">
        <div v-for="item in chatList" :key="item.createTime" class="each mb-16px flex flex-col">
          <!-- ask -->
          <div
            class="mb-16px box-border w-[fit-content] self-end rd-bl-12px rd-br-2px rd-lt-12px rd-rt-12px p-16px text-14px text-white font-500"
            :style="{ background: ' linear-gradient(180deg, #2B2D24 0%, #0B0C09 100%), #FFFFFF' }"
          >
            <!-- {{ item.question }} -->
            <div class="flex items-center">
              <NImage object-fit="cover" class="w-full" :src="item.imgUrl" />
              <!--
 <template v-if="item.file_ids && item.file_ids.indexOf('jpg' || 'png') > 0">
                <NImage object-fit="cover" class="w-full" :src="item.file_ids" />
              </template>
              <template
                v-else-if="item.file_ids && item.file_ids.indexOf('txt' || 'doc' || 'pdf' || 'xls' || 'xlsx') > 0"
              >
                <icon-ph:file class="mr-5px h-16px w-16px" />
                {{ item.file_ids }}
              </template>
-->
            </div>
          </div>
          <!-- answer -->
          <div
            class="box-border w-full flex flex-col rd-bl-12px rd-br-12px rd-lt-2px rd-rt-12px bg-white p-16px text-14px font-500"
          >
            <template v-if="item.isSending">
              <VueTyped
                v-if="item.answer"
                :strings="[markedRender(item.answer)]"
                @complete="isComplete = true"
                @reset="handleTypeComplete(item)"
              />
            </template>

            <div v-else class="span" v-html="markedRender(item.answer)"></div>
            <div v-if="item.answer" class="tool self-end justify-items-end">
              <NButton
                class="box-border rd-14px text-18px text-#181818 font-600 !h-54px !w-54px !border-none !bg-white"
                size="large"
                @click="handleCopy(item.answer)"
              >
                <icon-local-copy-write class="scale-100" />
              </NButton>
              <!--
 <NButton
                class="box-border rd-14px text-18px text-#181818 font-600 !h-54px !w-54px !border-none !bg-white"
                size="large"
                @click="playAudio(item.content)"
              >
                <icon-local-playaudio class="scale-100" />
              </NButton>
-->
            </div>
            <div v-if="false" class="mb-16px border-b border-b-#E6E6E6"></div>
            <div v-if="false" class="text-12px font-400">
              <div class="mb-5px">你可能还想问</div>
              <div class="mb-5px cursor-pointer">·以秋天为主题，写一篇描绘秋天景色的文章。</div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col">
          <div class="box-border w-full flex flex-col rd-14px bg-#ffffff px-16px pb-20px pt-24px">
            <div class="mb-8px ml-10px flex items-center">
              <icon-local-hi class="scale-200" />
              <span class="mi ml-15px text-18px font-600">晚上好！</span>
            </div>
            <div class="text-16px line-height-24px">
              要写的文档太多？你的全能写作助手，课程报告、英文写作、工作文档、创意文案…为你搞定思路、大纲、全文和润色，产出效率翻番
            </div>
          </div>

          <div class="mb-16px mt-32px text-16px">不知道怎么开始，可以试试下面几个例子：</div>

          <div class="box-border w-600px flex flex-col pl-5px">
            <NButton class="btn1 mb-12px h-53px w-full rd-bl-12px rd-br-12px rd-rt-12px bg-white">
              <div class="w-full flex items-center justify-between">
                <span>以生命的意义在于人与人之间的相互照亮为话题，写一篇600字的抒情散文</span>
                <div class="h-20px w-20px flex items-center justify-center rd-50% bg-#F4F5F7">
                  <icon-local-write-arrow-right />
                </div>
              </div>
            </NButton>
            <NButton class="btn1 mb-12px h-53px w-full rd-bl-12px rd-br-12px rd-rt-12px bg-white">
              <div class="w-full flex items-center justify-between">
                <span>以生命的意义在于人与人之间的相互照亮为话题，写一篇600字的抒情散文</span>
                <div class="h-20px w-20px flex items-center justify-center rd-50% bg-#F4F5F7">
                  <icon-local-write-arrow-right />
                </div>
              </div>
            </NButton>
          </div>
        </div>
      </template>
    </NScrollbar>
    <!-- 输入框 -->
    <div class="animate__animated animate__fadeIn flex items-center justify-center px-50px xl:px-560px">
      <NButton
        round
        type="primary"
        class="global-btn !w-full !flex !items-center !justify-center !text-18px !font-600"
        @click="routerBack"
      >
        返回
      </NButton>
    </div>
    <div v-if="false" class="animate__animated animate__fadeIn px-50px xl:px-560px">
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
.bg {
  width: 100%;

  background: url('https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/image/zntbg.png') no-repeat;
  background-size: cover;
}
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

:deep(.global-btn .n-button__content) {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
