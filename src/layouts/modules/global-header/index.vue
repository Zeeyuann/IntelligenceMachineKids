<script setup lang="ts">
// import { useFullscreen } from '@vueuse/core';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { GLOBAL_HEADER_MENU_ID } from '@/constants/app';
import GlobalLogo from '../global-logo/index.vue';
import GlobalBreadcrumb from '../global-breadcrumb/index.vue';
// import GlobalSearch from '../global-search/index.vue';
// import ThemeButton from './components/theme-button.vue';
import UserAvatar from './components/user-avatar.vue';

defineOptions({
  name: 'GlobalHeader'
});

interface Props {
  /** Whether to show the logo */
  showLogo?: App.Global.HeaderProps['showLogo'];
  /** Whether to show the menu toggler */
  showMenuToggler?: App.Global.HeaderProps['showMenuToggler'];
  /** Whether to show the menu */
  showMenu?: App.Global.HeaderProps['showMenu'];
}

defineProps<Props>();

const appStore = useAppStore();
const themeStore = useThemeStore();
// const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <DarkModeContainer class="bg h-full flex-y-center px-230px shadow-header">
    <GlobalLogo v-if="showLogo" class="h-full" :style="{ width: themeStore.sider.width + 'px' }" />
    <MenuToggler v-if="showMenuToggler" :collapsed="appStore.siderCollapse" @click="appStore.toggleSiderCollapse" />
    <div v-if="showMenu" :id="GLOBAL_HEADER_MENU_ID" class="h-full flex-y-center flex-1-hidden"></div>
    <div v-else class="bg h-full flex-y-center flex-1-hidden">
      <GlobalBreadcrumb v-if="!appStore.isMobile" class="ml-12px" />
    </div>
    <div class="h-full flex-y-center justify-end">
      <!-- <GlobalSearch /> -->
      <!-- <FullScreen v-if="!appStore.isMobile" :full="isFullscreen" @click="toggle" /> -->
      <!-- <LangSwitch :lang="appStore.locale" :lang-options="appStore.localeOptions" @change-lang="appStore.changeLocale" /> -->
      <!--
 <ThemeSchemaSwitch
        :theme-schema="themeStore.themeScheme"
        :is-dark="themeStore.darkMode"
        @switch="themeStore.toggleThemeScheme"
      />
-->
      <!-- <ThemeButton /> -->
      <UserAvatar />
    </div>
  </DarkModeContainer>
</template>

<style scoped>
.bg {
  background: radial-gradient(48% 48% at 56% 37%, rgba(208, 254, 24, 0.26) 0%, #d0fe18 100%);
}
:deep(.n-menu) {
  justify-content: center !important;
}
:deep(.v-overflow) {
  background-color: #fff;
  width: fit-content !important;
  height: 46px;
  display: flex;
  align-items: center;
  border-radius: 23px;
}
:deep(.n-menu-item-content--selected) {
  font-weight: 700 !important;
}
</style>
