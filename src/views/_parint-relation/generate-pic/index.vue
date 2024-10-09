<script setup lang="ts">
import { useLoading } from '@sa/hooks';
import type { UploadInst } from 'naive-ui';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';
import dayjs from 'dayjs';
import { useNaiveForm } from '@/hooks/common/form';
import { useAuthStore } from '@/store/modules/auth';
import { deleteDrawItem, drawConfig, drawTaskSearch, fetchDrawInfo, fetchDrawList, startDraw } from '@/service/api';
import { useUpload } from '@/hooks/common/upload';

// const route = useRoute();
// const kind = computed(() => route.query.kind);

const { loading, startLoading, endLoading } = useLoading();

const { list, customUpload, handleRemove } = useUpload();

const authStore = useAuthStore();

const rules = {
  prompt: { required: true, message: '请输入正向描述词', trigger: 'blur' }
};

const { formRef, validate } = useNaiveForm();
const model: any = reactive({
  prompt: undefined,
  style: undefined,
  negative_prompt: undefined,
  ref_img: list.value,
  size: undefined
});

// Lora
const loraList = reactive<any>([]);

const selectedLora = ref(0);
const hanldeSelectLora = (val: any, name: any) => {
  model.style = name;
  selectedLora.value = val;
};

// 图片比例
const SIZE_LIST_MODEL = [
  {
    label: '1:1',
    width: 40,
    height: 40,
    size: '1024*1024'
  },
  {
    label: '16:9',
    width: 40,
    height: 24,
    size: '1280*720'
  },
  {
    label: '9:16',
    width: 24,
    height: 34,
    size: '720*1280'
  },
  {
    label: '3:2',
    width: 42,
    height: 26
  },
  {
    label: '4:3',
    width: 40,
    height: 32
  },
  {
    label: '3:4',
    width: 33,
    height: 34
  }
];

const SIZE_LIST = reactive<any>([]);

const sizeIndex = ref(0);

const handleSizeChange = (index: any, size: any) => {
  model.size = size;
  sizeIndex.value = index;
};

// 模型
const MODEL_LIST = reactive([
  {
    value: 'default',
    label: '默认'
  },
  {
    value: 'v6',
    label: 'v6'
  },
  {
    value: 'v5.2',
    label: 'v5.2'
  },
  {
    value: 'niji5模型',
    label: 'niji5模型'
  }
]);

// 获取配置

(async () => {
  const { data, error } = await drawConfig();
  if (!error) {
    Object.assign(loraList, data.styles);
    data.sizes.forEach((item: any) => {
      SIZE_LIST_MODEL.forEach(ele => {
        if (item.size === ele.size) {
          Object.assign(item, ele);
        }
      });
    });
    Object.assign(SIZE_LIST, data.sizes);
  }
})();

const drawHistory = reactive<any[]>([]);

const query = reactive({
  page: 1,
  pageSize: 10
});
// 绘图列表
const stateInstance = ref<any>(null);
const hanldeLoad = async (state: any) => {
  stateInstance.value = state;
  const { data, error } = await fetchDrawList(query);
  if (!error) {
    drawHistory.push(...data.data);
    if (data.data.length < query.pageSize) state.complete();
    else {
      state.loaded();
    }
    query.page += 1;
  } else {
    state.error();
  }
};
const handleRestList = () => {
  query.page = 1;
  drawHistory.length = 0;
  hanldeLoad(stateInstance.value);
};
const handlePositiveClick = async (record_id: number) => {
  const { error } = await deleteDrawItem({ record_id });
  if (!error) {
    window?.$message?.success('删除成功');
    const index = drawHistory.findIndex(item => item.id === record_id);
    if (index !== -1) {
      drawHistory.splice(index, 1);
    }
  }
};

const uploadRef = ref<UploadInst | null>(null);
const handleRest = () => {
  model.prompt = '';
  model.style = '<auto>';
  selectedLora.value = 0;
  model.negative_prompt = '';
  model.ref_img = [];
  uploadRef.value?.clear();
  sizeIndex.value = 0;
  model.size = '1024*1024';
};

async function handleSubmit() {
  await validate();

  startLoading();

  const uploadModel = { ...model, ref_img: model?.ref_img[0] ?? '' };
  const { data, error } = await startDraw(uploadModel);
  if (!error) {
    const { start, stop } = useTimeoutFn(async () => {
      const { data: taskSearch, error: err } = await drawTaskSearch(data.task_id);
      start();
      if (!err) {
        if (taskSearch === 'SUCCEEDED') {
          stop();
          endLoading();
          const { data: taskInfo, error: infoErr } = await fetchDrawInfo(data.task_id);
          if (!infoErr) {
            drawHistory.unshift(taskInfo);
            window?.$message?.success('生成成功!');
          }
        }
        if (taskSearch === null) {
          handleRestList();
          stop();
          endLoading();
        }
      } else {
        handleRestList();
        stop();
        endLoading();
      }
    }, 1000);
  }
}
</script>

<template>
  <div class="box-border size-full flex items-center of-hidden p-24px">
    <div
      class="animate__animated left animate__fadeInLeft mr-16px box-border h-full w-522px flex flex-col rd-14px bg-#ffffff px-24px pb-20px pt-28px"
    >
      <NScrollbar class="box-border w-full flex-1 pr-15px">
        <NSpin :show="loading" class="box-border w-full flex-1">
          <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
            <!-- 提示词 -->
            <div class="w-full">
              <!-- title   -->
              <div class="flex items-center">
                <icon-local-require />
                <span class="mx-5px text-14px">正向画面描述</span>
                <icon-local-tooltip />
              </div>
              <!-- 介绍 -->
              <div class="my12px text-12px text-#9E9E9E">
                功能介绍：基于 StableDiffusion 2.0模型进行绘画创作能根据文本描述生成逼真图像
              </div>
              <!-- 快速提示词 -->
              <!--
 <div class="grid grid-cols-6 gap-10px">
              <NButton v-for="item in 12" :key="item">人物</NButton>
            </div>
-->
              <!-- 提示词 -->
              <NFormItem class="mt16px" path="prompt">
                <NInput
                  v-model:value="model.prompt"
                  type="textarea"
                  class="w-full bg-#F7F7F7"
                  :autosize="{
                    minRows: 2,
                    maxRows: 2
                  }"
                  placeholder="请输入正向描述词"
                />
              </NFormItem>
            </div>
            <!-- Lora -->
            <div class="w-full border-b border-b-[#F4F4F4]">
              <!-- title   -->
              <div class="flex items-center">
                <icon-local-require />
                <span class="mx-5px text-14px">LORA风格选择</span>
                <icon-local-tooltip />
              </div>
              <!-- 风格 -->
              <NFormItem class="mt16px" path="style">
                <div class="grid grid-cols-5 w-full gap-12px">
                  <div
                    v-for="(item, index) in loraList"
                    :key="item"
                    class="lora-item relative z-10 box-border h-72px w-72px cursor-pointer border-2 border-[transparent] rd-14px border-solid bg-transparent"
                    :class="`${index === selectedLora ? 'active-lora' : ''}`"
                    @click="hanldeSelectLora(index, item.name)"
                  >
                    <img
                      class="absolute left-0 top-0 z--1 h-[100%] w-[100%] rounded-14px"
                      mode="aspectFill"
                      :src="item.cover"
                    />
                    <div
                      class="absolute bottom-0px left-[50%] z100 w-full flex translate-x-[-50%] items-center justify-center text-12px text-[#ffffff] font-600"
                    >
                      {{ item.desc }}
                    </div>
                    <div
                      :class="`${index === selectedLora ? 'active-lora-bg' : ''}`"
                      class="lora-bg absolute left-0 top-0 size-full rounded-[14px]"
                    ></div>
                  </div>
                </div>
              </NFormItem>
            </div>
            <!-- 负向提示词 -->
            <div class="mt-16px w-full border-b border-b-[#F4F4F4]">
              <!-- title   -->
              <div class="flex items-center">
                <icon-local-require />
                <span class="mx-5px text-14px">负向画面描述</span>
                <icon-local-tooltip />
              </div>
              <!-- 提示词 -->
              <NFormItem class="mt16px" path="negative_prompt">
                <NInput
                  v-model:value="model.negative_prompt"
                  type="textarea"
                  class="w-full bg-#F7F7F7"
                  :autosize="{
                    minRows: 1,
                    maxRows: 1
                  }"
                  placeholder="请输入负向描述词"
                />
              </NFormItem>
            </div>
            <!-- 参考图片 -->
            <div class="mt-16px w-full border-b border-b-[#F4F4F4]">
              <!-- title   -->
              <div class="flex items-center">
                <icon-local-require />
                <span class="mx-5px text-14px">参考图片</span>
                <icon-local-tooltip />
              </div>
              <!-- 参考图片 -->
              <NFormItem class="mt16px" path="ref_img">
                <NUpload
                  ref="uploadRef"
                  action="#"
                  :default-file-list="model.ref_img"
                  list-type="image-card"
                  :max="1"
                  :on-remove="handleRemove"
                  :custom-request="customUpload"
                />
              </NFormItem>
            </div>
            <!-- 尺寸 -->
            <div class="mt-16px w-full border-b border-b-[#F4F4F4]">
              <!-- title   -->
              <div class="flex items-center">
                <icon-local-require />
                <span class="mx-5px text-14px">请选择图片尺寸</span>
                <icon-local-tooltip />
              </div>
              <!-- 图片尺寸 -->
              <NFormItem class="mt16px" path="size">
                <div class="grid grid-cols-6 gap-x-15px">
                  <div
                    v-for="(item, index) in SIZE_LIST"
                    :key="item.label"
                    class="box-border h80px w63px flex flex-col cursor-pointer items-center justify-between border border-[#BDEE7E] rd-8px bg-#ffffff p-10px"
                    @click="handleSizeChange(index, item.size)"
                  >
                    <div
                      :style="{
                        width: item.width + 'px',
                        height: item.height + 'px',
                        backgroundColor: sizeIndex === index ? '#C3F302' : ''
                      }"
                      class="rd-6px bg-#DDDDDD transition-all transition-duration-300 ease-in"
                    ></div>
                    <div>{{ item.label }}</div>
                  </div>
                </div>
              </NFormItem>
            </div>
            <!-- 模型选择 -->
            <div v-if="false" class="mt-16px w-full border-b border-b-[#F4F4F4]">
              <!-- title   -->
              <div class="flex items-center">
                <icon-local-require />
                <span class="mx-5px text-14px">模型选择</span>
                <icon-local-tooltip />
              </div>
              <!-- 模型选择 -->
              <NFormItem class="mt16px" path="prompt">
                <div class="w-full">
                  <NRadioGroup v-model:value="model.value2" name="radiobuttongroup1">
                    <NRadioButton
                      v-for="song in MODEL_LIST"
                      :key="song.value"
                      :value="song.value"
                      :label="song.label"
                    />
                  </NRadioGroup>
                </div>
              </NFormItem>
            </div>
            <!-- 设置提示词相关性 -->
            <div v-if="false" class="mt-16px w-full border-b border-b-[#F4F4F4]">
              <!-- title   -->
              <div class="flex items-center">
                <icon-local-require />
                <span class="mx-5px text-14px">请设置提示词相关性</span>
                <icon-local-tooltip />
              </div>
              <!-- 提示词相关性 -->
              <NFormItem class="mt16px" path="prompt">
                <div class="w-full">
                  <NSlider v-model:value="model.value2" :step="10" />
                  <span class="mi text-12px text-#7A808D">默认值100</span>
                </div>
              </NFormItem>
            </div>
            <!-- 图片质量 --q -->
            <div v-if="false" class="mt-16px w-full border-b border-b-[#F4F4F4]">
              <!-- title   -->
              <div class="flex items-center">
                <icon-local-require />
                <span class="mx-5px text-14px">图片质量 --q</span>
                <icon-local-tooltip />
              </div>
              <!-- 提示词相关性 -->
              <NFormItem class="mt16px" path="prompt">
                <div class="w-full">
                  <NSlider v-model:value="model.value2" :step="10" />
                  <span class="mi text-12px text-#7A808D">默认值100</span>
                </div>
              </NFormItem>
            </div>
          </NForm>
        </NSpin>
      </NScrollbar>

      <div class="mt-20px flex items-center justify-between">
        <div class="flex items-center">
          <icon-local-point />
          <span class="ml3px text-16px font-500">890点</span>
        </div>
        <div class="flex items-center">
          <NButton
            class="btn btn1 mr-16px h-50px rd-8px bg-#F7F7F7 text-#181818 !w-106px !text-16px !font-600"
            @click="handleRest"
          >
            重置参数
          </NButton>
          <NButton
            :loading="loading"
            type="primary"
            class="btn global-btn h-50px !w-223px !text-16px !font-600"
            round
            block
            @click="handleSubmit"
          >
            <div class="text-#E5FF7D">
              {{ loading ? '生成中' : '立即生成' }}
              <span class="text-12px text-#E5FF7D">（消耗3个点）</span>
            </div>
          </NButton>
        </div>
      </div>
    </div>
    <NScrollbar :class="`${drawHistory.length === 0 ? 'noContent' : ''}`" class="box-border flex flex-1 pr-20px">
      <div
        v-for="item in drawHistory"
        :key="item.id"
        class="animate__animated animate__fadeInRight item mb-16px box-border w-full flex flex-col rd-14px bg-#ffffff px-16px py-20px"
      >
        <!-- 头像 -->
        <div class="w-full flex items-start justify-between">
          <div class="flex items-center">
            <img :src="authStore.userInfo.avatar" class="h-24px w-24px rd-50% bg-red" alt="" />
            <span class="mi ml-8px text-14px text-#7A808D">{{ authStore.userInfo.name }}</span>
          </div>
          <NPopconfirm @positive-click="handlePositiveClick(item.id)">
            <template #trigger>
              <icon-local-close class="cursor-pointer" />
            </template>
            确定要删除吗?
          </NPopconfirm>
        </div>
        <!-- 提示词 -->
        <div class="mi my16px text-14px text-[#3D3D3D] font-500 line-height-24px">
          {{ item.prompt }}
        </div>
        <!-- 图片 -->
        <div class="h-340px w-340px">
          <div
            v-if="item.content.length === 0"
            class="size-full flex flex-col items-center justify-center rd-6px bg-#F7F7F7"
          >
            <icon-lets-icons:sad-light class="h-100px w-100px" />
            <span>图片生成失败</span>
          </div>
          <template v-else>
            <NSpin v-for="pic in item.content" :key="pic.url" :show="!pic.url" class="size-full">
              <NImage
                :src="pic.url"
                lazy
                show-toolbar-tooltip
                object-fit="cover"
                class="h-full w-full rd-4px !h-full"
              />
            </NSpin>
          </template>
        </div>
        <!-- 绘图时间 -->
        <div class="mi my16px text-14px text-[#3D3D3D] font-500 line-height-24px">
          绘图时间: {{ dayjs.unix(item.create_time).format('YYYY-MM-DD') }}
        </div>
        <!-- 拓展 -->
        <div v-if="false && item.content.length > 0" class="mt-16px w-full">
          <div class="mb-8px w-full flex items-center">
            <div class="text-14px">调整:</div>
            <icon-local-tooltip class="mx-10px" />
            <div class="grid grid-cols-3 gap-x-8px">
              <NButton class="btn btn1 mi h-40px rd-8px bg-#F7F7F7 !w-108px !text-14px !text-#181818 !font-500">
                <div class="flex items-center">
                  <icon-local-adjust />
                  <span class="ml-4px">微调（强）</span>
                </div>
              </NButton>
              <NButton class="btn btn1 mi h-40px rd-8px bg-#F7F7F7 !w-108px !text-14px !text-#181818 !font-500">
                <div class="flex items-center">
                  <icon-local-adjust />
                  <span class="ml-4px">微调（弱）</span>
                </div>
              </NButton>
              <NButton class="btn btn1 mi h-40px rd-8px bg-#F7F7F7 !w-108px !text-14px !text-#181818 !font-500">
                <div class="flex items-center">
                  <icon-local-adjust />
                  <span class="ml-4px">局部重绘</span>
                </div>
              </NButton>
            </div>
          </div>
          <div class="w-full flex items-center">
            <div class="text-14px">调整:</div>
            <icon-local-tooltip class="mx-10px" />
            <div class="grid grid-cols-3 gap-x-8px">
              <NButton class="btn btn1 mi h-40px rd-8px bg-#F7F7F7 !w-108px !text-14px !text-#181818 !font-500">
                <div class="flex items-center">
                  <icon-local-scale />
                  <span class="ml-4px">放大 2.5x</span>
                </div>
              </NButton>
              <NButton class="btn btn1 mi h-40px rd-8px bg-#F7F7F7 !w-108px !text-14px !text-#181818 !font-500">
                <div class="flex items-center">
                  <icon-local-scale />
                  <span class="ml-4px">放大 2x</span>
                </div>
              </NButton>
              <NButton class="btn btn1 mi h-40px rd-8px bg-#F7F7F7 !w-108px !text-14px !text-#181818 !font-500">
                <div class="flex items-center">
                  <icon-local-scale />
                  <span class="ml-4px">放大 1.5x</span>
                </div>
              </NButton>
            </div>
          </div>
        </div>
      </div>
      <InfiniteLoading
        class="mi animate__animated animate__fadeInRight flex items-center justify-center text-#181818"
        @infinite="hanldeLoad"
      >
        <template #complete>
          <span class="text-16px text-#9E9E9E font-500">
            {{ drawHistory.length === 0 ? '您还没有作品，快去创作吧' : '没有更多啦!' }}
          </span>
        </template>
        <template #error="{ retry }">
          <div class="flex flex-col items-center">
            <span class="mb-5px text-16px text-#9E9E9E font-500">啊哦,加载绘图记录出了点问题~</span>
            <NButton @click="retry">重试</NButton>
          </div>
        </template>
      </InfiniteLoading>
    </NScrollbar>
  </div>
</template>

<style scoped>
:deep(.n-button) {
  --n-border: 1px solid #cdcdcd !important;
}
:deep(.n-input__textarea-el) {
  color: #9e9e9e;
  font-family: Mi;
}
.lora-item {
  transition: border-color 0.3s ease-in;
}
.active-lora {
  border-color: #cdfd49;
}
.lora-bg {
  background-image: linear-gradient(177deg, rgba(0, 0, 0, 0) 55%, #beeb08 97%);
  opacity: 0;
  transition: opacity 0.3s ease-in;
}
.active-lora-bg {
  opacity: 1;
}
:deep(.n-upload-dragger) {
  border: none;
  background: #f7f7f7;
}
:deep(.n-radio-group) {
  --n-button-border-color: #e2e0e3 !important;
}
:deep(.n-radio-group .n-radio-button.n-radio-button--checked) {
  background: #181818 !important;
  color: #ffffff !important;
}
:deep(.btn) {
  --n-border: none !important;
  --n-border-focus: none !important;
  --n-border-hover: none !important;
}
:deep(.btn1:not(.btn1--disabled):hover) {
  background: #f7f7f7 !important;
}
:deep(.btn1:not(.btn1--disabled):focus) {
  background: #f7f7f7 !important;
}
:deep(.n-spin-content) {
  width: 100%;
  height: 100%;
}

:deep(.noContent .n-scrollbar-content) {
  width: 100%;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
