<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Player, { Events } from 'xgplayer';
import { useVideosStore } from '@/store/modules/video';
import 'xgplayer/dist/index.min.css';
const videoStore = useVideosStore();

const props = defineProps<{
  url: string;
  poster: string;
  title: string;
}>();

const domRef = ref<HTMLElement>();
const player = ref<Player>();

function renderXgPlayer() {
  if (!domRef.value) return;
  player.value = new Player({
    el: domRef.value,
    url: props.url,
    poster: props.poster,
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
    width: '100%',
    height: '100%'
  });
  player.value.on(Events.ENDED, () => {
    if (props.title) videoStore.handleAddFinish(props.title);
  });
  player.value.on(Events.ERROR, error => {
    console.log('🚀 ~ renderXgPlayer ~ error:', error);
  });
}
function destroyXgPlayer() {
  player.value?.destroy();
}
watch([() => props.url, () => props.poster], ([url, poster]) => {
  console.log('🚀 ~ watch ~ url:', url);
  player.value?.setConfig({
    url,
    poster
  });
  player.value?.play();
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
