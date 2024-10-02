import { computed, onScopeDispose, ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';

export default function useTimer() {
  const seconds = ref(0);
  const minutes = ref(0);
  const hours = ref(0);
  const totalSeconds = ref(0); // 新增总秒数

  const formattedTime = computed(() => {
    if (hours.value > 0) {
      return `${hours.value < 10 ? `0${hours.value}` : hours.value} 小时${minutes.value < 10 ? `0${minutes.value}` : minutes.value} 分钟${seconds.value < 10 ? `0${seconds.value}` : seconds.value} 秒`;
    }
    return `${minutes.value < 10 ? `0${minutes.value}` : minutes.value} 分钟${seconds.value < 10 ? `0${seconds.value}` : seconds.value} 秒`;
  });

  const { pause, resume } = useIntervalFn(
    () => {
      seconds.value += 1;
      totalSeconds.value += 1; // 每秒增加总秒数

      if (seconds.value >= 60) {
        seconds.value = 0;
        minutes.value += 1;
      }

      if (minutes.value >= 60) {
        minutes.value = 0;
        hours.value += 1;
      }
    },
    1000,
    { immediate: false }
  );

  function start() {
    resume();
  }

  function stop() {
    pause();
    const result = totalSeconds.value; // 获取总秒数
    totalSeconds.value = 0; // 重置总秒数
    seconds.value = 0;
    minutes.value = 0;
    hours.value = 0;
    return result; // 返回总秒数
  }

  onScopeDispose(() => {
    pause();
  });

  return {
    formattedTime,
    start,
    stop
  };
}
