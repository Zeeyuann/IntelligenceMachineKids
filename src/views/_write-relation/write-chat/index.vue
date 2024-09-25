<script lang="ts" setup>
import TypeIt from 'typeit';
import type { Options } from 'typeit';
import type { El } from 'typeit/dist/types';
import type { UploadFileInfo } from 'naive-ui';

const route = useRoute();
console.log('🚀 ~ route:', route.query.prompt);

const textRef = shallowRef<El>();

function init() {
  if (!textRef.value) return;

  const options: Options = {
    strings:
      'SoybeanAdmin是一个清新优雅、高颜值且功能强大的后台管理模板SoybeanAdmin是一个清新优雅、高颜值且功能强大的后台管理模板SoybeanAdmin是一个清新优雅、高颜值且功能强大的后台管理模板',
    lifeLike: true,
    speed: 60,
    cursor: false,
    afterComplete: () => {
      console.log(1);
    }
  };

  const initTypeIt = new TypeIt(textRef.value, options);

  initTypeIt.go();
}

const { copy, isSupported } = useClipboard();

async function handleCopy() {
  if (!isSupported) {
    window.$message?.error('您的浏览器不支持Clipboard API');
    return;
  }

  await copy('111');
  window.$message?.success(`复制成功：11`);
}

const prompt = ref('');

const fileList = ref<UploadFileInfo[]>([]);

const hanldInput = () => {
  if (!prompt.value.trim()) {
    window?.$message?.info('请输入内容');
  }
};
onMounted(() => {
  init();
});
</script>

<template>
  <div class="box-border size-full flex flex-col of-hidden pb-40px pt-30px">
    <!-- title -->
    <div class="mb-20px box-border flex flex-col items-center pl-560px pr-214px">
      <div class="w-full flex items-center justify-between overflow-visible">
        <div class="mr-127px flex-1 text-24px text-#3D3D3D">新会话</div>
        <div class="">
          <NButton
            class="box-border rd-14px text-18px text-#181818 font-600 !h-54px !w-153px !border-none !bg-white"
            size="large"
          >
            <icon-local-green-plus />
            <span class="ml8px">新建对话</span>
          </NButton>
          <NButton
            class="ml-30px box-border rd-14px text-18px text-#181818 font-600 !h-54px !w-54px !border-none !bg-white"
            size="large"
          >
            <icon-local-clock class="scale-100" />
          </NButton>
        </div>
      </div>
    </div>
    <!-- 对话 -->
    <NScrollbar class="content mb-16px box-border flex flex-col flex-1 px-560px">
      <div v-for="item in 3" :key="item" class="each mb-16px flex flex-col">
        <!-- ask -->
        <div
          class="mb-16px box-border w-full rd-bl-12px rd-br-2px rd-lt-12px rd-rt-12px p-16px text-14px text-white font-500"
          :style="{ background: ' linear-gradient(180deg, #2B2D24 0%, #0B0C09 100%), #FFFFFF' }"
        >
          你是一位经验丰富的语文老师，拥有激发学生写作的热情，你善于运用幽默风趣的口吻写文章，请根据秋天为主题，写一篇吧！
        </div>
        <!-- answer -->
        <div
          class="box-border w-full flex flex-col rd-bl-12px rd-br-12px rd-lt-2px rd-rt-12px bg-white p-16px text-14px font-500"
        >
          <div class="span">
            同学们，当夏日的热浪渐渐退去，凉爽的秋风吹拂着我们的脸颊，你们知道这意味着什么吗？没错，秋天已经悄悄地来到了我们身边！今天，就让我带着大家一起走进这个五彩斑斓的季节，感受它的魅力，并且用我们的笔，描绘出秋天的美丽画卷。
            秋天，是一个收获的季节。想象一下，金黄色的稻田，在阳光的照耀下闪闪发光，就像是大地铺上了一层厚厚的金毯。农民伯伯们满脸喜悦地收割着庄稼，他们的辛勤劳动终于换来了满满的收获。而在我们的校园里，秋天也带来了满满的知识果实，我们每天都在知识的海洋里遨游，不断地收获着智慧和成长。
            秋天，是一个多彩的季节。你看，那火红的枫叶，在枝头翩翩起舞，仿佛是在向我们展示它们最美的姿态。而那些黄澄澄的梨子，绿油油的猕猴桃，紫莹莹的葡萄，都在告诉我们，秋天是一个丰收的宝库。我们可以用这些丰富的色彩，来装点我们的文章，让它们像秋天一样绚丽多姿。
            秋天，更是一个充满诗意的季节。每当夜幕降临，我们抬头仰望星空，那一轮明月高悬天际，洒下柔和的银辉。我们可以在这宁静的夜晚，感受秋天的温柔，思考生活的意义。正如古人所说：“明月松间照，清泉石上流。”秋天的美景，总能激发我们内心深处的诗意和灵感。
            那么，同学们，让我们拿起手中的笔，用我们的文字去描绘这个美丽的季节吧！无论是秋天的丰收、多彩还是诗意，都值得我们去细细品味和书写。记住，写作就像秋天一样，需要我们用心去感受，用爱去浇灌，最终才能收获满满的果实和喜悦。
            好了，今天的写作课就到这里啦！希望大家都能写出一篇关于秋天的佳作，让我们一起分享这个季节的美好吧！
          </div>
          <div class="tool self-end justify-items-end pb-20px">
            <NButton
              class="box-border rd-14px text-18px text-#181818 font-600 !h-54px !w-54px !border-none !bg-white"
              size="large"
              @click="handleCopy"
            >
              <icon-local-copy-write class="scale-100" />
            </NButton>
          </div>
          <div class="mb-16px border-b border-b-#E6E6E6"></div>
          <div class="text-12px font-400">
            <div class="mb-5px">你可能还想问</div>
            <div class="mb-5px cursor-pointer">·以秋天为主题，写一篇描绘秋天景色的文章。</div>
          </div>
        </div>
      </div>
    </NScrollbar>
    <!-- 输入框 -->
    <div class="px-560px">
      <!-- 上传和tag -->
      <div class="mb-16px w-full flex items-center justify-between">
        <div class="flex flex-1 items-center">
          <div class="mi mr-8px rd-14px bg-white px-10px py5px text-14px">写景助手</div>
        </div>
        <NUpload
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :default-file-list="fileList"
          accept=".txt,.doc.pdf"
          class="w-unset"
          :max="1"
          list-type="image"
        >
          <NButton quaternary class="!text-#4D4D4D">
            <icon-local-plus />
            <span class="ml-8px">上传文件</span>
          </NButton>
        </NUpload>
      </div>
      <div class="box-border h-68px w-full flex items-center rd-14px bg-white p-25px">
        <NInput
          v-model:value="prompt"
          placeholder="输入你的需求，按[Enter]发送"
          type="textarea"
          size="small"
          :autosize="{
            minRows: 2,
            maxRows: 2
          }"
          @keydown.enter.prevent="hanldInput"
        />
        <NButton
          :color="`${prompt.trim() ? '#181818' : '#F4F5F7'}`"
          :disabled="prompt.trim() ? false : true"
          class="!h-42px !w-42px !rd-12px !text-#4D4D4D"
          @click="hanldInput"
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
</style>
