<script setup lang="ts">
import { useRouterPush } from '@/hooks/common/router';
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
</script>

<template>
  <DarkModeContainer class="flex-center flex-col p-unset">
    <header class="bg box-border flex flex-col justify-center pb-50px pl-234px">
      <div class="text-60px text-#0B0B0B font-400">元宇宙王队长</div>
      <div class="almm title text-65px font-700">AI成长营青少年端</div>
      <div class="text-34px text-#000000 font-400">由元宇宙王队长发起的全民AI学习计划</div>
      <NButton type="primary" class="global-btn my-48px h-68px !w-233px !text-22px !font-600" round block @click="go">
        开始学习
      </NButton>
    </header>
    <main class="contentbg box-border flex flex-col pb-150px pl-255px pr-268px">
      <!-- AI绘画快速生成 -->
      <div class="first flex flex-1 items-center justify-between">
        <!-- 左边 -->
        <div class="mr-160px flex flex-col">
          <div class="relative text-65px text-#2a2a2a font-700">
            AI绘画快速生成
            <icon-local-fly class="absolute right--65px top--30px" />
          </div>
          <div class="mb-60px mt-16px w-372px whitespace-normal text-24px text-#3D3D3D font-400">
            基于最新AI技术，可快速生成各种风格的高质量图片
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
        <div class="flex flex-1 items-center">
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

      <!-- 轻松创作 -->
      <div class="sec flex flex-1 items-center justify-between">
        <!-- 左边 -->
        <div class="mr-160px flex flex-col">
          <div class="relative text-65px text-#2a2a2a font-700">
            轻松创作
            <icon-local-flysec class="absolute right-65px top--30px" />
          </div>
          <div class="mb-60px mt-16px w-372px whitespace-normal text-24px text-#3D3D3D font-400">
            基于最新AI技术，可快速生成各种风格的高质量图片
          </div>
          <NButton v-if="false" type="primary" class="global-btn h-50px !w-153px !text-22px !font-600" round block>
            立即开始
          </NButton>
        </div>
        <!-- 右边 -->
        <div class="ml-250px flex flex-col flex-1">
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
            <div class="flex flex-col">
              <div class="relative text-44px text-#0B0B0B font-600">智能问答</div>
              <div class="mb-60px mt-16px whitespace-normal text-28px text-#000000 font-400">和AI小伙伴一起聊天</div>
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
    </main>
  </DarkModeContainer>
</template>

<style scoped>
.bg {
  width: 100%;
  height: 860px;
  background: url('https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/image/webbg.png') no-repeat;
  background-size: cover;
  background-position-y: 30%;
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
