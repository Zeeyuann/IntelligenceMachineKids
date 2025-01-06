<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Player, { Events } from 'xgplayer';
import 'xgplayer/dist/index.min.css';

const props = defineProps<{
  url: string;
  poster?: string;
  autoplay?: boolean;
}>();

const domRef = ref<HTMLElement>();
const player = ref<Player>();

function renderXgPlayer() {
  if (!domRef.value) return;

  // 先通过 `props.poster` 使用外部传入的 poster（如果有）
  const initialPoster = props.poster || '';

  player.value = new Player({
    el: domRef.value,
    url: props.url,
    poster: initialPoster,
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
    width: '100%',
    autoplay: props.autoplay,
    height: '100%'
  });
  player.value.on(Events.ENDED, () => {});
  player.value.on(Events.ERROR, error => {
    console.log('🚀 ~ renderXgPlayer ~ error:', error);
  });
}
function destroyXgPlayer() {
  player.value?.destroy();
}
watch([() => props.url, () => props.poster], ([url, poster]) => {
  player.value?.playNext({
    url,
    poster
  });
});
onMounted(() => {
  renderXgPlayer();
});

onUnmounted(() => {
  destroyXgPlayer();
});
</script>

<template>
  <div class="size-full flex-center">
    <div ref="domRef" class="h-auto w-full shadow-md"></div>
  </div>
</template>

<style scoped></style>
