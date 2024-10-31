<script setup lang="ts">
// import { $t } from '@/locales';

defineOptions({
  name: 'GlobalLogo'
});

interface Props {
  /** Whether to show the title */
  showTitle?: boolean;
}

withDefaults(defineProps<Props>(), {
  showTitle: true
});
</script>

<template>
  <RouterLink to="/" class="w-full flex-center">
    <SystemLogo class="text-32px text-primary" />
    <h2 v-show="showTitle" class="ddjb pl-8px text-22px text-#0B0B0B font-bold transition duration-300 ease-in-out">
      元创AI | 为学习而生
    </h2>
  </RouterLink>
</template>

<style scoped></style>
