<script setup lang="ts">
import type { MenuProps } from 'naive-ui';
import VideoPlayer from '@/components/custom/video-help.vue';
type MenuThemeOverrides = NonNullable<MenuProps['themeOverrides']>;
const menuThemeOverrides: MenuThemeOverrides = {
  itemTextColor: '#6F6F6F',
  itemTextColorHoverHorizontal: '#181818',
  itemTextColorActiveHorizontal: '#0B0B0B',
  itemTextColorActiveHoverHorizontal: '#000000',
  fontSize: '14px'
};

const videoOption = [
  {
    label: '视频中心',
    key: 'help',
    children: [
      {
        label: 'AI学习卡-手机小程序账号注册、激活',
        key: 'https://zhitong-superx.oss-cn-shanghai.aliyuncs.com/video/help_video/AI%E5%AD%A6%E4%B9%A0%E5%8D%A1-%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%A8%8B%E5%BA%8F%E8%B4%A6%E5%8F%B7%E6%B3%A8%E5%86%8C%E3%80%81%E6%BF%80%E6%B4%BB.mp4'
      },
      {
        label: 'AI学习卡-四大模块',
        key: 'https://zhitong-superx.oss-cn-shanghai.aliyuncs.com/video/help_video/AI%E5%AD%A6%E4%B9%A0%E5%8D%A1-%E5%9B%9B%E5%A4%A7%E6%A8%A1%E5%9D%97.mp4'
      }
    ]
  }
];

const showModal = ref(false);
const videoUrl = ref('');
const videoTitle = ref('');

const handleUpdate = (key: string, item: any) => {
  console.log('🚀 ~ handleUpdate ~ item:', key);
  showModal.value = true;
  videoUrl.value = key;
  videoTitle.value = item.label;
};
</script>

<template>
  <div>
    <NMenu
      mode="horizontal"
      :options="videoOption"
      :indent="18"
      responsive
      :theme-overrides="menuThemeOverrides"
      @update:value="handleUpdate"
    />
    <NDrawer v-model:show="showModal" default-height="70%" placement="bottom" resizable>
      <NDrawerContent :title="videoTitle">
        <VideoPlayer :url="videoUrl" autoplay />
      </NDrawerContent>
    </NDrawer>
  </div>
</template>

<style scoped>
:deep(.v-overflow) {
  width: unset !important;
}
</style>
