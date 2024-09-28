<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef, watch } from 'vue';
import TypeIt from 'typeit';
import type { Options } from 'typeit';
import type { El } from 'typeit/dist/types';

const props = defineProps<{ strings: string[] }>(); // 确保这里是数组
const textRef = shallowRef<El>();
let typeItInstance: any;
const emit = defineEmits<{ complete: []; reset: [] }>();

function init() {
  if (!textRef.value) return;

  const options: Options = {
    strings: props.strings,
    lifeLike: true,
    cursor: true,
    speed: 10,
    afterComplete(instance: any) {
      if (props.strings[0]) instance.destroy();
      emit('complete');
    }
  };

  typeItInstance = new TypeIt(textRef.value, options).go();
}

onMounted(() => {
  init();
});

watch(
  () => props.strings,
  () => {
    if (typeItInstance) {
      typeItInstance.reset(); // 销毁现有实例
      emit('reset');
    }
    init(); // 重新初始化
  }
);

onUnmounted(() => {
  if (typeItInstance) {
    typeItInstance.destroy(); // 确保清理
  }
});
</script>

<template>
  <div ref="textRef"></div>
</template>

<style scoped></style>
