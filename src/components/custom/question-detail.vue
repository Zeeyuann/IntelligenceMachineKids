<script setup lang="ts">
import { fetchQuestion, questionDetail } from '@/service/api';

const props = defineProps<{
  id: number;
}>();

const questionTemp: any = ref({});
const knowledges = ref<any>([]);

const emit = defineEmits<{
  openVideo: [id: number];
}>();
watchEffect(async () => {
  const { data, error } = await questionDetail({ questionId: props.id });
  if (!error) {
    console.log('🚀 ~ watchEffect ~ data:', data);
    questionTemp.value = data;
  }
  const { data: question, error: quesError } = await fetchQuestion({ questionId: props.id });
  if (!quesError) {
    console.log('🚀 ~ watchEffect ~ data:', data);
    knowledges.value = question?.knowledgeIds ?? [];
  }
});

const goVideo = (id: number) => {
  emit('openVideo', id);
};
</script>

<template>
  <div class="w-full flex flex-col">
    <div class="w-full flex flex-col">
      <div class="w-full flex-col">
        <div class="flex items-center">
          <div class="mr-5px h-13px w-4px rd-14px bg-#2CB6FF"></div>
          <div class="text-16px text-#000000 font-500">题干信息</div>
        </div>
      </div>
      <div
        class="mt8px box-border w-full rd-12px bg-white p-12px text-14px text-[rgba(0,0,0,0.6588)] font-500"
        v-html="questionTemp?.stem?.html"
      ></div>
    </div>
    <div class="mt12px w-full flex flex-col">
      <div class="w-full flex-col">
        <div class="flex items-center">
          <div class="mr-5px h-13px w-4px rd-14px bg-#2CB6FF"></div>
          <div class="text-16px text-#000000 font-500">答案</div>
        </div>
      </div>
      <div
        v-for="item in questionTemp?.stem?.og?.ogOps"
        :key="item.index"
        class="mt8px box-border w-full rd-12px bg-white p-12px text-14px text-[rgba(0,0,0,0.6588)] font-500"
        v-html="`${item.index}. ${item.html}`"
      ></div>
    </div>
    <div class="mt12px w-full flex flex-col flex-1">
      <div class="w-full flex-col">
        <div class="flex items-center">
          <div class="mr-5px h-13px w-4px rd-14px bg-#2CB6FF"></div>
          <div class="text-16px text-#000000 font-500">Ai分析解答</div>
        </div>
      </div>
      <div v-for="item in questionTemp?.explanation?.explanationSegs" :key="item.name" class="flex flex-col">
        <div class="mt8px box-border w-full rd-12px py-12px text-14px text-[rgba(0,0,0,0.4)] font-500">
          {{ item.name }}
        </div>
        <div class="text-14px text-[rgba(0,0,0,0.85)]" v-html="item.html"></div>
      </div>
    </div>
    <div v-if="knowledges.length > 0" class="mt12px w-full flex flex-col flex-1">
      <div class="mb-12px w-full flex-col">
        <div class="flex items-center">
          <div class="mr-5px h-13px w-4px rd-14px bg-#2CB6FF"></div>
          <div class="text-16px text-#000000 font-500">关联知识点</div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-10px">
        <NButton v-for="item in knowledges" :key="item.id" class="kbg !w-full !bg-#00B578" @click="goVideo(item.id)">
          <div class="flex items-center">
            <icon-local-live-fill class="mr-10px"></icon-local-live-fill>
            <span class="alph text-white">{{ item.name }}</span>
          </div>
        </NButton>
      </div>
    </div>
    <div
      v-if="false"
      class="mt28px box-border w-full flex flex-col items-center justify-center border-t border-t-[#E6E6E6] border-t-solid"
    >
      <div class="my-10px text-12px text-[rgba(0,0,0,0.85)]">举一反三，根据本题知识点Ai智能推题</div>
      <div
        class="h-37px w-155px flex cursor-pointer items-center justify-center rd-12px bg-#2CB6FF text-14px text-#ffffff"
      >
        <img
          class="mr5px h-29px w-29px scale-50"
          src="https://imgs.superxi.cn/%E5%85%83%E5%88%9B%E6%99%BA%E7%AB%A5AI/image/bang.png"
          alt=""
        />
        智能推题，练一练
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.kbg) {
  /* background: linear-gradient(180deg, #2cb6ff 10%, #a1ecff 100%), #d8d8d8; */
  --n-border: 1px solid #00b578 !important;
  --n-border-hover: 1px solid #00b578 !important;
  --n-border-pressed: 1px solid #00b578 !important;
  --n-border-focus: 1px solid #00b578 !important;
  --n-border-disabled: 1px solid #00b578 !important;
}
</style>
