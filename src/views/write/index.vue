<script setup lang="ts">
import { useRouterPush } from '@/hooks/common/router';
import { aiSysUser, fetchAgentSysuser, getAgentLists } from '@/service/api/index';
import { useAuthStore } from '@/store/modules/auth';
const authStore = useAuthStore();
const { routerPushByPath, routerPushByKey } = useRouterPush();

// const route = useRoute();

// const role = ref();
// if (route.query.intoView === 'true') {
//   setTimeout(() => {
//     role.value.scrollIntoView({
//       behavior: 'smooth' // 平滑滚动
//     });
//   }, 200);
// }
// onMounted(() => {});

const config: any = reactive({
  agents: [{}]
});

const roleList: any = ref([]);
(async () => {
  if (authStore.isLogin) {
    const { data, error } = await fetchAgentSysuser();
    console.log('🚀 ~ data:', data);
    if (!error) {
      Object.assign(config, data);
    }
    const { data: user, error: usererr } = await aiSysUser();
    if (!usererr) {
      console.log('🚀 ~ user:', user);
      roleList.value = user.filter((item: any) => item.title === '小凯助手');
    }
  }
  const { data, error } = await getAgentLists();
  if (!error) {
    Object.assign(config.agents, [...data.data]);
    console.log('🚀 ~ config:', config);
  }
})();

const view = ref();

const intoView = () => {
  view.value.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
};

const goWriteChatByitem = (item?: any) => {
  if (item) {
    routerPushByKey('write-chat-home', { query: item });
  }
};

// const goWriteChat = () => {
//   routerPushByPath('/write-composition');
// };
const goWriteComposition = (item: any) => {
  routerPushByPath('/write-composition', { query: { item: JSON.stringify(item) } });
};
</script>

<template>
  <DarkModeContainer class="flex-center flex-col p-unset">
    <header class="bg box-border flex flex-col items-center justify-center">
      <div class="title text-80px text-#0B0B0B font-700">孩子的AI好朋友</div>
      <div class="text-26px font-400">和AI一起分享你的故事吧</div>
      <div class="flex items-center">
        <NButton
          v-for="item in roleList"
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
          @click="intoView"
        >
          学科智能体
        </NButton>
      </div>
    </header>
    <main ref="view" class="contentbg box-border flex flex-col flex-1 items-center pb-50px pt-161px">
      <div class="text-65px text-#2a2a2a font-700">学科智能体</div>
      <div class="mb-70px mt-16px text-24px text-#3d3d3d font-400">塑造未来教育：智能体在学科教学中的创新应用</div>
      <!-- ref="role" -->
      <div class="grid grid-cols-3 box-border w-full flex-1 gap-x-0 gap-y-16px px-280px">
        <div
          v-for="item in config.agents"
          :key="item"
          class="boxitem box-border h-80px w-95% flex cursor-pointer items-center border border-[#DADADA] rd-14px border-solid bg-white p-12px shadow-md transition-all transition-duration-300 ease hover:border-[#BAFD00]"
          @click="goWriteChatByitem(item)"
        >
          <img :src="item.icon" class="mr-10px h-46px w-46px" alt="" />
          <div>
            <div class="text-16px font-600">{{ item.title }}</div>
            <div class="text-14px text-#9E9E9E">{{ item.description }}</div>
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
