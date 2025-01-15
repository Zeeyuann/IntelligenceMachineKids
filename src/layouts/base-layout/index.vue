<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { AdminLayout, LAYOUT_SCROLL_EL_ID } from '@sa/materials';
import type { LayoutMode } from '@sa/materials';
import dayjs from 'dayjs';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { getTaskList } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';
import { useRouterPush } from '@/hooks/common/router';
import GlobalHeader from '../modules/global-header/index.vue';
import GlobalSider from '../modules/global-sider/index.vue';
import GlobalTab from '../modules/global-tab/index.vue';
import GlobalContent from '../modules/global-content/index.vue';
import GlobalFooter from '../modules/global-footer/index.vue';
import ThemeDrawer from '../modules/theme-drawer/index.vue';
import { setupMixMenuContext } from '../context';
import IconLocalHat from '~icons/local/hat';

const authStore = useAuthStore();
const route = useRoute();
defineOptions({
  name: 'BaseLayout'
});

const appStore = useAppStore();
const themeStore = useThemeStore();

watch(
  route,
  routeInfo => {
    if (routeInfo.meta.isBlank) {
      themeStore.setFooterVisible(!routeInfo.meta.isBlank);
      themeStore.setLayoutScroll('content');
    } else {
      themeStore.setFooterVisible(true);
      themeStore.setLayoutScroll('wrapper');
    }
  },
  { immediate: true }
);

const { childLevelMenus, isActiveFirstLevelMenuHasChildren } = setupMixMenuContext();

const GlobalMenu = defineAsyncComponent(() => import('../modules/global-menu/index.vue'));

const layoutMode = computed(() => {
  const vertical: LayoutMode = 'vertical';
  const horizontal: LayoutMode = 'horizontal';
  return themeStore.layout.mode.includes(vertical) ? vertical : horizontal;
});

const headerProps = computed(() => {
  const { mode, reverseHorizontalMix } = themeStore.layout;

  const headerPropsConfig: Record<UnionKey.ThemeLayoutMode, App.Global.HeaderProps> = {
    vertical: {
      showLogo: false,
      showMenu: false,
      showMenuToggler: true
    },
    'vertical-mix': {
      showLogo: false,
      showMenu: false,
      showMenuToggler: false
    },
    horizontal: {
      showLogo: true,
      showMenu: true,
      showMenuToggler: false
    },
    'horizontal-mix': {
      showLogo: true,
      showMenu: true,
      showMenuToggler: reverseHorizontalMix && isActiveFirstLevelMenuHasChildren.value
    }
  };

  return headerPropsConfig[mode];
});

const siderVisible = computed(() => themeStore.layout.mode !== 'horizontal');

const isVerticalMix = computed(() => themeStore.layout.mode === 'vertical-mix');

const isHorizontalMix = computed(() => themeStore.layout.mode === 'horizontal-mix');

const siderWidth = computed(() => getSiderWidth());

const siderCollapsedWidth = computed(() => getSiderCollapsedWidth());

function getSiderWidth() {
  const { reverseHorizontalMix } = themeStore.layout;
  const { width, mixWidth, mixChildMenuWidth } = themeStore.sider;

  if (isHorizontalMix.value && reverseHorizontalMix) {
    return isActiveFirstLevelMenuHasChildren.value ? width : 0;
  }

  let w = isVerticalMix.value || isHorizontalMix.value ? mixWidth : width;

  if (isVerticalMix.value && appStore.mixSiderFixed && childLevelMenus.value.length) {
    w += mixChildMenuWidth;
  }

  return w;
}

function getSiderCollapsedWidth() {
  const { reverseHorizontalMix } = themeStore.layout;
  const { collapsedWidth, mixCollapsedWidth, mixChildMenuWidth } = themeStore.sider;

  if (isHorizontalMix.value && reverseHorizontalMix) {
    return isActiveFirstLevelMenuHasChildren.value ? collapsedWidth : 0;
  }

  let w = isVerticalMix.value || isHorizontalMix.value ? mixCollapsedWidth : collapsedWidth;

  if (isVerticalMix.value && appStore.mixSiderFixed && childLevelMenus.value.length) {
    w += mixChildMenuWidth;
  }

  return w;
}

const { routerPushByKey } = useRouterPush();

const nowDay = dayjs().format('YYYY-MM-DD');

const bg = [
  {
    color: '#2EC883',
    bg: 'rgba(46,200,131,0.06)'
  },
  {
    color: '#41A2EE',
    bg: 'rgba(65, 162, 238, 0.06)'
  }
];

const taskList = ref([]);

const handleExfold = async () => {
  const { data, error } = await getTaskList({ date: nowDay });
  if (!error) {
    console.log('🚀 ~ data:', data);
    taskList.value = data;
  }

  window.$notification?.destroyAll();

  const n = window.$notification?.create({
    title() {
      return h('div', { class: 'text-18px text-#000000 font-600 alph flex items-end' }, [
        h('div', {}, '精准练任务'),
        h('div', { class: 'text-12px font-400 text-#9E9E9E mb-5px ml-10px' }, `今日( ${nowDay} )`)
      ]);
    },
    content() {
      return h(
        'div',
        { class: 'w-full  box-border  rd-16px gap-y-10px grid grid-cols-1' },
        taskList.value.map((item: any, index: number) => {
          return h(
            'div',
            {
              class:
                'w-full px-11px py-16px box-border flex items-center justify-between alph bg-white hover:shadow-md cursor-pointer transition-all-300 rd-12px',
              style: {
                background: bg[index % bg.length].bg,
                color: bg[index % bg.length].color
              },
              onClick() {
                // window.$message?.info('功能将于12月份开通');
                if (item.state) {
                  routerPushByKey('exercise-report', { query: { id: item?.id } });
                } else {
                  routerPushByKey('exercise-test-subject', { query: { id: item?.id } });
                }
                n?.destroy();
              }
            },
            [
              h('div', { class: 'flex flex-col' }, [
                h('div', { class: 'flex items-center' }, [
                  h(IconLocalHat, { class: 'w-24px h-24px mr-6px' }),
                  h(
                    'div',
                    {
                      class: 'text-16px font-600 alph',
                      style: {
                        color: bg[index % bg.length].color
                      }
                    },
                    `${item?.courseName ?? '科目'}`
                  )
                ]),

                h('div', { class: 'flex items-center' }, [
                  h(
                    'div',
                    { class: 'text-12px text-#000000 hidden' },
                    `题量：${item?.catalogIds?.split(',').length}题`
                  ),
                  h(
                    'div',
                    {
                      class: `text-12px font-600 text-#ffffff alph w-52px h-18px flex items-center justify-center `,
                      style: {
                        color: `${item?.state ? '#00B578' : '#FA5151'}`
                      }
                    },
                    `${item?.state ? '已完成' : '未完成'}`
                  )
                ])
              ]),

              h(
                'div',
                {
                  class: `w-77px h-23px flex items-center justify-center  rd-12px text-12px font-600 text-#ffffff`,
                  style: {
                    background: bg[index % bg.length].color
                  }
                },
                `${item?.state ? '查看报告' : '去完成'}`
              )
            ]
          );
        })
      );
    }
  });
};
</script>

<template>
  <AdminLayout
    v-model:sider-collapse="appStore.siderCollapse"
    :mode="layoutMode"
    :scroll-el-id="LAYOUT_SCROLL_EL_ID"
    :scroll-mode="themeStore.layout.scrollMode"
    :is-mobile="appStore.isMobile"
    :full-content="appStore.fullContent"
    :fixed-top="themeStore.fixedHeaderAndTab"
    :header-height="themeStore.header.height"
    :tab-visible="themeStore.tab.visible"
    :tab-height="themeStore.tab.height"
    :content-class="appStore.contentXScrollable ? 'overflow-x-hidden' : ''"
    :sider-visible="siderVisible"
    :sider-width="siderWidth"
    :sider-collapsed-width="siderCollapsedWidth"
    :footer-visible="themeStore.footer.visible"
    :footer-height="themeStore.footer.height"
    :fixed-footer="themeStore.footer.fixed"
    :right-footer="themeStore.footer.right"
  >
    <div
      v-if="authStore.isLogin"
      :style="{ background: 'rgba(255, 255, 255, 0.85)', borderRadius: '23px 0px 0px 23px' }"
      class="alph fixed right-10px top-120px box-border flex flex-col cursor-pointer items-center justify-between rd-23px p-6px text-12px text-#9E9E9E"
      @click="handleExfold"
    >
      <icon-local-jzllogo class="h-55px w-68px" />
    </div>
    <template #header>
      <GlobalHeader v-bind="headerProps" />
    </template>
    <template #tab>
      <GlobalTab />
    </template>
    <template #sider>
      <GlobalSider />
    </template>
    <GlobalMenu />
    <GlobalContent />
    <ThemeDrawer />
    <template #footer>
      <GlobalFooter />
    </template>
  </AdminLayout>
</template>

<style lang="scss">
#__SCROLL_EL_ID__ {
  @include scrollbar();
}
</style>
