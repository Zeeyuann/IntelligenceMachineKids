<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';

const addClassFlag = ref(true);
setTimeout(() => {
  addClassFlag.value = false;
}, 1000);

const selectedLora = ref(0);
const hanldeSelectLora = (val: any) => {
  selectedLora.value = val;
};

// 图片上传

// 图片比例
const SIZE_LIST = [
  {
    label: '1:1',
    width: 40,
    height: 40
  },
  {
    label: '16:9',
    width: 40,
    height: 24
  },
  {
    label: '9:16',
    width: 24,
    height: 34
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

const sizeIndex = ref(0);

const handleSizeChange = (index: any) => {
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

const rules = {
  prompt: { required: true, message: '请输入正向描述词' },
  value1: { required: true, message: '请选择班级' },
  value2: { required: true, message: '请选科目' },
  value3: { required: true, message: '请选择版本' },
  value4: { required: true, message: '请选择难度' }
};

const { formRef, validate } = useNaiveForm();
const model: any = reactive({
  prompt: undefined,
  value1: undefined,
  value2: undefined,
  value3: undefined,
  value4: undefined,
  pic_list: []
});

async function handleSubmit() {
  console.log(await validate());

  await validate();

  // request
  window.$message?.success('1');
}

// 图片加载

// animate__animated animate__fadeInRight
// animate__animated animate__fadeInLeft
</script>

<template>
  <div class="box-border size-full flex items-center of-hidden p-24px">
    <div
      class="left animate__animated animate__fadeInLeft mr-16px box-border h-full w-522px flex flex-col rd-14px bg-#ffffff px-24px pb-20px pt-28px"
    >
      <NScrollbar class="box-border w-full flex-1 pr-15px">
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
            <div class="grid grid-cols-6 gap-10px">
              <NButton v-for="item in 12" :key="item">人物</NButton>
            </div>
            <!-- 提示词 -->
            <NFormItem class="my16px" path="prompt">
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
            <NFormItem class="mt16px" path="value1">
              <div class="grid grid-cols-5 w-full gap-12px">
                <div
                  v-for="(item, index) in 10"
                  :key="item"
                  class="lora-item relative z-10 box-border h-72px w-72px cursor-pointer border-2 border-[transparent] rd-14px border-solid bg-transparent"
                  :class="`${index === selectedLora ? 'active-lora' : ''}`"
                  @click="hanldeSelectLora(index)"
                >
                  <img
                    class="absolute left-0 top-0 z--1 h-[100%] w-[100%] rounded-14px"
                    mode="aspectFill"
                    src="https://img2.baidu.com/it/u=1544882228,2394903552&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
                  />
                  <div class="absolute bottom-8px left-[50%] z100 translate-x-[-50%] text-12px text-[#ffffff] font-600">
                    厚涂
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
            <NFormItem class="mt16px" path="prompt">
              <NInput
                v-model:value="model.prompt"
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
            <NFormItem class="mt16px" path="prompt">
              <NUpload
                action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                :default-file-list="model.pic_list"
                list-type="image-card"
                :max="1"
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
            <NFormItem class="mt16px" path="prompt">
              <div class="grid grid-cols-6 gap-x-15px">
                <div
                  v-for="(item, index) in SIZE_LIST"
                  :key="item.label"
                  class="box-border h80px w63px flex flex-col cursor-pointer items-center justify-between border border-[#BDEE7E] rd-8px bg-#ffffff p-10px"
                  @click="handleSizeChange(index)"
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
          <div class="mt-16px w-full border-b border-b-[#F4F4F4]">
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
                  <NRadioButton v-for="song in MODEL_LIST" :key="song.value" :value="song.value" :label="song.label" />
                </NRadioGroup>
              </div>
            </NFormItem>
          </div>
          <!-- 设置提示词相关性 -->
          <div class="mt-16px w-full border-b border-b-[#F4F4F4]">
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
          <div class="mt-16px w-full border-b border-b-[#F4F4F4]">
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
      </NScrollbar>
      <div class="mt-20px flex items-center justify-between">
        <div class="flex items-center">
          <icon-local-point />
          <span class="ml3px text-16px font-500">890点</span>
        </div>
        <div class="flex items-center">
          <NButton class="btn btn1 mr-16px h-50px rd-8px bg-#F7F7F7 text-#181818 !w-106px !text-16px !font-600">
            重置参数
          </NButton>
          <NButton
            type="primary"
            class="btn global-btn h-50px !w-223px !text-16px !font-600"
            round
            block
            @click="handleSubmit"
          >
            <div class="text-#E5FF7D">
              立即生成
              <span class="text-12px text-#E5FF7D">（消耗3个点）</span>
            </div>
          </NButton>
        </div>
      </div>
    </div>
    <NScrollbar v-if="true" class="animate__animated animate__fadeInRight box-border flex-1 pr-20px">
      <div
        class="item mb-16px box-border h-584px w-full flex flex-col rd-14px bg-#ffffff px-16px py-20px"
        :class="addClassFlag ? 'animate__animated animate__fadeInRight' : ''"
      >
        <!-- 头像 -->
        <div class="flex items-center">
          <img src="" class="h-24px w-24px rd-50% bg-red" alt="" />
          <span class="mi ml-8px text-14px text-#7A808D">语文老师</span>
        </div>
        <!-- 提示词 -->
        <div class="mi my16px text-14px text-[#3D3D3D] font-500 line-height-24px">
          一个女孩，紫色蝴蝶拟人，solo，闪闪发光的画面，闪亮的黑色长发，五官高光，化妆，红唇，像银河般亮晶晶的眼睛，蝴蝶散发着蓝色的荧光，少女就像蝴蝶仙子一般，紫色打光，最高画质，最佳杰作，最高画质，高分辨率
        </div>
        <!-- 图片 -->
        <div class="h-340px w-340px">
          <NSpin class="size-full">
            <NImage
              src="https://inews.gtimg.com/om_bt/OE8piEBa-tbqn-wNvWZl8coi4AlzoUD43upEkoAnIkYL8AA/641"
              lazy
              show-toolbar-tooltip
              object-fit="cover"
              class="h-full w-full rd-4px bg-red !h-full"
              alt=""
            />
            <template #description>图片生成中</template>
          </NSpin>
        </div>
        <!-- 拓展 -->
        <div class="mt-16px w-full">
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
    </NScrollbar>
    <div
      v-else
      class="mi animate__animated animate__fadeInRight flex flex-1 items-center justify-center text-16px text-#9E9E9E font-500"
    >
      您还没有作品，快去创作吧
    </div>
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
  background-image: linear-gradient(178deg, rgba(0, 0, 0, 0) 80%, #beeb08 98%);
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
</style>
