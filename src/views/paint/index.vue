<script setup lang="ts">
import { useRouterPush } from '@/hooks/common/router';
const { routerPushByPath } = useRouterPush();

const goGeneratePic = () => {
  routerPushByPath('/generate-pic');
};
</script>

<template>
  <DarkModeContainer class="flex-center flex-col p-unset">
    <header class="bg flex flex-col items-center justify-center">
      <div class="title text-80px text-#0B0B0B font-700">轻松创作 极速出图</div>
      <div class="text-26px font-400">基于最新AI技术，可快速生成各种风格的高质量图片</div>
      <div class="flex items-center">
        <NButton
          type="primary"
          class="global-btn my-88px h-80px !w-197px !text-22px !font-600"
          round
          block
          @click="goGeneratePic"
        >
          文生图
        </NButton>
        <NButton
          type="primary"
          class="global-btn my-88px ml-48px h-80px !w-197px !text-22px !font-600"
          round
          block
          @click="goGeneratePic"
        >
          图生图
        </NButton>
      </div>
    </header>
    <main class="contentbg box-border flex flex-col items-center pt-161px">
      <div class="text-65px text-#2a2a2a font-700">优秀绘画作品</div>
      <div class="mb-70px mt-16px text-24px text-#3d3d3d font-400">精准识别学科知识薄弱点，查漏补缺助学习</div>
      <div class="box-border h-539px w-873px flex items-center justify-between">
        <div class="mr-10px flex flex-1 items-center justify-between">
          <div class="h-full flex flex-col justify-between">
            <div class="mb-10px h-320px w-210px of-hidden rd-16px bg-blue">
              <img
                src="https://inews.gtimg.com/news_bt/OLxGAuCdJ1SwoZRdrZoqGrpBGX-BgYjWnSFuiDDoS3xQsAA/1000"
                class="size-full rd-16px object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
            <div class="h-210px w-210px of-hidden rd-16px bg-red">
              <img
                src=""
                class="size-full rd-16px object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
          </div>
          <div class="h-full flex flex-col justify-between">
            <div class="h-210px w-210px of-hidden rd-16px bg-red">
              <img
                src=""
                class="size-full rd-16px object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
            <div class="mt-10px h-320px w-210px of-hidden rd-16px bg-blue">
              <img
                src="https://inews.gtimg.com/news_bt/OLxGAuCdJ1SwoZRdrZoqGrpBGX-BgYjWnSFuiDDoS3xQsAA/1000"
                class="size-full rd-16px object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="mr-10px flex flex-1 items-center justify-between">
          <div class="h-full flex flex-col justify-between">
            <div class="mb-10px h-320px w-210px of-hidden rd-16px bg-blue">
              <img
                src="https://inews.gtimg.com/news_bt/OLxGAuCdJ1SwoZRdrZoqGrpBGX-BgYjWnSFuiDDoS3xQsAA/1000"
                class="size-full rd-16px object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
            <div class="h-210px w-210px of-hidden rd-16px bg-red">
              <img
                src=""
                class="size-full rd-16px object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
          </div>
          <div class="h-full flex flex-col justify-between">
            <div class="h-210px w-210px of-hidden rd-16px bg-red">
              <img
                src=""
                class="size-full rd-16px object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
            <div class="mt-10px h-320px w-210px of-hidden rd-16px bg-blue">
              <img
                src="https://inews.gtimg.com/news_bt/OLxGAuCdJ1SwoZRdrZoqGrpBGX-BgYjWnSFuiDDoS3xQsAA/1000"
                class="size-full rd-16px object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
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
  height: 860px;
  background: url('https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/image/webpaintbg.png') no-repeat;
  background-size: cover;
}
.title {
  background: linear-gradient(82deg, #000000 64%, #352a2a 78%, #774d4d 96%), #2a2a2a;
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
