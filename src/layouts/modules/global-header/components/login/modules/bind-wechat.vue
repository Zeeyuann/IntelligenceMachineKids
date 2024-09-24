<script setup lang="ts">
defineOptions({
  name: 'BindWechat'
});
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div class="text-14px text-#ababab font-600">即可免费使用全部功能</div>
    <img src="" class="my-24px h-175px w-175px bg-red" alt="" />
    <div class="flex items-center">
      <icon-local-wechat />
      <span class="ml-5px text-14px text-#ababab font-600">微信扫描上方二维码登录</span>
    </div>
  </div>
</template>

<style scoped></style>
