<script setup lang="ts">
import { computed } from 'vue';
import type { VNode } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/modules/auth';
import { useRouterPush } from '@/hooks/common/router';
import { useSvgIcon } from '@/hooks/common/icon';
import { $t } from '@/locales';
import { useLoginTypeStore } from '@/store/modules/login';
import { useLoginClassStore } from '@/store/modules/login-class';
import Login from './login/index.vue';

const loginClassStore = useLoginClassStore();

defineOptions({
  name: 'UserAvatar'
});
const { type, showModal } = storeToRefs(useLoginTypeStore());

const authStore = useAuthStore();
const { routerPushByKey } = useRouterPush();
const { SvgIconVNode } = useSvgIcon();

function loginOrRegister() {
  useLoginTypeStore().show();
}

type DropdownKey = 'logout';

type DropdownOption =
  | {
      key: DropdownKey;
      label: string;
      icon?: () => VNode;
    }
  | {
      type: 'divider';
      key: string;
    };

const options = computed(() => {
  const opts: DropdownOption[] = [
    {
      label: $t('common.logout'),
      key: 'logout',
      icon: SvgIconVNode({ icon: 'ph:sign-out', fontSize: 18 })
    }
  ];

  return opts;
});

function logout() {
  window.$dialog?.info({
    title: $t('common.tip'),
    content: $t('common.logoutConfirm'),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: () => {
      authStore.resetStore();
    }
  });
}

function handleDropdown(key: DropdownKey) {
  if (key === 'logout') {
    logout();
  } else {
    // If your other options are jumps from other routes, they will be directly supported here
    routerPushByKey(key);
  }
}
</script>

<template>
  <NButton
    v-if="!authStore.isLogin"
    :class="{ 'animate-shake': loginClassStore.flag }"
    class="global-btn h-50px w-153px text-22px"
    type="primary"
    size="large"
    round
    block
    @click="loginOrRegister"
  >
    立即登录
  </NButton>
  <NDropdown v-else placement="bottom" trigger="click" :options="options" @select="handleDropdown">
    <div>
      <ButtonIcon>
        <SvgIcon icon="ph:user-circle" class="text-icon-large" />
        <span class="text-16px font-medium">{{ authStore.userInfo.userName }}</span>
      </ButtonIcon>
    </div>
  </NDropdown>
  <NModal v-model:show="showModal">
    <Login :module="type" />
  </NModal>
</template>

<style scoped></style>
