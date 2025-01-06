<script setup lang="ts">
import { useRouterPush } from '@/hooks/common/router';
import { useAuthStore } from '@/store/modules/auth';
import { useLoginTypeStore } from '@/store/modules/login';
import VideoHelp from '@/components/custom/video-help.vue';

const { show } = useLoginTypeStore();

const authStore = useAuthStore();
const { routerPushByKey } = useRouterPush();
const go = () => {
  routerPushByKey('study');
};
const goGeneratePic = () => {
  routerPushByKey('generate-pic');
};
const goClass = (intoView?: any) => {
  routerPushByKey('write', { query: { intoView } });
};

// 使用正则读取url里的code
const getQueryString = (name: string) => {
  const params = new URLSearchParams(window.location.search);
  return params.has(name) ? decodeURIComponent(params.get(name) as string) : null;
};
// 删除url中的code
const removeQueryParameter = (param: string) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(param);
  window.history.replaceState({}, document.title, url.toString());
};

// 对接后端接口，获取用户信息
const getLoginMes = async (code: string) => {
  try {
    authStore.wxLogin(code);
    removeQueryParameter('code');
    removeQueryParameter('state');
    return true;
  } catch (error) {
    console.log('🚀 ~ getLoginMes ~ error:', error);
    return false;
  }
};
const getCodeMes = async () => {
  const code = getQueryString('code');
  if (code) {
    const flag = await getLoginMes(code);
    if (flag) {
      show();
    }
  }
};
console.log();

onMounted(async () => {
  getCodeMes();
});
</script>

<template>
  <DarkModeContainer class="flex-center flex-col p-unset">
    <header
      class="bg box-border flex flex-col items-start justify-center pb-50px lg:h-770px xl:h-860px lg:px-100px xl:pl-234px lg:xl:h-860px"
    >
      <div class="scale-50 md:mr-50px lg:scale-90 xl:scale-100">
        <div class="text-60px text-#0B0B0B font-400 xl:scale-100">
          <img class="h-60px w-475px" src="/src/assets/imgs/homelogo.png" alt="" />
        </div>
        <div class="almm title text-65px font-700 xl:scale-100">AI成长营青少年端</div>
        <div class="text-34px text-#000000 font-400 xl:scale-100">由元宇宙王队长发起的全民AI学习计划</div>
        <NButton
          type="primary"
          class="global-btn my-48px h-68px !w-233px xl:scale-100 !text-22px !font-600"
          round
          block
          @click="go"
        >
          <icon-local-startplay class="mr-10px" />
          开始学习
        </NButton>
      </div>
    </header>
    <main class="contentbg box-border flex flex-col px-50px pb-150px xl:pl-255px xl:pr-268px">
      <div class="my-50px h-full overflow-hidden rd-22px">
        <VideoHelp
          url="https://zhitong-superx.oss-cn-shanghai.aliyuncs.com/video/help_video/AI%E5%AD%A6%E4%B9%A0%E5%8D%A1-%E5%93%81%E7%89%8C%E8%A7%86%E9%A2%91.mp4"
          :autoplay="false"
        />
      </div>
      <!-- 轻松创作 -->
      <div class="first mb-60px flex flex-col flex-1 items-center justify-between xl:mt-unset lg:flex-row xl:flex-row">
        <!-- 左边 -->
        <div class="flex flex-col lg:mr-50px xl:mr-unset">
          <div class="relative text-65px text-#2a2a2a font-700">
            AI智学
            <icon-local-flysec class="absolute right-65px top--30px" />
          </div>
          <div class="mb-60px mt-16px w-400px whitespace-normal text-24px text-#3D3D3D font-400">
            包含多种“学科智能体”精准辅学，还可以与“小凯智能机器人”聊天对话
          </div>
          <NButton v-if="false" type="primary" class="global-btn h-50px !w-153px !text-22px !font-600" round block>
            立即开始
          </NButton>
        </div>
        <!-- 右边 -->
        <div class="flex flex-col flex-1 lg:ml-50px xl:ml-250px">
          <div
            class="box-border flex items-center justify-between rd-22px px-72px py-48px"
            :style="{ background: 'linear-gradient(180deg, #42C700 18%, #D8FD9D 100%)' }"
          >
            <div class="flex flex-col">
              <div class="relative text-44px text-#0B0B0B font-600">学科智能体</div>
              <div class="mb-60px mt-16px whitespace-normal text-28px text-#000000 font-400">
                基于元创Ai的学科智能体应用
              </div>
              <NButton
                type="primary"
                class="global-btn h-50px !w-153px !text-22px !font-600"
                round
                block
                @click="e => goClass()"
              >
                开始体验
              </NButton>
            </div>
            <img src="https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/image/flower.png" alt="" />
          </div>
          <div
            class="mt-50px box-border flex items-center justify-between rd-22px px-72px py-48px"
            :style="{
              background:
                'linear-gradient(180deg, #FD7925 0%, #FDDF90 100%), radial-gradient(56% 56% at 62% 43%, rgba(208, 254, 24, 0.26) 0%, #D0FE18 100%)'
            }"
          >
            <div class="w-full flex flex-col">
              <div class="relative w-full text-44px text-#0B0B0B font-600">小凯智能机器人</div>
              <div class="mb-60px mt-16px whitespace-normal text-28px text-#000000 font-400">
                回应你的每一个奇思妙想
              </div>
              <NButton
                type="primary"
                class="global-btn h-50px !w-153px !text-22px !font-600"
                round
                block
                @click="goClass('true')"
              >
                立即开始
              </NButton>
            </div>
            <img src="https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/image/image.png" alt="" />
          </div>
        </div>
      </div>
      <!-- AI绘画快速生成 -->
      <div class="sec flex flex-col flex-1 items-center justify-between lg:flex-row xl:flex-row">
        <!-- 左边 -->
        <div class="flex flex-col lg:mr-50px xl:mr-160px">
          <div class="relative text-65px text-#2a2a2a font-700">
            AI绘画
            <icon-local-fly class="absolute right--65px top--30px" />
          </div>
          <div class="mb-60px mt-16px w-372px whitespace-normal text-24px text-#3D3D3D font-400">
            通过AI创作出各种风格的高质量图片，激发孩子的无限想象力
          </div>
          <NButton
            type="primary"
            class="global-btn h-50px !w-153px !text-22px !font-600"
            round
            block
            @click="goGeneratePic"
          >
            立即开始
          </NButton>
        </div>
        <!-- 右边  -->
        <div class="flex flex-1 scale-90 items-center xl:scale-100">
          <!-- 第一列 -->
          <div
            :style="{ background: 'linear-gradient(180deg, #FDEF9B 0%, #F4F1E2 100%)' }"
            class="mb-17px box-border h-323px w-244px flex flex-col cursor-pointer justify-between rd-22px p-12px transition-all transition-duration-300 ease hover:translate-y--5px"
          >
            <img
              src="https://imgs.superxi.cn/meitu/2024/10_41/meitu-241007105443-97W4n9GxP6KlmhgFISrptVXz.png"
              class="h-245px w-220px bg-red object-cover"
              alt=""
            />
            <div class="ml-10px flex items-center">
              <span class="mr-8px text-26px text-#000000 font-500">礼物盒</span>
              <icon-local-rightarrow v-if="false" />
            </div>
          </div>
          <!-- 第二列 -->
          <div class="mx-17px flex flex-col">
            <div
              :style="{ background: 'linear-gradient(180deg, #FDEF9B 0%, #F4F1E2 100%)' }"
              class="mb-17px box-border h-323px w-244px flex flex-col cursor-pointer justify-between rd-22px p-12px transition-all transition-duration-300 ease hover:translate-y--5px"
            >
              <img
                src="https://imgs.superxi.cn/meitu/2024/10_41/meitu-241007120238-k6Q9Ij3qB50Bib56gf3XIOYe.png"
                class="h-245px w-220px bg-red object-cover"
                alt=""
              />
              <div class="ml-10px flex items-center">
                <span class="mr-8px text-26px text-#000000 font-500">小河流水</span>
                <icon-local-rightarrow v-if="false" />
              </div>
            </div>
            <div
              :style="{ background: 'linear-gradient(180deg, #FDEF9B 0%, #F4F1E2 100%)' }"
              class="mb-17px box-border h-323px w-244px flex flex-col cursor-pointer justify-between rd-22px p-12px transition-all transition-duration-300 ease hover:translate-y--5px"
            >
              <img
                src="https://imgs.superxi.cn/meitu/2024/10_40/meitu-241006092503-hfloTOLSQvrHgygraXFxMUMc.png"
                class="h-245px w-220px bg-red object-cover"
                alt=""
              />
              <div class="ml-10px flex items-center">
                <span class="mr-8px text-26px text-#000000 font-500">狗狗赛跑</span>
                <icon-local-rightarrow v-if="false" />
              </div>
            </div>
          </div>
          <!-- 第三列 -->
          <div class="relative top--40px flex flex-col">
            <div
              :style="{ background: 'linear-gradient(180deg, #FDEF9B 0%, #F4F1E2 100%)' }"
              class="mb-17px box-border h-323px w-244px flex flex-col cursor-pointer justify-between rd-22px p-12px transition-all transition-duration-300 ease hover:translate-y--5px"
            >
              <img
                src="https://imgs.superxi.cn/devtest/2024/10_40/devtest-241003050144-LBUluFUsPLoxloq5cNEcwC1S.png"
                class="h-245px w-220px bg-red object-cover"
                alt=""
              />
              <div class="ml-10px flex items-center">
                <span class="mr-8px text-26px text-#000000 font-500">小猪徽章</span>
                <icon-local-rightarrow v-if="false" />
              </div>
            </div>
            <div
              :style="{ background: 'linear-gradient(180deg, #FDEF9B 0%, #F4F1E2 100%)' }"
              class="mb-17px box-border h-323px w-244px flex flex-col cursor-pointer justify-between rd-22px p-12px transition-all transition-duration-300 ease hover:translate-y--5px"
            >
              <img
                src="https://imgs.superxi.cn/meitu/2024/09_40/meitu-240930072756-yJ4kHFQ4jUK8UXauMXK2Mq9T.png"
                class="h-245px w-220px bg-red object-cover"
                alt=""
              />
              <div class="ml-10px flex items-center">
                <span class="mr-8px text-26px text-#000000 font-500">驯鹿与少年</span>
                <icon-local-rightarrow v-if="false" />
              </div>
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

  background: url('https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/image/webbg.png') no-repeat;
  background-size: cover;
  background-position-y: 70%;
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
  height: 2525px;
  background: url('https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/image/contentbg.png') no-repeat;
  background-size: cover;
}
</style>
