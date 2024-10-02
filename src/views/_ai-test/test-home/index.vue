<script setup lang="ts">
import { fetchBooks } from '@/service/api';
import { useRouterPush } from '@/hooks/common/router';
import { useSubjectStore } from '@/store/modules/subject';

const subjectStore = useSubjectStore();
const { routerPushByKey } = useRouterPush();
const route = useRoute();

const dataList = reactive<any>([]);

const title = ref('');

const params = reactive({
  bookId: '',
  catalogIds: [],
  bigTest: true
});

(async () => {
  if (route.query) {
    const { data, error } = await fetchBooks(route.query);
    if (!error) {
      console.log(data);
      params.bookId = data[0].bookId;
      Object.assign(dataList, data);
    }
  }
})();

const catalogList = reactive<any>([]);

const selectKeys = reactive<any>([]);

const showSelectKeys = computed<any>(getSelectedOptions);

// eslint-disable-next-line max-params
const updateCheckedKeys = async (key: any, index: number) => {
  selectKeys[index] = key; // 更新对应选择器的选择项
};
function getSelectedOptions() {
  let arr;
  if (selectKeys.flat().length > 10) {
    window.$message?.info('最多选十个内容哦');
    arr = selectKeys.flat().splice(0, 10);
  } else {
    arr = selectKeys.flat();
  }
  return arr; // 扁平化选择项数组
}
watch(
  () => params.bookId,
  (bookid: string) => {
    catalogList.length = 0;
    const bookItem = dataList.find((item: any) => item.bookId === bookid);
    console.log('🚀 ~ bookItem:', bookItem);
    title.value = bookItem.bookName;
    Object.assign(
      catalogList,
      bookItem.catalogs.map((item: any) => [item])
    );
  }
);

const BTN_LIST = [
  {
    label: '大测试',
    value: true
  },
  {
    label: '小测试',
    value: false
  }
];

const handleSubmit = async () => {
  if (getSelectedOptions().length === 0) {
    window.$message?.info('请选择测试内容');
    return;
  }
  if (selectKeys.flat().length > 10) {
    params.catalogIds = selectKeys.flat().splice(0, 10);
  } else {
    params.catalogIds = selectKeys.flat();
  }
  subjectStore.setInfo({ params, title: title.value });
  subjectStore.clearQuestionList();
  routerPushByKey('test-subject');
};
</script>

<template>
  <div class="testbg box-border px-230px py-16px text-#000000">
    <main class="box-border size-full flex flex-col items-center rd-10px bg-white px-330px py-40px">
      <div class="mi mb-50px text-24px text-#2CB6FF font-600">{{ title }}</div>
      <!-- 学期 -->
      <div class="mb-32px w-full flex flex-col">
        <div class="mb-24px flex items-center">
          <div class="mr-12px h-15px w-4px rd-2px bg-[#2CB6FF]"></div>
          <div class="text-16px font-600">请选择学期</div>
        </div>
        <div class="w-full flex items-center">
          <NRadioGroup v-model:value="params.bookId" class="titlegroup w-full flex items-center !h-42px">
            <NRadioButton
              v-for="(item, index) in dataList"
              :key="item.bookId"
              :class="`${index === 0 ? 'mr-20px' : ''}`"
              class="flex-1 items-center justify-center !h-full !flex"
              :value="item.bookId"
              :label="item.bookName"
            />
          </NRadioGroup>
        </div>
      </div>
      <!-- 内容 -->
      <div class="mb-32px w-full flex flex-col">
        <div class="mb-24px flex items-center">
          <div class="mr-12px h-15px w-4px rd-2px bg-[#2CB6FF]"></div>
          <div class="text-16px font-600">请选择测试内容</div>
        </div>
        <div class="grid grid-cols-3 w-full gap-23px">
          <NTree
            v-for="(item, index) in catalogList"
            :key="item[0].bookId"
            cascade
            checkable
            block-line
            class="box-border w-full border border-#E9E9E9 rd-6px px-16px py-8px"
            :selectable="false"
            label-field="catalogName"
            :selected-keys="showSelectKeys"
            key-field="id"
            default-expand-all
            children-field="childs"
            :data="item"
            @update:checked-keys="(keys: Array<string | number>) => updateCheckedKeys(keys, index)"
          />
        </div>
      </div>
      <!-- 类型 -->
      <div class="mb-32px w-full flex flex-col">
        <div class="mb-24px flex items-center">
          <div class="mr-12px h-15px w-4px rd-2px bg-[#2CB6FF]"></div>
          <div class="text-16px font-600">请选择测试类型</div>
        </div>
        <div class="w-full flex items-center">
          <NRadioGroup v-model:value="params.bigTest" class="titlegroup w-full flex items-center !h-42px">
            <NRadioButton
              v-for="(item, index) in BTN_LIST"
              :key="item.label"
              :class="`${index === 0 ? 'mr-20px' : ''}`"
              class="flex-1 items-center justify-center !h-full !flex"
              :value="item.value"
              :label="item.label"
            />
          </NRadioGroup>
        </div>
      </div>
      <!-- 确定 -->
      <NButton class="conbtn h-42px w-full bg-#2CB6FF" @click="handleSubmit">确定</NButton>
    </main>
  </div>
</template>

<style scoped>
.testbg {
  background: linear-gradient(180deg, #d2efff 11%, #f8f8fa 34%, #f5f5f5 43%);
}

:deep(.n-radio-button--checked, .n-radio-button--focus) {
  --n-button-text-color-active: #2cb6ff !important;
  --n-button-border-color-active: #2cb6ff !important;
  --n-button-box-shadow-focus: inset 0 0 0 1px #2cb6ff, 0 0 0 2px rgba(24, 24, 24, 0.2);
}
:deep(.n-radio-group__splitor) {
  display: none;
}
:deep(.n-radio-button) {
  border-top-left-radius: 6px !important;
  border-top-right-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
  border-bottom-left-radius: 6px !important;
  border-right: 1px solid var(--n-button-border-color);
  border-left: 1px solid var(--n-button-border-color);
}
:deep(.n-radio-button__state-border) {
  border-radius: 6px;
}

:deep(.conbtn) {
  --n-ripple-color: #2cb6ff !important;
  --n-text-color: #ffffff !important;
  --n-text-color-hover: #ffffff !important;
  --n-text-color-pressed: #ffffff !important;
  --n-text-color-focus: #ffffff !important;
  --n-border-hover: 1px solid #2cb6ff !important;
  --n-border-pressed: 1px solid #2cb6ff !important;
  --n-border-focus: 1px solid #2cb6ff !important;
  --n-color-hover: #2cb6ff !important;
  --n-color-pressed: #2cb6ff !important;
  --n-color-focus: #2cb6ff !important;
  --n-border: none !important;
}
</style>
