<script setup lang="ts">
import type { MenuProps } from 'naive-ui';
import { NMenu } from 'naive-ui';
import { GLOBAL_HEADER_MENU_ID } from '@/constants/app';
import { useRouteStore } from '@/store/modules/route';
import { useRouterPush } from '@/hooks/common/router';
import { useMenu } from '../../../context';
import HelpVideo from '../components/help-video.vue';
type MenuThemeOverrides = NonNullable<MenuProps['themeOverrides']>;
const menuThemeOverrides: MenuThemeOverrides = {
  itemTextColor: '#6F6F6F',
  itemTextColorHoverHorizontal: '#181818',
  itemTextColorActiveHorizontal: '#0B0B0B',
  itemTextColorActiveHoverHorizontal: '#000000',
  fontSize: '14px'
};
defineOptions({
  name: 'HorizontalMenu'
});

const routeStore = useRouteStore();
const { routerPushByKeyWithMetaQuery } = useRouterPush();
const { selectedKey } = useMenu();
</script>

<template>
  <Teleport :to="`#${GLOBAL_HEADER_MENU_ID}`">
    <NMenu
      mode="horizontal"
      :value="selectedKey"
      :options="routeStore.menus"
      :indent="18"
      responsive
      :theme-overrides="menuThemeOverrides"
      @update:value="routerPushByKeyWithMetaQuery"
    />
    <HelpVideo class="ml-10px" />
  </Teleport>
</template>

<style scoped></style>
