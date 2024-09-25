<script lang="ts" setup>
import TypeIt from 'typeit';
import type { Options } from 'typeit';
import type { El } from 'typeit/dist/types';

const textRef = shallowRef<El>();

function init() {
  if (!textRef.value) return;

  const options: Options = {
    strings:
      'SoybeanAdmin是一个清新优雅、高颜值且功能强大的后台管理模板SoybeanAdmin是一个清新优雅、高颜值且功能强大的后台管理模板SoybeanAdmin是一个清新优雅、高颜值且功能强大的后台管理模板',
    lifeLike: true,
    speed: 60,
    cursor: false,
    afterComplete: () => {
      console.log(1);
    }
  };

  const initTypeIt = new TypeIt(textRef.value, options);

  initTypeIt.go();
}

onMounted(() => {
  init();
});
</script>

<template>
  <div>
    <NCard title="打字机 插件" :bordered="false" class="h-full card-wrapper">
      <span ref="textRef" class="text-18px"></span>
    </NCard>
  </div>
</template>

<style scoped></style>
