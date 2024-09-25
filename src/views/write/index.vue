<script setup lang="ts">
import { useRouterPush } from '@/hooks/common/router';
const { routerPushByKey } = useRouterPush();
const goWriteChat = () => {
  routerPushByKey('write-chat-home');
};

const allRoutes = useRouter().getRoutes();
console.log('🚀 ~ allRoutes:', allRoutes);
</script>

<template>
  <DarkModeContainer class="flex-center flex-col p-unset">
    <header class="bg flex flex-col items-center justify-center">
      <div class="title text-80px text-#0B0B0B font-700">孩子的AI写作神器</div>
      <div class="text-30px font-400">开启无限想象：让孩子的写作之旅更加丰富多彩</div>
      <div class="flex items-center">
        <NButton
          type="primary"
          class="global-btn my-48px h-80px !w-197px !text-22px !font-600"
          round
          block
          @click="goWriteChat"
        >
          知识问答
        </NButton>
        <NButton type="primary" class="global-btn my-48px ml-48px h-80px !w-197px !text-22px !font-600" round block>
          文章写作
        </NButton>
      </div>
    </header>
    <main class="contentbg box-border flex flex-col items-center pt-161px">
      <div class="text-65px text-#2a2a2a font-700">学科智能体</div>
      <div class="mb-70px mt-16px text-24px text-#3d3d3d font-400">塑造未来教育：智能体在学科教学中的创新应用</div>
      <div class="grid grid-cols-4 box-border w-full flex-1 gap-16px px-257px">
        <div
          v-for="item in 30"
          :key="item"
          class="boxitem box-border h-70px w-339px flex cursor-pointer items-center border border-[#DADADA] rd-14px border-solid bg-white p-12px transition-all transition-duration-300 ease hover:border-[#BAFD00]"
        >
          <img src="" class="mr-10px h-46px w-46px rd-50% bg-red" alt="" />
          <div>
            <div class="text-16px font-600">Ai写景色</div>
            <div class="text-14px text-#9E9E9E">一键生成主题相关的写作文章</div>
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
  background: url('https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/image/webclassbg.png') no-repeat;
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
.boxitem:hover {
  box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.08);
}
</style>
