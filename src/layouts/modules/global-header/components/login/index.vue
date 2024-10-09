<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth';
import CodeLogin from './modules/code-login.vue';
import BindWechat from './modules/bind-wechat.vue';

const authStore = useAuthStore();

const currentKidIndex = ref<number | null>(null);

const handleChooseKid = async (index: number) => {
  currentKidIndex.value = index;
  await authStore.getUserInfo(index);
};

const emit = defineEmits<{
  close: [];
}>();
const handleClose = () => {
  emit('close');
};
</script>

<template>
  <div class="relative flex-center overflow-hidden">
    <!-- <WaveBg :theme-color="bgThemeColor" /> -->
    <NCard title=" " :bordered="false" class="relative z-4 h-420px w-800px rd-12px">
      <Transition name="fade" mode="out-in">
        <div v-if="!authStore.token" class="size-full flex-center">
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
        </div>
        <div v-else class="size-full flex-center">
          <div class="size-full flex flex-col items-center justify-center">
            <div class="w-full flex items-center justify-center text-20px text-#000000 font-600">选择登录的子账号</div>

            <div class="mt-60px box-border w-full flex items-center justify-between px-226px">
              <div
                v-for="(item, index) in authStore.kidList"
                :key="item.id"
                class="relative flex flex-col flex-1 cursor-pointer items-center"
                @click="handleChooseKid(index)"
              >
                <div class="relative h-56px w-56px rd-50%">
                  <img
                    :src="item.avatar"
                    :class="{ '!border-[#000000]': index === currentKidIndex }"
                    class="h-56px w-56px border-2 border-transparent rd-50%"
                    alt=""
                  />
                  <icon-local-choose-kid
                    :class="{ 'opacity-100': index === currentKidIndex }"
                    class="absolute bottom-0 right-0 z-10 h-16px w-16px opacity-0 transition-all transition-duration-300 ease-in-out"
                  />
                </div>
                <div class="mb-3px mt-15px text-18px font-600">{{ item.name }}</div>
                <div class="mi text-14px text-#7A808D">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <template v-if="!authStore.token" #header-extra>
        <icon-local-close class="h-20px w-20px cursor-pointer" @click="handleClose" />
      </template>
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
:deep(.n-card-header) {
  padding-bottom: unset;
}
</style>
