import useAudio from '@/hooks/common/audio';

const audioInstance = ref<any>(null);

async function initializeAudio(content: string) {
  const audio = await useAudio(content);
  audioInstance.value = audio.playAudio;
}

// initializeAudio('');

export { audioInstance, initializeAudio };
