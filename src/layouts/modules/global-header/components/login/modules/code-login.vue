<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useCaptcha } from '@/hooks/business/captcha';

defineOptions({
  name: 'CodeLogin'
});

const { formRef, validate } = useNaiveForm();
const { label, isCounting, loading, getCaptcha } = useCaptcha();

interface FormModel {
  phone: string;
  code: string;
}

const checkBox = ref<boolean>(false);

const addAnimateClass = ref(false);

const model: FormModel = reactive({
  phone: '',
  code: ''
});

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  const { formRules } = useFormRules();

  return {
    phone: formRules.phone,
    code: formRules.code
  };
});

async function handleSubmit() {
  await validate();

  if (!checkBox.value) {
    addAnimateClass.value = true;
    setTimeout(() => {
      addAnimateClass.value = false;
    }, 1000);
    return;
  }
  // request
  window.$message?.success($t('page.login.common.validateSuccess'));
}
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <NFormItem path="phone">
      <NInput v-model:value="model.phone" :placeholder="$t('page.login.common.phonePlaceholder')" />
    </NFormItem>
    <NFormItem path="code">
      <div class="w-full flex-y-center gap-16px">
        <NInput v-model:value="model.code" :placeholder="$t('page.login.common.codePlaceholder')" />
        <NButton size="large" :disabled="isCounting" :loading="loading" @click="getCaptcha(model.phone)">
          <span class="text-14px text-#AEDA00 font-500">{{ label }}</span>
        </NButton>
      </div>
    </NFormItem>
    <div class="w-full">
      <NButton
        type="primary"
        size="large"
        class="global-btn my-24px h-48px !text-14px !font-500"
        round
        block
        @click="handleSubmit"
      >
        立即登录
      </NButton>
    </div>
    <div
      :class="addAnimateClass ? 'animate-shake' : ''"
      class="w-full flex items-center justify-center text-14px text-#ABABAB font-600"
    >
      <NCheckbox v-model:checked="checkBox" />
      <span class="ml-5px">我已阅读并同意</span>
      <span class="ml-5px text-#AEDA00">用户协议</span>
      <span class="mx-5px">和</span>
      <span class="text-#AEDA00">隐私条款</span>
    </div>
  </NForm>
</template>

<style scoped></style>
