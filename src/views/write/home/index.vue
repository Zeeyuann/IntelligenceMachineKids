<script setup lang="ts">
import { useRouterPush } from '@/hooks/common/router';
const { routerPushByKey } = useRouterPush();
</script>

<template>
  <div @click="routerPushByKey('write_write-chat')">1</div>
</template>

<style scoped></style>
