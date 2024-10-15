<script setup lang="ts">
import VideoPlayer from '@/components/custom/video-player.vue';
import { subjectDetail, subjectVerify } from '@/service/api/video';
import { useVideosStore } from '@/store/modules/video';
const videoStore = useVideosStore();

const subjectInfo: any = ref({});
const activeVideo: any = ref({});

const isVerify = ref(false);
(async () => {
  const { data: verify, error: err } = await subjectVerify('1');
  if (!err) {
    console.log('🚀 ~ verify:', verify);
    isVerify.value = true;
  } else {
    isVerify.value = false;
  }
  const { data, error } = await subjectDetail('1');
  if (!error) {
    console.log('🚀 ~ data:', data);
    subjectInfo.value = data;
    if (!isVerify.value) return;
    activeVideo.value = data.course[0].courses[0];
  }
})();

const handlePlay = (item: any) => {
  console.log('🚀 ~ handlePlay ~ isVerify:', isVerify);

  if (!isVerify.value) {
    return;
  }
  activeVideo.value = item;
  console.log(1);
};
</script>

<template>
  <div class="alph flex flex-col overflow-hidden !bg-#0C0D0A !p-unset">
    <div class="title box-border h-50px w-full flex items-center bg-#191B15 px-160px text-18px text-#ffffff">
      SuperX AI学院
    </div>
    <main class="box-border w-full flex flex-col flex-1 px-160px py-32px text-#ffffff">
      <div class="mb-20px text-20px font-600">{{ subjectInfo.name }}</div>
      <div class="w-full flex flex-1">
        <div class="box-border h-full flex-1">
          <VideoPlayer
            v-if="Object.keys(activeVideo).length > 0"
            :title="activeVideo.title"
            :url="activeVideo.video_path || ''"
            :poster="
              activeVideo.cover ||
              'https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/video/subject_1_icon.png'
            "
          />
        </div>
        <div
          :style="{ border: '1px solid rgba(255, 255, 255, 0.1)' }"
          class="ml-1px box-border h-660px w-428px of-scroll p-20px"
        >
          <div class="flex items-center justify-between">
            <div class="mb-20px flex items-center">
              <icon-local-mulu />
              <span class="ml-5px text-16px">课程目录</span>
            </div>
            <div class="text-14px" :style="{ color: ' rgba(255, 255, 255, 0.4) ' }">221小时</div>
          </div>
          <NCollapse arrow-placement="right">
            <NCollapseItem v-for="item in subjectInfo.course" :key="item.id" :name="item.title">
              <template #header>
                <div class="w-full flex items-center">
                  <icon-local-playing
                    class="opacity-0 transition-all transition-duration-150 ease-in-out"
                    :class="{ 'opacity-100': item.courses.find((cor: any) => cor.title === activeVideo.title) }"
                  />
                  <div v-show="false" class="ml-5px h-56px w-56px bg-red"></div>
                  <div class="ml-10px flex flex-col">
                    <span
                      class="line-clamp-1 flex-1"
                      :style="{
                        color: item.courses.find((cor: any) => cor.title === activeVideo.title)
                          ? 'rgba(194, 243, 0, 0.95)'
                          : 'rgba(255, 255, 255, 0.85)'
                      }"
                    >
                      {{ item.title }}
                    </span>
                    <span :style="{ color: 'rgba(255, 255, 255, 0.4)' }">时长{{ item.hours }}</span>
                  </div>
                </div>
              </template>
              <div
                v-for="ele in item.courses"
                :key="ele.title"
                :style="{
                  'border-top': '1px solid rgba(255, 255, 255, 0.1)'
                }"
                class="w-full flex cursor-pointer items-center px-20px py-20px"
                @click="handlePlay(ele)"
              >
                <div class="line-clamp-1 flex-1 text-#ffffff">{{ ele.title }}</div>
                <div
                  v-if="isVerify && videoStore.finishList.includes(ele.title)"
                  :style="{ background: 'linear-gradient(117deg, #F0FF77 13%, #DDFF8D 88%)' }"
                  class="h-21px w-52px flex items-center justify-center rd-100px text-#181818"
                >
                  已学习
                </div>
                <div
                  v-if="isVerify && !videoStore.finishList.includes(ele.title)"
                  class="h-21px w-52px flex items-center justify-center rd-100px"
                  :style="{ color: 'rgba(255, 255, 255, 0.85)', border: '1px solid rgba(255, 255, 255, 0.1)' }"
                >
                  未学习
                </div>

                <div
                  v-if="!isVerify"
                  class="h-21px w-52px flex items-center justify-center rd-100px"
                  :style="{ color: 'rgba(255, 255, 255, 0.85)', border: '1px solid rgba(255, 255, 255, 0.1)' }"
                >
                  待解锁
                </div>
              </div>
            </NCollapseItem>
          </NCollapse>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
