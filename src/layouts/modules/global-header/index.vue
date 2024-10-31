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

const route = useRoute();
const routeName = ref(route.name);
watch(
  route,
  val => {
    routeName.value = val.name;
  },
  { immediate: true }
);

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
  <DarkModeContainer
    :class="{
      bg: routeName === 'home',
      paintbg: routeName === 'paint',
      classbg:
        routeName === 'classroom' ||
        routeName === 'study' ||
        routeName === 'test-home' ||
        routeName === 'test-subject' ||
        routeName === 'test-report',
      writebg: routeName === 'write'
    }"
    class="h-full flex-y-center px-20px shadow-header xl:px-230px"
  >
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
  background: radial-gradient(48% 48% at 56% 37%, #d0fe18 0%, #d0fe18 100%);
}
.paintbg {
  background: linear-gradient(180deg, #42c700 18%, #42c700 100%);
}
.classbg {
  background: linear-gradient(180deg, #2cb6ff 10%, #2cb6ff 100%);
}
.writebg {
  background: linear-gradient(180deg, #fd7925 0%, #fd7925 100%), #fd7925;
}
:deep(.n-menu) {
  justify-content: center !important;
}
:deep(.v-overflow) {
  background-color: #fff;
  width: 454px !important;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 23px;
}
:deep(.n-menu-item-content--selected) {
  font-weight: 700 !important;
}
:deep(.n-menu-item-content) {
  position: relative;
}
:deep(.n-menu-item-content::after) {
  content: '';
  width: 18px;
  display: inline-flex;
  height: 5px;
  border-radius: 8px;
  opacity: 0;
  background: #000;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 4px;
  transition: all 0.2s ease-in-out;
}
:deep(.n-menu-item-content--selected::after) {
  opacity: 1;
}
</style>
