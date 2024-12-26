<script setup lang="ts">
import VideoPlayer from '@/components/custom/hls-player.vue';
import { fetchVideo, videoList } from '@/service/api';

const props = defineProps<{ id: number }>();

const videoListTemp: any = ref([]);
const activeVideo: any = ref({});

watchEffect(async () => {
  const { data, error } = await videoList({ knowledgeId: props.id });
  if (!error) {
    console.log('🚀 ~ watchEffect ~ data:', data);
    videoListTemp.value = data as [];
  }
});

const handlePlay = async (item: any) => {
  if (!item?.[0]) return;
  console.log('🚀 ~ handlePlay ~ item:', item);
  const obj = {
    title: videoListTemp.value.find((ele: any) => ele.id === item?.[0])?.title,
    video_path: '',
    cover: videoListTemp.value.find((ele: any) => ele.id === item?.[0])?.cover_url
  };
  const { data, error } = await fetchVideo(item?.[0]);
  if (!error) {
    obj.video_path = data;
  }

  activeVideo.value = obj;
  console.log('🚀 ~ handlePlay ~ activeVideo:', activeVideo);
};
</script>

<template>
  <div class="alph flex flex-col flex-1 !p-unset">
    <main class="box-border box-border w-full flex flex-col flex-1 of-hidden px-160px py-32px text-#181818">
      <div class="mb-20px text-20px font-600">{{ activeVideo?.title }}</div>
      <div class="w-full flex flex-1 of-hidden">
        <div class="mr-10px h-full flex-1">
          <VideoPlayer
            v-if="activeVideo.video_path"
            :title="activeVideo.title"
            :url="activeVideo.video_path || ''"
            :poster="
              activeVideo.cover ||
              'https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/video/subject_1_icon.png'
            "
          />
        </div>
        <div class="h-full of-hidden">
          <NScrollbar
            :style="{ border: '1px solid rgba(255, 255, 255, 1)' }"
            class="ml-1px box-border w-428px of-hidden rd-12px bg-#ffffff p-20px"
          >
            <div class="flex items-center justify-between">
              <div class="mb-20px flex items-center">
                <icon-local-mulu />
                <span class="ml-5px text-16px">课程目录</span>
              </div>
            </div>
            <NCollapse accordion arrow-placement="right" @update:expanded-names="handlePlay">
              <NCollapseItem v-for="item in videoListTemp" :key="item.id" :name="item.id">
                <template #header>
                  <div class="w-full flex items-center">
                    <icon-local-playing
                      class="opacity-0 transition-all transition-duration-150 ease-in-out"
                      :class="{ 'opacity-100': item.title === activeVideo.title }"
                    />
                    <div class="ml-5px h-56px w-56px">
                      <img :src="item?.cover_url" class="size-full object-contain" alt="" />
                    </div>
                    <div class="ml-10px flex flex-col">
                      <span class="line-clamp-1 flex-1">
                        {{ item.title }}
                      </span>
                      <span>时长{{ item.hours }}</span>
                    </div>
                  </div>
                </template>
                <template #arrow="{ collapsed }">
                  <icon-local-video-play v-show="collapsed" class="text-24px" />
                  <icon-local-video-stop v-show="!collapsed" class="text-24px" />
                </template>
              </NCollapseItem>
            </NCollapse>
          </NScrollbar>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
