<script setup lang="ts">
import { useRouterPush } from '@/hooks/common/router';
import { aiSysList } from '@/service/api/index';
import { useAuthStore } from '@/store/modules/auth';
const userStore = useAuthStore();

const { routerPushByPath } = useRouterPush();

const userList: any = ref([]);

watch(
  () => userStore?.userInfo?.user_id,
  async val => {
    if (val) {
      const { data: ailist, error: listerr } = await aiSysList({ user_id: val });
      if (!listerr) {
        console.log('🚀 ~ user:', ailist);
        userList.value = ailist;
      }
    }
  }
);

onMounted(async () => {
  const { data: ailist, error: listerr } = await aiSysList({
    user_id: userStore.userInfo.user_id ? userStore.userInfo.user_id : 0
  });
  if (!listerr) {
    console.log('🚀 ~ user:', ailist);
    userList.value = ailist;
  }
});

const goGeneratePic = () => {
  routerPushByPath('/generate-pic');
};

const goWriteComposition = (item: any) => {
  routerPushByPath('/write-composition', { query: { item: JSON.stringify(item) } });
};
</script>

<template>
  <DarkModeContainer class="flex-center flex-col p-unset">
    <header class="bg flex flex-col items-center justify-center lg:h-770px xl:h-860px xl:h-860px lg:!bg-center">
      <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col scale-50 items-center justify-center lg:scale-90 xl:scale-100">
          <div class="title text-80px text-#0B0B0B font-700">轻松创作 极速出图</div>
          <div class="text-26px font-400">基于元创AI,可以高质量帮你完成各种需求</div>
          <div class="flex items-center">
            <NButton
              v-for="item in userList.filter((item: any) => item.title === '小凯智能机器人')"
              :key="item.id"
              type="primary"
              class="global-btn my-88px h-80px !w-197px !text-22px !font-600"
              round
              block
              @click="goWriteComposition(item)"
            >
              {{ item.title }}
            </NButton>
            <NButton
              type="primary"
              class="global-btn my-88px ml-48px h-80px !w-197px !text-22px !font-600"
              round
              block
              @click="goGeneratePic"
            >
              创作绘图
            </NButton>
          </div>
        </div>
      </div>
    </header>
    <main class="contentbg box-border flex flex-col items-center pt-161px">
      <div class="mb-100px flex flex-col items-center">
        <div class="flex items-center text-65px text-#2a2a2a font-700">
          <icon-local-xkznt class="mr-20px" />
          我的角色
        </div>
        <div class="mb-70px mt-16px text-24px text-#3d3d3d font-400">让AI扮演成你喜欢的角色</div>
        <!-- ref="role" -->
        <div class="grid grid-cols-3 box-border w-873px w-full flex-1 gap-x-0 gap-y-16px px-20px">
          <div
            v-for="item in userList"
            :key="item.id"
            class="boxitem box-border h-80px w-95% flex cursor-pointer items-center border border-[#DADADA] rd-14px border-solid bg-white p-12px shadow-md transition-all transition-duration-300 ease hover:border-[#BAFD00]"
            @click="goWriteComposition(item)"
          >
            <img :src="item.icon" class="mr-10px h-46px w-46px" alt="" />
            <div>
              <div class="text-16px font-600">{{ item.title }}</div>
              <div class="text-14px text-#9E9E9E">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-65px text-#2a2a2a font-700">优秀绘画作品</div>
      <div class="mb-70px mt-16px text-24px text-#3d3d3d font-400">优秀AI绘图作图,激发孩子创意</div>
      <div class="box-border h-539px w-873px flex items-center justify-between md:scale-80">
        <div class="mr-10px flex flex-1 items-center justify-between">
          <div class="h-full flex flex-col justify-between">
            <div class="mb-10px h-320px w-210px of-hidden rd-16px bg-blue">
              <img
                src="https://imgs.superxi.cn/meitu/2024/10_41/meitu-241007105443-97W4n9GxP6KlmhgFISrptVXz.png"
                class="size-full rd-16px object-cover object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
            <div class="h-210px w-210px of-hidden rd-16px bg-red">
              <img
                src="https://imgs.superxi.cn/meitu/2024/10_41/meitu-241007120238-k6Q9Ij3qB50Bib56gf3XIOYe.png"
                class="size-full rd-16px object-cover object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
          </div>
          <div class="h-full flex flex-col justify-between">
            <div class="h-210px w-210px of-hidden rd-16px bg-red">
              <img
                src="https://imgs.superxi.cn/meitu/2024/10_40/meitu-241006092503-hfloTOLSQvrHgygraXFxMUMc.png"
                class="size-full rd-16px object-cover object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
            <div class="mt-10px h-320px w-210px of-hidden rd-16px bg-blue">
              <img
                src="https://imgs.superxi.cn/meitu/2024/10_40/meitu-241005015621-t7bsYtvFTnVLXCARjAGqtR0V.png"
                class="size-full rd-16px object-cover object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="mr-10px flex flex-1 items-center justify-between">
          <div class="h-full flex flex-col justify-between">
            <div class="mb-10px h-320px w-210px of-hidden rd-16px bg-blue">
              <img
                src="https://imgs.superxi.cn/meitu/2024/10_40/meitu-241004013315-yFihjEcJSpHnUI98dt9lyFdV.png"
                class="size-full rd-16px object-cover object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
            <div class="h-210px w-210px of-hidden rd-16px bg-red">
              <img
                src="https://imgs.superxi.cn/devtest/2024/10_40/devtest-241003050144-LBUluFUsPLoxloq5cNEcwC1S.png"
                class="size-full rd-16px object-cover object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
          </div>
          <div class="h-full flex flex-col justify-between">
            <div class="h-210px w-210px of-hidden rd-16px bg-red">
              <img
                src="https://imgs.superxi.cn/meitu/2024/10_40/meitu-241003085308-uVdIZEj1zelBgqhf4KZEIqgL.png"
                class="size-full rd-16px object-cover object-cover transition-all transition-duration-300 ease hover:scale-120"
                alt=""
              />
            </div>
            <div class="mt-10px h-320px w-210px of-hidden rd-16px bg-blue">
              <img
                src="https://imgs.superxi.cn/meitu/2024/10_40/meitu-241001033207-4b30ATbc8ubmntY3Zmz8uHJp.png"
                class="size-full rd-16px object-cover object-cover transition-all transition-duration-300 ease hover:scale-120"
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
