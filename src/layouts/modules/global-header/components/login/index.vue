<script setup lang="ts">
import CodeLogin from './modules/code-login.vue';
import BindWechat from './modules/bind-wechat.vue';
</script>

<template>
  <div class="relative flex-center overflow-hidden">
    <!-- <WaveBg :theme-color="bgThemeColor" /> -->
    <NCard :bordered="false" class="relative z-4 h-420px w-800px rd-12px">
      <div class="br h-full flex flex-col flex-1 items-center lt-sm:w-300px">
        <div class="flex flex-col items-center pt-24px">
          <h3 class="text-28px text-#000000 font-600">立即登录</h3>
          <div class="pt-4px">
            <BindWechat />
          </div>
        </div>
      </div>
      <div class="h-full flex flex-col flex-1 items-center justify-center lt-sm:w-300px">
        <div class="flex flex-col items-center pt-24px">
          <h3 class="text-20px text-#000000 font-600">手机号码登录</h3>
          <div class="pt-24px">
            <CodeLogin />
          </div>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.br {
  border-right: 1px solid rgba(0, 0, 0, 0.04);
}
:deep(.n-card__content) {
  display: flex;
  align-items: center;
}
</style>
