<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Player, { Events } from 'xgplayer';
import HlsPlugin from 'xgplayer-hls';
// import { useVideosStore } from '@/store/modules/video';
import 'xgplayer/dist/index.min.css';

// const videoStore = useVideosStore();

const props = defineProps<{
  url: string;
  poster: string;
  // title: string;
}>();

const domRef = ref<HTMLElement>();
const player = ref<Player>();

function renderXgPlayer() {
  if (!domRef.value) return;

  if (document.createElement('video').canPlayType('application/vnd.apple.mpegurl')) {
    // 原生支持 hls 播放
    player.value = new Player({
      el: domRef.value,
      url: props.url,
      poster: props.poster,
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
      width: '100%',
      autoplay: true,
      height: '100%'
    });
    // player.value.on(Events.ENDED, () => {
    //   if (props.title) videoStore.handleAddFinish(props.title);
    // });
    player.value.on(Events.ERROR, error => {
      console.log('🚀 ~ renderXgPlayer ~ error:', error);
    });
  } else if (HlsPlugin.isSupported()) {
    // 第一步
    player.value = new Player({
      el: domRef.value,
      url: props.url,
      poster: props.poster,
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
      width: '100%',
      autoplay: true,
      height: '100%',
      plugins: [HlsPlugin]
    });
    // player.value.on(Events.ENDED, () => {
    //   if (props.title) videoStore.handleAddFinish(props.title);
    // });
    player.value.on(Events.ERROR, error => {
      console.log('🚀 ~ renderXgPlayer ~ error:', error);
    });
  }
}
function destroyXgPlayer() {
  player.value?.destroy();
}
watch([() => props.url, () => props.poster], ([url, poster]) => {
  if (url) {
    player.value?.playNext({
      url,
      poster
    });
  } else {
    player.value?.pause();
  }
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
