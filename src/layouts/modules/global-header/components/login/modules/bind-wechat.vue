<script setup lang="ts">
import { useLoginTypeStore } from '@/store/modules/login';
defineOptions({
  name: 'BindWechat'
});

const { showModal } = storeToRefs(useLoginTypeStore());

onMounted(() => {
  watch(
    showModal,
    (val: any) => {
      console.log(val);
      if (val) {
        const obj = new WxLogin({
          self_redirect: false,
          id: 'login_container',
          appid: 'wxfc5b5aaa55283fc2',
          scope: 'snsapi_login',
          redirect_uri: encodeURI('https://yuanchuang.superxi.cn/'),
          state: '',
          style: 'black',
          href: '',
          stylelite: 1
        });
        console.log(obj);
      }
    },
    { immediate: true }
  );
});
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div class="text-14px text-#ababab font-600">即可免费使用全部功能</div>
    <div id="login_container" class="my-24px h-175px w-175px" alt=""></div>
    <div class="flex items-center">
      <icon-local-wechat />
      <span class="ml-5px text-14px text-#ababab font-600">微信扫描上方二维码登录</span>
    </div>
  </div>
</template>

<style scoped>
:deep(iframe) {
  width: 100%;
  height: 100%;
}
</style>
